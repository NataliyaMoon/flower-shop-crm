import { GlobalTheme } from '../..';
import FloristMenu from '../../Components/FloristUI/FloristMenu/FloristMenu';
import { Container, ThemeProvider } from '@mui/material';

const FloristPage = () => {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <Container sx={{display: 'flex'}}>
        <FloristMenu />
      </Container>
    </ThemeProvider>

  );
};

export default FloristPage;
