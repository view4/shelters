import EntityFormCard from "../../EntityFormCard";

const InputCard = ({ handleSubmit, titleLabel = "Aim", textLabel = "Description", ...props }) => <EntityFormCard
    handleSubmit={handleSubmit}
    titleFieldProps={{ label: titleLabel }}
    textFieldProps={{ rows: 3, label: textLabel }}
    {...props}
/>

export default InputCard;