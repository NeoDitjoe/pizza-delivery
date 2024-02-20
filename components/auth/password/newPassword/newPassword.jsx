import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import style from './newPassword.module.css'
import { Backdrop, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import PostMethod from '@/util/postMethod';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CreateNewPassword() {

  const [ loadingButton, setLoadingButton ] = useState(false)
  const router = useRouter()

  async function resetPasswordHandler(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const code = formData.get('code')
    const email = formData.get('email')
    const password = formData.get('password')

    const data = { 
      email,
      code,
      password
    }

    try {

      setLoadingButton(true)
      const response = await PostMethod('/api/auth/newPassword', data)

      if(response.message === 'success'){
        alert('password changed')
        setLoadingButton(false)
        router.push('/auth')
        
      }
    } catch (error) {
      alert(error.message)
      setLoadingButton(false)
    }
  }


  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <form className={style.form} action='#' onSubmit={resetPasswordHandler}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 2 }}>
            <h1>New password</h1>
            <Grid xs={12} md={12} s={2}>
              <Item>
                <input type='text' name='code' placeholder='Enter the 5 character reset code' required />
              </Item>
            </Grid>

            <Grid xs={12} md={12} s={2}>
              <Item>
                <input type='email' name='email' placeholder='enter email address' required />
              </Item>
            </Grid>

            <Grid xs={12} md={12} s={2}>
              <Item>
                <input type='password' name='password' placeholder='create new password' required />
              </Item>
            </Grid>

            <Grid xs={12} md={12} s={2}>
              <Item style={{ background: 'transparent', boxShadow: 'none' }}>
                <button className={style.button}
                  type="submit">
                  {loadingButton ? <CircularProgress size={'20px'} /> : 'submit'}
                </button>
              </Item>
            </Grid>

          </Grid>
        </Box>

      </form>
    </Backdrop>
  )
}