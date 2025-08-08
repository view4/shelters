import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { InputLabel } from "../index";
import Container from "../../Container";
import styles from "./styles.module.scss";

export default function CalendarDatePicker({
  onChange,
  value,
  label,
  minDate,
  ...props
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container className={styles.container}>
        <InputLabel label={label} />
        <DatePicker
          value={value}
          onChange={onChange}
          {...props}
        />
      </Container>
    </LocalizationProvider>
  );
}
