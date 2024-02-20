import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Fragment } from 'react';
import style from './password.module.css'
import { Backdrop } from '@mui/material';
import { useRouter } from 'next/router';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ForgotPassword() {

  const router = useRouter()

  async function forgotPasswordHandler(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const email = formData.get('email')
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
                  <input type='email' name='email' placeholder='enter email address' />
                </Item>
              </Grid>

              <Grid xs={12} md={12} s={2}>
                <Item style={{ background: 'transparent', boxShadow: 'none' }}>
                  <button className={style.button}
                    type="submit">
                    submit
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
