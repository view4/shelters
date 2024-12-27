// import * as React from "react";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs, { Dayjs } from "dayjs";
// import { InputLabel } from "../index";
// import Container from "../../Container";
// import styles from "./styles.module.scss";

// export default function CalendarDatePicker({
//   onChange,
//   value,
//   label,
//   minDate,
//   ...props
// }) {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Container className={styles.container}>
//         <InputLabel label={label} />
//         <DatePicker
//           value={value}
//           onChange={onChange}
//           minDate={minDate && dayjs(minDate)}
//           {...props}
//         />
//       </Container>
//     </LocalizationProvider>
//   );
// }
