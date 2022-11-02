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

const defaultTheme = createTheme();

export default function BasicDateTimePicker({ value, onChange }: any) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
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

export function BasicDateTimePickerNew({ value, onChange }: any) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
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
