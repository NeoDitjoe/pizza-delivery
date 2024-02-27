import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import style from './dashboard.module.css'
import { FaPen } from "react-icons/fa";

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 0, md: 0 }}>
        <Grid xs={12} md={3} s={6} mx={0}>
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
                      items.items.map((item) => (
                        <tr className={style.item}>
                          <td>{Object.keys(item)}</td>
                          <td className={style.qty}>
                            {Object.values(item)}
                            <FaPen
                              className={style.editPen}
                              onClick={() => console.log(items.category)}
                            />
                          </td>
                        </tr>
                      ))
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
