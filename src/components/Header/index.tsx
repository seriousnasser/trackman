import { Grid } from '@mui/material';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import logo from 'assets/logo.svg';

function Header() {
  return (
    <Grid className={styles.header} container alignItems="center">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/facilities">Facilities</Link>
      </nav>
      <div>
        <img src={logo} alt="Trackman" />
      </div>
      <div className={styles.profile}>...</div>
    </Grid>
  );
}

export default Header;
