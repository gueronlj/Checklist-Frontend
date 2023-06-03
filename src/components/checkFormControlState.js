import { useMemo } from 'react';
import { useFormControl } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const CheckFormControl = (props) => {
  const { filled } = useFormControl() || false;

  const helperText = useMemo(() => {
    if (props.errors.email) {
      return props.errors.email.message;
    }
    return null;
  }, [props.errors.email]);

  return <FormHelperText id='error-text'>{helperText}</FormHelperText>;

}

export default CheckFormControl;
