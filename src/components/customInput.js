import { useFormControlContext } from '@mui/base/FormControl';
import Input from '@mui/material/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Key from '@mui/icons-material/Key';

const CustomInput = (props) => {
  const formControlContext = useFormControlContext();
  console.log(formControlContext);
  // if (formControlContext === undefined) {
  //   return null;
  // }

  // const { value, required, onChange, disabled, onFocus, onBlur, error, filled } = formControlContext;

  // return (
  //   <input
  //     value={value}
  //     required={required}
  //     onChange={onChange}
  //     disabled={disabled}
  //     onFocus={onFocus}
  //     onBlur={onBlur}
  //     error={error}
  //     filled={filled}
  //   />
  // );

  return(
    <Input
       required
       type={props.type}
       name={props.name}
       id="standard-required"
       variant="standard"
       autoComplete={props.autoComplete}
       startAdornment={
        <InputAdornment position="start">
          <AccountCircle />
        </InputAdornment>
      }/>
  )
}

export default CustomInput
