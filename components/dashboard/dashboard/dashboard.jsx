import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import style from './dashboard.module.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none'
}));

export default function Dashboard(props) {

  const { data } = props

  function table(product) {
    return (
      <Item>
        
        <table className={style.table}>
          <tr>
            <td>
              <h3>name</h3>
            </td>
            <td className={style.qty}>
              <h3>quantity</h3>
            </td>
          </tr>

          <tbody>
            {
              data?.map((item) => {
                return (
                  item?.[product].map((item) => {

                    let name = Object.keys(item).join('-')
                    name = name.replaceAll('-', ' ')

                    const qty = Object.values(item)

                    return (
                      <tr>
                        <td>{name}</td>
                        <td className={style.qty}>{qty}</td>
                      </tr>
                    )
                  })
                )

              })
            }
          </tbody>
        </table>
      </Item>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 0, md: 0 }}>
        <Grid xs={12} md={3} s={6} mx={0}>
          <h2>Base</h2>
          {table('base')}
        </Grid>

        <Grid xs={12} md={3} s={6}>
        <h2>Cheese</h2>
          {table('cheese')}
        </Grid>

        <Grid xs={12} md={3} s={12}>
        <h2>sauces</h2>
          {table('sauce')}
        </Grid>

        <Grid xs={12} md={3} s={12}>
        <h2>Veggies</h2>
          {table('sauce')}
        </Grid>
        
      </Grid>
    </Box>
  )
}