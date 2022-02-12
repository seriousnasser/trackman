import { Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { FacilityEntity } from 'models/Facility';
import styles from './styles.module.scss';

interface Props {
  data: FacilityEntity;
}

function FacilityCard({ data }: Props) {
  return (
    <Link className={styles.cardLink} to={`/facilities/${data.id}`}>
      <Card>
        <CardContent>
          <h2 className={styles.name}>{data.name}</h2>
          <div>
            {data.type} <span>Facility</span>
          </div>
          <address className={styles.address}>address: {data.address}</address>
        </CardContent>
      </Card>
    </Link>
  );
}

export default FacilityCard;
