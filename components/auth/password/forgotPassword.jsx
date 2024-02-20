import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Fragment, useState } from 'react';
import style from './password.module.css'
import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import PostMethod from '@/util/postMethod';
import { v4 as uuidv4 } from 'uuid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ForgotPassword() {

  const router = useRouter()
  const [ loadingButton, setLoadingButton ] = useState(false)

  async function forgotPasswordHandler(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const code = uuidv4().substring(3, 8).toUpperCase()

    try {
      setLoadingButton(true)
      const response = await PostMethod('/api/auth/sendCode' , {email: email, code: code})

      if(response.message === 'success'){
        alert('successfully sent code')
        setLoadingButton(false)
      }
    } catch (error) {
      alert('Something went wrong')
      setLoadingButton(false)
    }
  }

  return (
    <Fragment>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <form className={style.form} action='#' onSubmit={forgotPasswordHandler}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 2 }}>
              <Grid xs={12} md={12} s={2}>
                <Item>
                  <input type='email' name='email' placeholder='enter email address' required />
                </Item>
              </Grid>

              <Grid xs={12} md={12} s={2}>
                <Item style={{ background: 'transparent', boxShadow: 'none' }}>
                  <button className={style.button}
                    type="submit">
                    {loadingButton ? <CircularProgress size={'20px'}/> : 'submit'}
                  </button>
                  <p
                    className={style.login}
                    onClick={() => router.push('/auth')}
                  >Back to Sign in</p>
                </Item>
              </Grid>

            </Grid>
          </Box>

        </form>
      </Backdrop>

    </Fragment>
  )
}
