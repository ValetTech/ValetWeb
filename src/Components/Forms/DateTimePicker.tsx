/* eslint-disable react/jsx-props-no-spreading */
import {
  createTheme,
  StyledEngineProvider,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

export function BasicDateRangePicker({ label, value, onChange }: any) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={{ start: 'From', end: 'To' }}
        >
          {/* <DateRangePicker
            label={label}
            value={value}
            onChange={onChange}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          /> */}
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
  rounded = false,
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
              onChange(
                dayjs(newValue).minute(
                  (Math.ceil(dayjs(newValue).minute() / 15) * 15) % 60
                )
              );
            }}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
