// /* eslint-disable react/jsx-props-no-spreading */
// /* eslint-disable react/display-name */
// import {
//   Anchor,
//   Button,
//   CloseButton,
//   createStyles,
//   Group,
//   Input,
//   INPUT_SIZES,
//   Paper,
//   Popover,
//   useMantineTheme,
// } from '@mantine/core';
// import { Calendar, TimeInput } from '@mantine/dates';
// import {
//   upperFirst,
//   useClickOutside,
//   useFocusTrap,
//   useMergedRef,
//   useWindowEvent,
// } from '@mantine/hooks';
// import dayjs from 'dayjs';
// import { forwardRef, useEffect, useRef, useState } from 'react';

// export default function TestPage() {
//   const [value, setValue] = useState(null);

//   return (
//     <Paper>
//       <DateTimePicker
//         label="Date Time Picker"
//         placeholder="Pick date time"
//         inputFormat="DD-MMM-YYYY hh:mm a"
//         value={value}
//         onChange={setValue}
//       />
//     </Paper>
//   );
// }

// const DateTimePicker = forwardRef(
//   (
//     {
//       value,
//       onChange,
//       defaultValue,
//       classNames,
//       styles,
//       shadow = 'sm',
//       locale,
//       inputFormat,
//       transitionDuration = 100,
//       transitionTimingFunction,
//       nextMonthLabel,
//       previousMonthLabel,
//       closeCalendarOnChange = false,
//       labelFormat = 'MMMM YYYY',
//       dayClassName,
//       dayStyle,
//       disableOutsideEvents,
//       minDate,
//       maxDate,
//       excludeDate,
//       initialMonth,
//       initiallyOpened = false,
//       name = 'date',
//       size = 'sm',
//       dropdownType = 'popover',
//       clearable = true,
//       disabled = false,
//       clearButtonLabel,
//       fixOnBlur = true,
//       withinPortal = true,
//       dateParser,
//       firstDayOfWeek = 'monday',
//       onFocus,
//       onBlur,
//       amountOfMonths,
//       allowLevelChange,
//       initialLevel,
//       ...others
//     },
//     ref
//   ): any => {
//     const theme = useMantineTheme();
//     const finalLocale = locale || theme.datesLocale;
//     const dateFormat = inputFormat || theme.other.dateTimeFormat;
//     const [dropdownOpened, setDropdownOpened] = useState(initiallyOpened);
//     const calendarSize = size === 'lg' || size === 'xl' ? 'md' : 'sm';
//     const inputRef = useRef();
//     const [lastValidValue, setLastValidValue] = useState(defaultValue ?? null);
//     const [_value, setValue] = useState(value);
//     const [calendarMonth, setCalendarMonth] = useState(
//       _value || initialMonth || new Date()
//     );

//     const [focused, setFocused] = useState(false);
//     const [inputState, setInputState] = useState(
//       _value instanceof Date
//         ? upperFirst(dayjs(_value).locale(finalLocale).format(dateFormat))
//         : ''
//     );

//     useEffect(() => {
//       if (value === null && !focused) {
//         setInputState('');
//       }

//       if (value instanceof Date && !focused) {
//         setInputState(dayjs(value).locale(finalLocale).format(dateFormat));
//       }
//     }, [value, focused]);

//     useEffect(() => {
//       if (!dropdownOpened) {
//         setValue(value);
//       }
//     }, [dropdownOpened]);

//     const handleValueChange = (date) => {
//       if (_value) {
//         date.setHours(_value.getHours());
//         date.setMinutes(_value.getMinutes());
//       } else {
//         const now = new Date(Date.now());
//         date.setHours(now.getHours());
//         date.setMinutes(now.getMinutes());
//       }
//       setValue(date);
//       closeCalendarOnChange &&
//         setInputState(
//           upperFirst(dayjs(date).locale(finalLocale).format(dateFormat))
//         );
//       closeCalendarOnChange && setDropdownOpened(false);
//       window.setTimeout(() => inputRef.current?.focus(), 0);
//     };

//     const handleClear = () => {
//       setValue(null);
//       setLastValidValue(null);
//       setInputState('');
//       setDropdownOpened(true);
//       inputRef.current?.focus();
//       onChange(null);
//     };

//     const parseDate = (date) =>
//       dateParser
//         ? dateParser(date)
//         : dayjs(date, dateFormat, finalLocale).toDate();

//     const handleInputBlur = (e) => {
//       typeof onBlur === 'function' && onBlur(e);
//       setFocused(false);
//     };

//     const handleInputFocus = (e) => {
//       typeof onFocus === 'function' && onFocus(e);
//       setFocused(true);
//     };

//     const handleChange = (e) => {
//       setDropdownOpened(true);

//       const date = parseDate(e.target.value);
//       if (dayjs(date).isValid()) {
//         setValue(date);
//         setLastValidValue(date);
//         closeCalendarOnChange && setInputState(e.target.value);
//         setCalendarMonth(date);
//       } else {
//         closeCalendarOnChange && setInputState(e.target.value);
//       }
//     };

