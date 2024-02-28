import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import style from './dashboard.module.css'
import { FaPen } from "react-icons/fa";
import stateContext from '@/util/context';
import PostMethod from '@/util/postMethod';
import { useRouter } from 'next/router';
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

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
  const router = useRouter()
  const { setAlert } = stateContext()
  const [loading, setLoading] = useState(false)

  async function editHandler(edit) {

    try {
      setLoading(true)
      const response = await PostMethod('/api/dashboard/editQty', edit)
      if (response.message === 'success') {
        setLoading(false)
        setAlert('success')
        router.push('/dashboard')
      }
    } catch (error) {
      setLoading(false)
      setAlert('Something went wrong!')
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 0, md: 0 }}>
        <Grid xs={12} md={12} s={12} mx={0}>
          <Item>
            {
              data?.map((items) => (
                <table className={style.table}>
                  <h2>{items.category}</h2>
                  <tr>
                    <td>name</td>
                    <td className={style.qty}>quantity</td>
                  </tr>

                  <tbody>
                    {
                      items.items.map((item) => {

                        const edit = router.query.edit === item.name

                        return (
                          <tr className={style.item}>
                            <td>{item.name}</td>
                            <td className={style.qty}>
                              {
                                edit
                                  ? <form
                                    onSubmit={(e) => {
                                      e.preventDefault()

                                      const formData = new FormData(e.target)
                                      const newQty = Number(formData.get('qty'))

                                      editHandler({ category: items.category, product: item.name, qty: newQty })
                                    }}
                                    action='#'
                                    className={style.form}
                                  >
                                    <input type='number' name='qty' required />
                                    {
                                      !loading
                                        ? <div>
                                          <button>
                                            <TiTick size={'20px'} />
                                          </button>
                                          <RxCross2
                                            color='red'
                                            size='20px'
                                            onClick={() => router.push('/dashboard')}
                                            cursor={'pointer'}
                                          />
                                        </div>
                                        : <CircularProgress size={'20px'} />
                                    }
                                  </form>
                                  : item.quantity
                              }

                              {
                                !edit && <FaPen
                                  className={style.editPen}
                                  onClick={() => router.push(`/dashboard?edit=${item.name}`)}
                                />
                              }

                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              ))}
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
