import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import style from './pizzas.module.css'
import { Backdrop } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
  const [openOverlay, setOpenOverlay] = useState(false)

  const router = useRouter()

  return (
    <div>
      <Box sx={{ flexGrow: 2 }}>
        <Grid
          container spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {
            data && data.map((pizza) => (
              <Grid xs={12} sm={4} md={4}>
                <Item className={style.item}>
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
                      pizza.prices.map((price, y) => (
                        <div >
                          {
                            Object.entries(price).map(([key, value]) => (
                              <div
                                className={style.size}
                                key={y + value}
                                onClick={() => {
                                  router.push(`
                                    ${router.query.pizzas}?name=${pizza.name.split(' ').join('-')}&size=${key + '-' + value}&base=${router.query.pizzas}&image=${pizza.image}&toppings=${pizza.toppings.join('-')}`)
                                  console.log(pizza)
                                  setOpenOverlay(true)
                                }}
                              >
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


      {openOverlay && <Backdrop
        sx={{ color: '#black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openOverlay}
      >
        <div className={style.backdrop}>
          <p className={style.close} onClick={() => setOpenOverlay(false)}>close</p>
          <Image
            src={router.query.image}
            alt={router.query.name}
            width={300}
            height={300}
          />

          <h3>{router.query.name}</h3>
          <p>{router.query.toppings}</p>
          <p>Size: {router.query.size && router.query.size.split('-')[0]}</p>

          <button className={style.addToCart}>
            Add to cart
            Total cost: R {router.query.size && Number(router.query.size.split('-')[1]).toFixed(2)}
          </button>

          <div>
            
          </div>

        </div>
      </Backdrop>}
    </div>
  )
}
