import { useAppSelector } from '../../Store/hooks'
import { getUser } from '../../Store/user/userSelectors'
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  ThemeProvider,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { GlobalTheme } from '../..'

const HomePage = () => {
  const user = useAppSelector(getUser)

  const style = {
    background: 'linear-gradient(10deg,	#FFF8DC 10%,#F5DEB3 90%)',
    boxShadow: '0 3px 5px 2px 	#808080',
    backgroundSize: '200% 100%',
    animation: '$progress 5s linear infinite',
    mt: 2,
    mb: 2,
    color: 'black',
    ':hover': {
      boxShadow: 30,
      background: '#d3d3d3',
	  transform: 'scale(1.2)'
    }
  }
  return (
    <ThemeProvider theme={GlobalTheme}>
      <Container
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '50px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            gap: '20px',
          }}
        >
          <Typography variant="h2" color="primary">
            Flowers Shop CRM
          </Typography>
        </Box>
        {user.isAuthenticated ? (
          <Container>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: 250,
                  height: 250,
                },
              }}
            >
              <Paper
                component={Link}
                to="/new-invoice"
                elevation={15}
                sx={style}
              >
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  Создать приход
                </Typography>
              </Paper>
              <Paper component={Link} to="/invoices" elevation={15} sx={style}>
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  Приходы
                </Typography>
              </Paper>
              <Paper
                component={Link}
                to="/florist_page"
                elevation={15}
                sx={style}
              >
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  Для флориста
                </Typography>
              </Paper>
              <Paper
                component={Link}
                to="/available_bouquets"
                elevation={15}
                sx={style}
              >
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  Витрина
                </Typography>
              </Paper>
              <Paper component={Link} to="/orders" elevation={15} sx={style}>
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  История заказов
                </Typography>
              </Paper>
              <Paper component={Link} to="/recipes" elevation={15} sx={style}>
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  Рецепты
                </Typography>
              </Paper>
              <Paper component={Link} to="/suppliers" elevation={15} sx={style}>
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  Поставщики
                </Typography>
              </Paper>
              <Paper component={Link} to="/items" elevation={15} sx={style}>
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  Каталог товаров
                </Typography>
              </Paper>
              <Paper
                component={Link}
                to="/items_categories"
                elevation={15}
                sx={style}
              >
                <Typography align="center" variant="h5" sx={{ pt: 14 }}>
                  Категории товаров
                </Typography>
              </Paper>
            </Box>
          </Container>
        ) : null}
      </Container>
    </ThemeProvider>
  )
}

export default HomePage
