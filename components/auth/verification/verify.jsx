import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import style from './verify.module.css'
import { Backdrop } from '@mui/material';
import PostMethod from '@/util/postMethod';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function VerifyUserEmail() {

  const [ submitLoader, setSubmitLoader ] = useState(false)

  async function verificationHandler(e){
    e.preventDefault()

    const formData = new FormData(e.target)

    const verify = {
      email: formData.get('email'),
      verificationCode: formData.get('code') 
    }

    try {
      setSubmitLoader(true)
      const response = await PostMethod('/api/auth/verifyUser', verify)

      if(response.message === 'success'){
        alert(response.message)
        setSubmitLoader(false)
      }
    } catch (error) {
      alert(error.message)
      setSubmitLoader(false)
    }
  }

  return (
    <main >
      <Backdrop
        sx={{ background: 'transparent', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <form onSubmit={verificationHandler} action="#" className={style.form}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 2 }}>

              <Grid xs={12} md={12} s={2} >
                <h1>Verification</h1>
                <Item>
                  <input type='email' name="email" placeholder="Enter email address" required />
                </Item>
              </Grid>

              <Grid xs={12} md={12} s={2} >
                <Item>
                  <input type='text' name="code" placeholder="Enter the 5 character code" required />
                </Item>
              </Grid>

              <Grid xs={12} md={12} s={2} >
                <Item style={{ boxShadow: 'none', background: 'transparent' }}>
                  <button className={style.button}>{ submitLoader ? <CircularProgress size={'20px'}/> : 'Submit'}</button>
                </Item>
              </Grid>

            </Grid>
          </Box>
        </form>
      </Backdrop>
    </main>
  )
}