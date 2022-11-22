/* eslint-disable react/jsx-props-no-spreading */
import {
  createTheme,
  StyledEngineProvider,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const defaultTheme = createTheme();

export default function BasicDateTimePicker({ label, value, onChange }: any) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label={label}
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export function BasicDateTimePickerNew({
  label,
  value,
  onChange,
  minDate = dayjs(),
  maxDate,
}: any) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            minDate={minDate}
            maxDate={maxDate}
            inputFormat="DD/MM/YYYY HH:mm a"
            InputAdornmentProps={{ position: 'start' }}
            renderInput={(props) => {
              return <TextField {...props} fullWidth size="small" />;
            }}
            label={label}
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

// function CustomerTextInput(props) {
//   console.log('Props', props);

//   return (
//     <TextInput
//       {...props.inputProps}
//       label={props.label}
//       rightSection={<IconCalendar size="22" />}
//       inputContainer={(children) => (
//       )}
//     />
//   );
// }
