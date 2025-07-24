// import Container from "modules/Core/sub-modules/ui-kit/components/Container";
// import { InputLabel } from "modules/Core/sub-modules/ui-kit/components/Input";
// import PhoneNumberField from "../PhoneNumberField";
// import { TeamMembersCard } from "modules/Partners/submodules/team-members/components/TeamMembersFeed/FeedItem";
// import styles from './styles.module.scss';

// const UsersField = ({ value, onChange, label, ...props }) => {
//     return (
//         <Container>
//             <InputLabel label={label} />
//             {value?.map((user) => (
//                 <TeamMembersCard key={user?.id} name={user?.fullName ?? 'Anonymous User'} />
//             ))}
//             <PhoneNumberField
//                 onChange={(user) => user?.id && onChange([...(value ?? []), user])}
//                 value={value}
//                 manual
//                 {...props}
//             />
//         </Container>
//     )
// }

// export default UsersField;