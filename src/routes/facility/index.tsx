import React, { useEffect, useReducer } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FacilityModel from 'models/Facility';
import {
  changeAction,
  pendingAction,
  initialState,
  reducer,
  submitAction,
  validateAction,
  Values,
  readyAction,
} from './form-reducer';
import Spinner from 'components/Spinner';
import { useSnackBarStore } from '../../stores/snackbar';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 360,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface Props {
  onSubmit: () => void;
}

function Facility({ onSubmit }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { alert } = useSnackBarStore();
  const title = id ? 'Edit Information' : 'Create Facility';

  const [{ values, errors, isSubmitting, isPending }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const getFacilityData = async (facilityId: string) => {
    try {
      const {
        data: { name, address, type },
      } = await FacilityModel.getOne(facilityId);

      dispatch(
        changeAction({
          name,
          address,
          type,
        })
      );
    } catch {
      alert('Unexpected error happened, please try again.');
    }

    dispatch(readyAction());
  };

  const handleClose = () =>
    navigate('/facilities', {
      replace: true,
    });

  const handleInputChange = e => {
    const { name, value } = e.target;
    dispatch(changeAction({ [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const validationResult = validate(values);
    const hasError = Object.keys(validationResult).length > 0;

    if (hasError) {
      dispatch(validateAction(validationResult));

      return;
    }

    dispatch(submitAction());
  };

  const handleDelete = async () => {
    if (id) {
      dispatch(pendingAction());
      await FacilityModel.delete(id);
      handleClose();
      onSubmit();
    }
  };

  const saveFormValues = async () => {
    if (id) {
      await FacilityModel.update(id, values);
    } else {
      await FacilityModel.create(values);
    }

    handleClose();
    onSubmit();
  };

  useEffect(() => {
    if (id) {
      dispatch(pendingAction());

      getFacilityData(id);
    }
  }, [id]);

  useEffect(() => {
    if (isSubmitting) {
      saveFormValues();
    }
  }, [isSubmitting]);

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={boxStyle}>
        {isPending && <Spinner />}

        <Grid
          container
          width="100%"
          justifyContent="space-between"
          alignItems="center">
          <h3>{title}</h3>

          {id && (
            <Button variant="text" color="primary" onClick={handleDelete}>
              Delete facility
            </Button>
          )}
        </Grid>

        <Grid container direction="column" alignItems="center">
          <Grid item width="100%" marginBottom="20px">
            <TextField
              fullWidth
              name="name"
              label="Facility name"
              variant="standard"
              value={values.name}
              error={Boolean(errors.name)}
              helperText={errors.name}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item width="100%">
            <FormControl error={Boolean(errors.type)} fullWidth>
              <RadioGroup
                row
                name="type"
                value={values.type}
                onChange={handleInputChange}>
                <FormControlLabel
                  value="range"
                  control={<Radio />}
                  label="Range"
                />
                <FormControlLabel
                  value="indoor"
                  control={<Radio />}
                  label="Indoor"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item width="100%" marginBottom="20px">
            <TextField
              fullWidth
              name="address"
              label="Address"
              variant="standard"
              error={Boolean(errors.address)}
              helperText={errors.address}
              value={values.address}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item width="100%" marginTop="20px">
            <Button color="primary" onClick={handleClose}>
              Cancel
            </Button>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}>
              Save changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

function validate(values: Values): Values {
  const errors = {};

  for (const key in values) {
    if (!values[key]) {
      errors[key] = 'Field can not be empty!';
    }
  }

  return errors;
}

export default Facility;
