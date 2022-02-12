import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import FacilityModel, { FacilityEntity } from 'models/Facility';
import FacilityCard from 'components/FacilityCard';
import Spinner from 'components/Spinner';
import Facility from '../facility';
import { useSnackBarStore } from 'stores/snackbar';

function Home() {
  const [facilities, setFacilities] = useState<FacilityEntity[]>();
  const { alert } = useSnackBarStore();

  const fetchList = async () => {
    try {
      const { data } = await FacilityModel.getList();
      setFacilities(data);
    } catch {
      alert('Unexpected error happened, please try again.');
    }
  };

  const refetchList = useCallback(() => {
    setFacilities(undefined);
    fetchList();
  }, []);

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div>
      <Grid
        container
        width="100%"
        justifyContent="space-between"
        alignItems="center">
        <h1>Facility List</h1>

        <Link to="/facilities/new">Create facility</Link>
      </Grid>

      {facilities && (
        <Grid container width="100%" alignItems="center" gap={3}>
          {facilities.map(facility => (
            <FacilityCard key={facility.id} data={facility} />
          ))}
        </Grid>
      )}

      {!facilities && <Spinner />}

      <Routes>
        <Route path=":id" element={<Facility onSubmit={refetchList} />} />
        <Route path="new" element={<Facility onSubmit={refetchList} />} />
      </Routes>
    </div>
  );
}

export default Home;
