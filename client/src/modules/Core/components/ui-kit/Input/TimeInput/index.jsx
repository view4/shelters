import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { InputLabel } from "../index";
import Container from "../../Container";
import styles from "./styles.module.scss";

export default function TimeInput({
  onChange,
  value,
  label,
  minDate,
  ...props
}) {
  console.log(value)

  console.log(typeof value, value?.getHours(), value?.getMinutes())
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container className={styles.container}>
        <InputLabel label={label} />
        <TimePicker
          value={value}
          onChange={onChange}
          {...props}
        />
      </Container>
    </LocalizationProvider>
  );
}
