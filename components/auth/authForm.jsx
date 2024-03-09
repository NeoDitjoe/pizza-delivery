import Backdrop from '@mui/material/Backdrop';
import style from './form.module.css'
import { useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { CircularProgress } from '@mui/material';
import PostMethod from '@/util/postMethod';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import stateContext from '@/util/context';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AuthForm() {

  const { setAlert } = stateContext()

  const [open, setOpen] = useState(true)
  const [image, setImage] = useState(null)
  const [submitLoader, setSubmitLoader] = useState(false)
  const [haveAccout, setHaveAccount] = useState(true)
  const [showPassword, setShowdPassword] = useState(false)

  const router = useRouter()

  function convertToBase64(e) {

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      setImage(reader.result)
    }
    reader.onerror = error => {
      console.error('Error: ', error)
    }
  }

  async function signInHandler(e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    try {
      setSubmitLoader(true)
      const response = await signIn('credentials', {
        redirect: false,
        email: formData.get('email'),
        password: formData.get('password'),
      });

      if (response.ok) {
        setSubmitLoader(false)
        setAlert('successfully logged in')
        router.push('/')
      }

      if (response.error) {
        setAlert(response.error)
        setSubmitLoader(false)
      }

    } catch (error) {
      setAlert('Something Went Wrong')
      setSubmitLoader(false)
    }
  }

  async function signupHandler(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    const verificationCode = uuidv4().substring(3, 8).toUpperCase()

    const userData = {
      username: formData.get('username'),
      email: formData.get('email').toLocaleLowerCase(),
      password: formData.get('password'),
      image: image,
      verificationCode: verificationCode
    }

    const user = {
      userEmail: formData.get('email'),
      username: formData.get('username').toLocaleLowerCase(),
      verificationCode: verificationCode
    }

    try {
      setSubmitLoader(true)
      const response = await PostMethod('/api/auth/signUp', userData)

      if (response.message === 'success') {
        setAlert('check your email for verification code. Code expires in 10 minutes')

        const res = await PostMethod('/api/auth/emailer', user)

        if (res.message === 'success') {
          router.push('/auth/verify-email-address')
        }

        setSubmitLoader(false)
      }
    } catch (error) {
      setSubmitLoader(false)
      setAlert(error.message || 'Check your internet connection')
    }

  }

  return (
    <div className={style.main}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <form onSubmit={haveAccout ? signInHandler : signupHandler} action="#" className={style.form}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 2 }}>
              {
                !haveAccout
                  ? <Grid xs={12} md={12} s={2} >
                    {haveAccout ? '' : <h1>{'Sign Up'}</h1>}
                    <Item>
                      <input type='username' name="username" placeholder="Username" required />
                    </Item>
                  </Grid>
                  : ''
              }
              <Grid xs={12} md={12} s={2}>
                {haveAccout
                  ? <div>
                    <h5>Admin Details. copy&paste</h5>
                    <p> email: admin@pizza4real.com</p>
                    <p> password: ThisIsThePassword</p>
                    
                    <h1>{'Sign In'}</h1>
                  </div> : ''}
                <Item>
                  <input type='email' name="email" placeholder="email" required />
                </Item>
              </Grid>

              <Grid xs={12} md={12} s={2}  >
                <Item className={style.password}>
                  <input type={!showPassword ? 'password' : 'text'} name="password" placeholder="Password" required />
                  <div onClick={() => setShowdPassword(!showPassword)} >
                    {!showPassword
                      ? <RiEyeLine />
                      : <RiEyeCloseLine />
                    }
                  </div>
                </Item>
              </Grid>
              {/* 
              {
                !haveAccout
                  ? <Grid xs={8} md={8} s={2}  >
                    <label>Profile Image. Optional</label>
                    <Item>
                      <input onChange={convertToBase64} type='file' placeholder="Image" />
                    </Item>
                  </Grid>
                  : ''
              } */}

              <Grid xs={3} md={3} s={2}  >
                <Item style={{
                  background: 'transparent',
                  boxShadow: 'none',
                  textAlign: 'center'
                }}>
                  <button
                    disabled={submitLoader}
                    className={style.button}
                    type="submit">
                    {
                      submitLoader
                        ? <CircularProgress size={'20px'} />
                        : haveAccout ? 'Sign In' : 'Sign Up'
                    }
                  </button>
                </Item>
              </Grid>

              <Grid xs={12} md={12} s={2}>
                <Item style={{ background: 'transparent', boxShadow: 'none' }} className={style.password}>
                  <p
                    className={style.haveAccount}
                    onClick={() => setHaveAccount(!haveAccout)
                    }>
                    {haveAccout ? "Create account" : "Have an account ?"}
                  </p>

                  {haveAccout ? <p
                    className={style.haveAccount}
                    onClick={() => router.push('/auth/reset-password')}
                  >Forgot password ?</p>
                    : ''
                  }

                </Item>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Backdrop>
    </div>
  )
}