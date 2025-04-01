import React from "react";
import c from "classnames";
import { noop } from "lodash";
import Container from "../Container";
import Text from "../Text";
import { Switch, TextField } from "@mui/material";
import TextAreaInput from "../TextAreaInput";
import withUIKitClasses from "modules/Core/higher-order-components/withUIKitClasses";
import SelectInput from "./SelectInput";
import Checkbox from "./Checkbox";
import ImageInput from "./ImageInput";
import FileInput from "./FileInput";
import styles from "./styles.module.scss";
import SearchableSelect from "./SearchableSelect";
import CalendarDatePicker from "./DatePicker";
// import UserGuideButton from "modules/Core/sub-modules/Dialog/components/UserGuideButton";

const InputComponent = ({ onChange = noop, ...props }) => (
  <TextField onChange={(e) => onChange(e.target.value)} {...props} />
);

export const InputLabel = ({ label, className, userGuideKey, ...props }) => (
  <Text className={c(styles.label, className)} {...props}>
    {label}
    {/* <UserGuideButton 
      userGuideKey={userGuideKey} 
      className={styles.btn} 
    /> */}
  </Text>
);

const LabelledInput = ({ label, children, userGuideKey, ...props }) => (
  <Container
    className={c(styles.labelledInputContainer, props.containerClassName)}
    flex
    column
    relative
    maxWidth
  >
    <InputLabel userGuideKey={userGuideKey} label={label} />
    <Input {...props} />
    {children}
  </Container>
);

const SwitchInput = ({ onChange, value, ...props }) => {
  return (
    <Switch
      {...props}
      onChange={(e) => onChange(e.target.checked)}
      checked={value === true}
    />
  );
};

const NumberInput = ({ number, className, ...props }) => (
  <Input type="number" className={c(styles.num, className)} {...props} />
);

const Input = ({ ...props }) => {
  if (props?.label) return <LabelledInput {...props} />;
  if (props?.textarea || props?.multiline) return <TextAreaInput {...props} />;
  if (props?.selection && props?.searchable)
    return <SearchableSelect {...props} />;
  if (props?.selection) return <SelectInput {...props} />;
  if (props?.image) return <ImageInput {...props} />;
  if (props?.file) return <FileInput {...props} />;
  if (props?.checkbox) return <Checkbox {...props} />;
  if (props.switch) return <SwitchInput {...props} />;
  if (props?.number) return <NumberInput {...props} />;
  if (props?.date) return <CalendarDatePicker {...props} />;

  return <InputComponent {...props} />;
};

export default withUIKitClasses(Input);
