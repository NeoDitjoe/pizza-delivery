import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import style from './pizzas.module.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  background: 'white',
}));

export default function ShowPizza(props) {

  const { data } = props
  return (
    <div>
      <Box sx={{ flexGrow: 2 }}>
        <Grid
          container spacing={{ xs: 1, md: 0 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {
            data && data.map((pizza) => (
              <Grid xs={12} sm={4} md={4}>
                <Item>
                  <Image
                    src={pizza.image}
                    alt='pizza'
                    width={200}
                    height={200}
                  />

                  <h2>{pizza.name}</h2>
                  <div>
                    {pizza.toppings.join(', ')}
                  </div>

                  <div className={style.prices}>
                    {
                      pizza.prices.map((pizza, y) => (
                        <div >
                          {
                            Object.entries(pizza).map(([key, value]) => (
                              <div key={y}>
                                <h4>{key}</h4>
                                <h6>R {Number(value).toFixed(2)}</h6>
                              </div>
                            ))
                          }
                        </div>
                      ))
                    }
                  </div>
                </Item>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </div>
  )
}
