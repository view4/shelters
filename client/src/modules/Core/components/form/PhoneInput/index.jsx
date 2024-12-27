// import { forwardRef, useMemo } from 'react'
// import _PhoneInput from 'react-phone-number-input'
// import Input from '../../ui-kit/Input'
// import Text from '../../ui-kit/Text'
// import Container from '../../ui-kit/Container'
// import styles from './styles.module.scss'
// import 'react-phone-number-input/style.css'

// const SRC = 'http://purecatamphetamine.github.io/country-flag-icons/3x2/'
// const renderSelectValue = (val, ...args) => {
//     return Boolean(!val?.length) ? <Text className={styles.label}>Country</Text> : (
//         <Container flex col center className={styles.flagContainer}>
//             <img
//                 src={SRC + val + '.svg'}
//             />
//         </Container>
//     )
// }
// const inputComponent = forwardRef((props, ref) => <Input inputRef={ref} {...props} />)
// const selectComponent = forwardRef(({ options, ...props }, ref) => {
//     const selection = useMemo(() => options?.map(({ value, label }) => ({
//         key: value,
//         readable: label
//     })), [])
//     return (
//         <Input
//             {...props}
//             placeholder={'country'}
//             selection={selection}
//             inputRef={ref}
//             renderValue={renderSelectValue}
//             value={props?.value ?? []}
//             displayEmpty
//             className={styles.countryCode}
//         />

//     )

// })
// const PhoneInput = (props) => (
//     <_PhoneInput
//         inputComponent={inputComponent}
//         countrySelectComponent={selectComponent}
//         {...props}
//     />
// )

// export default PhoneInput;