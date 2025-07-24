// import { useCallback, useState } from "react";
// import { useRequest } from "modules/Core/hooks/useMiddleware";
// import useOnError from "modules/Core/sub-modules/Dialog/hooks/useOnError";
// import Container from "../../ui-kit/Container";
// import PhoneInput from "../PhoneInput";
// import _Button from "modules/Core/sub-modules/ui-kit/components/Button";
// import { InputLabel } from "../../ui-kit/Input";
// import withShouldRender from "modules/Core/higher-order-components/withShouldRender";

// const query = `
//     query fetchUser($phoneNumber: String!){
//         fetchUser(phoneNumber: $phoneNumber){
//             id
//             phoneId
//             information {
//                 photo
//                 firstName
//                 lastName
//                 bio
      
//             }
//         }
//     }
// `

// const Button = withShouldRender(_Button);

// export const PhoneNumberField = ({ label, buttonLabel = 'add', onChange, value, manual, ...props }) => {
//     const [phoneNumber, setPhoneNumber] = useState('')
//     const handleRequest = useRequest(query);
//     const onError = useOnError();

//     const validate = useCallback(async () => {
//         const res = await handleRequest({ phoneNumber })
//         if (!res?.fetchUser?.id) return onError('User not found');
//         return res?.fetchUser
//     }, [phoneNumber]);

//     const handleAdd = useCallback(async () => {
//         const user = await validate();
//         if (!user) return
//         onChange(user);
//         setPhoneNumber('');
//     }, [validate, onChange]);

//     const handleOnChange = useCallback((val) => {
//         if (manual) return setPhoneNumber(val)
//         onChange(val)
//     }, [manual, onChange])


//     return (
//         <Container flex col span >
//             <InputLabel label={label} />
//             <PhoneInput
//                 value={phoneNumber}
//                 onChange={handleOnChange}
//                 {...props}
//             />
//             <Container mt1 maxWidth flex flexEnd>
//                 <Button onClick={handleAdd} shouldRender={Boolean(manual)} >
//                     {buttonLabel}
//                 </Button>
//             </Container>
//         </Container>
//     )
// };

// export default PhoneNumberField