import { isValidPhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input'


export const validatePhoneNumber = (value) => {
    return isValidPhoneNumber(value) && isPossiblePhoneNumber(value)
}