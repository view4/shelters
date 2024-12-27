import { formatPhoneNumberIntl } from "react-phone-number-input";

export const formatPhoneNumber = (phoneNumber) =>
  formatPhoneNumberIntl(phoneNumber);
export const formatPhoneNumberDiscretely = (phoneNumber) => {
  const formatted = formatPhoneNumber(phoneNumber);
  const split = formatted.split(" ");
  const initial = split.shift();
  const remaining = split.pop();
  const middle = split.reduce(
    (str, sect) =>
      str.replace(/[0-9]/g, "x") + " " + sect.replace(/[0-9]/g, "x")
  );

  return initial + " " + middle + " " + remaining;
};
