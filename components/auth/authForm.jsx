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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AuthForm() {

  const [open, setOpen] = useState(true)
  const [image, setImage] = useState(null)
  const [ signUpLoader, setSignUpLoader ] = useState(false)

  const router = useRouter()

  function convertToBase64(e) {

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.onerror = error => {
      console.log('Error: ', error)
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
      verificationCode : verificationCode
    }

    const user = {
      userEmail: formData.get('email'), 
      username: formData.get('username').toLocaleLowerCase(),
      verificationCode: verificationCode
    }

    try {
      setSignUpLoader(true)
      const response = await PostMethod( '/api/auth/signUp', userData)
      if(response.message === 'success'){
        alert('check your email for verification code')
        const res = await PostMethod('/api/auth/emailer', user)
        if(res.message === 'success'){
          router.push('/verify-email-address')
        }
        setSignUpLoader(false)
      }
    } catch (error) {
      setSignUpLoader(false)
      alert(error.message || 'Check your internet connection')
    }

  }

  return (
    <div className={style.main}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        >
        <form onSubmit={signupHandler} action="#" className={style.form}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 2 }}>
              <Grid xs={12} md={12} s={2} >
                <h1>Sign Up</h1>
                <Item>
                  <input type='username' name="username" placeholder="Username" required />
                </Item>
              </Grid>

              <Grid xs={12} md={12} s={2}>
                <Item>
                  <input type='email' name="email" placeholder="email" required />
                </Item>
              </Grid>

              <Grid xs={12} md={12} s={2}  >
                <Item>
                  <input type='password' name="password" placeholder="Password" required />
                </Item>
              </Grid>

              <Grid xs={8} md={8} s={2}  >
                <label>Profile Image. Optional</label>
                <Item>
                  <input onChange={convertToBase64} type='file' placeholder="Image" />
                </Item>
              </Grid>

              <Grid xs={3} md={3} s={2}  >
                <Item style={{
                  background: 'transparent',
                  boxShadow: 'none',
                  textAlign: 'center'
                }}>
                  <button className={style.button} type="submit">{signUpLoader ? <CircularProgress size={'20px'}/>  : 'Sign Up'}</button>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Backdrop>
    </div>
  )
}