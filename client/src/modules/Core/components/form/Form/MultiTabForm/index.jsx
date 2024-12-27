// import useSchemaFormFields from "modules/Core/components/form/Form/hooks/useSchemaFormFields"
// import { useMemo } from "react";

// const MultiTabForm = ({ tabs, activeTabIndex, initialState, options }) => {
//     const [tabFields, Component] = useMemo(() => ([
//         tabs[activeTabIndex]?.fields,
//         tabs[activeTabIndex]?.Component
//     ]), [activeTabIndex, tabs]);

//     const { fields } = useSchemaFormFields({ fields: tabFields }, initialState, options);

//     const children = useMemo(() => fields || <Component />, [fields, Component]);
//     return (
//         <>
//             {children}
//         </>
//     )
// }

// export default MultiTabForm