//     const handleTimeChange = (date) => {
//       setValue(date);
//       closeCalendarOnChange &&
//         setInputState(
//           upperFirst(dayjs(date).locale(finalLocale).format(dateFormat))
//         );
//       closeCalendarOnChange && setDropdownOpened(false);
//     };

//     const handleNow = () => {
//       const now = new Date(Date.now());
//       setValue(now);
//       setInputState(
//         upperFirst(dayjs(now).locale(finalLocale).format(dateFormat))
//       );
//       setDropdownOpened(false);
//       window.setTimeout(() => inputRef.current?.focus(), 0);
//       onChange(now);
//     };

//     const handleOk = () => {
//       setInputState(
//         upperFirst(dayjs(_value).locale(finalLocale).format(dateFormat))
//       );
//       setDropdownOpened(false);
//       window.setTimeout(() => inputRef.current?.focus(), 0);
//       onChange(_value);
//     };

//     return (
//       <DateTimePickerBase
//         dropdownOpened={dropdownOpened}
//         setDropdownOpened={setDropdownOpened}
//         shadow={shadow}
//         transitionDuration={transitionDuration}
//         ref={useMergedRef(ref, inputRef)}
//         size={size}
//         styles={styles}
//         classNames={classNames}
//         onChange={handleChange}
//         onBlur={handleInputBlur}
//         onFocus={handleInputFocus}
//         name={name}
//         inputLabel={inputState}
//         __staticSelector="DateTimePicker"
//         dropdownType={dropdownType}
//         clearable={clearable && !!_value && !disabled}
//         clearButtonLabel={clearButtonLabel}
//         onClear={handleClear}
//         disabled={disabled}
//         withinPortal={withinPortal}
//         {...others}
//       >
//         <Calendar
//           classNames={classNames}
//           styles={styles}
//           locale={finalLocale}
//           nextMonthLabel={nextMonthLabel}
//           previousMonthLabel={previousMonthLabel}
//           month={undefined}
//           initialMonth={
//             initialMonth || (_value instanceof Date ? _value : new Date())
//           }
//           onMonthChange={setCalendarMonth}
//           value={_value instanceof Date ? _value : dayjs(_value).toDate()}
//           onChange={handleValueChange}
//           labelFormat={labelFormat}
//           dayClassName={dayClassName}
//           dayStyle={dayStyle}
//           disableOutsideEvents={disableOutsideEvents}
//           minDate={minDate}
//           maxDate={maxDate}
//           excludeDate={excludeDate}
//           __staticSelector="DateTimePicker"
//           fullWidth={dropdownType === 'modal'}
//           size={dropdownType === 'modal' ? 'lg' : calendarSize}
//           firstDayOfWeek={firstDayOfWeek}
//           preventFocus={false}
//           amountOfMonths={amountOfMonths}
//           allowLevelChange={allowLevelChange}
//           initialLevel={initialLevel}
//           mb="sm"
//         />

//         <Group align="center">
//           <Anchor ml="xs" component="button" color="blue" onClick={handleNow}>
//             Now
//           </Anchor>
//           <TimeInput
//             sx={(t) => ({ flexGrow: 1 })}
//             icon={<ClockIcon />}
//             styles={{ controls: { justifyContent: 'center', marginLeft: -20 } }}
//             disabled={!_value}
//             value={_value}
//             onChange={handleTimeChange}
//           />
//           {!closeCalendarOnChange && (
//             <Button mr="xs" disabled={!_value} onClick={handleOk}>
//               Ok
//             </Button>
//           )}
//         </Group>
//       </DateTimePickerBase>
//     );
//   }
// );

// const useStyles = createStyles((t, { size, invalid }) => ({
//   wrapper: {
//     ...t.fn.fontStyles(),
//     position: 'relative',
//     cursor: 'pointer',
//   },
//   placeholder: {
//     lineHeight: `${t.fn.size({ size, sizes: INPUT_SIZES }) - 2}px`,
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
//     color: invalid ? t.colors.red[7] : t.colors.gray[5],
//   },
//   value: { overflow: 'hidden', textOverflow: 'ellipsis' },
//   dropdownWrapper: { position: 'relative', pointerEvents: 'all' },
//   input: { cursor: 'pointer', whiteSpace: 'nowrap' },
//   dropdown: {
//     backgroundColor: t.white,
//     border: `1px solid ${t.colors.gray[2]}`,
//     padding: `${t.spacing.md}px ${t.spacing.xs}px`,
//   },
//   arrow: { borderColor: t.colors.gray[2], background: t.white },
// }));

// const RIGHT_SECTION_WIDTH = {
//   xs: 24,
//   sm: 30,
//   md: 34,
//   lg: 40,
//   xl: 44,
// };

