import { Outlet } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Header from 'components/Header';
import { SnackBarProvider } from 'stores/snackbar';
import styles from './App.module.scss';
import Snackbar from './components/Snackbar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EC691A',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.App}>
        <Header />

        <div id="app" className={styles.content}>
          <SnackBarProvider>
            <Outlet />
            <Snackbar />
          </SnackBarProvider>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