// const DateTimePickerBase = forwardRef(
//   (
//     {
//       classNames,
//       className,
//       style,
//       styles,
//       wrapperProps,
//       required,
//       label,
//       error,
//       id,
//       description,
//       placeholder,
//       shadow = 'sm',
//       transition = 'pop-top-left',
//       transitionDuration = 200,
//       transitionTimingFunction,
//       closeDropdownOnScroll = false,
//       size = 'sm',
//       children,
//       inputLabel,
//       __staticSelector = 'DateTimePickerBase',
//       dropdownOpened,
//       setDropdownOpened,
//       dropdownType = 'popover',
//       clearable = true,
//       clearButtonLabel,
//       onClear,
//       positionDependencies = [],
//       zIndex = 300,
//       withinPortal = true,
//       onBlur,
//       onFocus,
//       onChange,
//       onKeyDown,
//       name = 'date',
//       sx,
//       ...others
//     },
//     ref
//   ): any => {
//     const { classes, cx, theme } = useStyles(
//       { size, invalid: !!error },
//       { classNames, styles, name: __staticSelector }
//     );
//     const [dropdownElement, setDropdownElement] = useState(null);
//     const [rootElement, setRootElement] = useState(null);
//     const [referenceElement, setReferenceElement] = useState(null);

//     const focusTrapRef = useFocusTrap(dropdownOpened);
//     const inputRef = useRef();

//     const closeDropdown = () => setDropdownOpened(false);

//     const closeOnEscape = (e) => {
//       if (e.nativeEvent.code === 'Escape') {
//         closeDropdown();
//         window.setTimeout(() => inputRef.current?.focus(), 0);
//       }
//     };

//     useClickOutside(() => dropdownType === 'popover' && closeDropdown(), null, [
//       dropdownElement,
//       rootElement,
//     ]);

//     useWindowEvent('scroll', () => closeDropdownOnScroll && closeDropdown());

//     const rightSection = clearable ? (
//       <CloseButton
//         variant="transparent"
//         aria-label={clearButtonLabel}
//         onClick={onClear}
//         size={size}
//       />
//     ) : null;

//     const handleClick = () => setDropdownOpened(!dropdownOpened);

//     const handleInputBlur = (e) => typeof onBlur === 'function' && onBlur(e);

//     const handleInputFocus = (e) => typeof onFocus === 'function' && onFocus(e);

//     const handleKeyDown = (e) => {
//       typeof onKeyDown === 'function' && onKeyDown(e);
//       if (e.code === 'Space' || e.code === 'Enter') {
//         e.preventDefault();
//         setDropdownOpened(true);
//       }
//     };

//     return (
//       <Input.Wrapper
//         required={required}
//         label={label}
//         error={error}
//         description={description}
//         className={className}
//         style={style}
//         classNames={classNames}
//         styles={styles}
//         size={size}
//         __staticSelector={__staticSelector}
//         sx={sx}
//         ref={setReferenceElement}
//         {...margins}
//         {...wrapperProps}
//       >
//         <div ref={setRootElement}>
//           <div className={classes.wrapper}>
//             <Input
//               classNames={{
//                 ...classNames,
//                 input: cx(classes.input, classNames?.input),
//               }}
//               styles={styles}
//               onClick={handleClick}
//               onKeyDown={handleKeyDown}
//               ref={useMergedRef(ref, inputRef)}
//               __staticSelector={__staticSelector}
//               size={size}
//               name={name}
//               placeholder={placeholder}
//               value={inputLabel}
//               required={required}
//               invalid={!!error}
//               readOnly
//               rightSection={rightSection}
//               rightSectionWidth={theme.fn.size({
//                 size,
//                 sizes: RIGHT_SECTION_WIDTH,
//               })}
//               onBlur={handleInputBlur}
//               onFocus={handleInputFocus}
//               onChange={onChange}
//               autoComplete="off"
//               {...rest}
//             />
//           </div>

//           <Popover
//             referenceElement={referenceElement}
//             transitionDuration={transitionDuration}
//             transitionTimingFunction={transitionTimingFunction}
//             forceUpdateDependencies={positionDependencies}
//             transition={transition}
//             mounted={dropdownOpened}
//             position="bottom-start"
//             gutter={10}
//             withinPortal={withinPortal}
//             withArrow
//             arrowSize={3}
//             zIndex={zIndex}
//             arrowClassName={classes.arrow}
//           >
//             <div
//               className={classes.dropdownWrapper}
//               ref={setDropdownElement}
//               data-mantine-stop-propagation={dropdownOpened}
//               onKeyDownCapture={closeOnEscape}
//               aria-hidden={undefined}
//             >
//               <Paper
//                 className={classes.dropdown}
//                 shadow={shadow}
//                 ref={focusTrapRef}
//               >
//                 {children}
//               </Paper>
//             </div>
//           </Popover>
//         </div>
//       </Input.Wrapper>
//     );
//   }
// );
