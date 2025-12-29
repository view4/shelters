import SchemaForm from "modules/Core/components/form/Form/SchemaForm";
import Container from "modules/Core/sub-modules/ui-kit/components/Container";
import Title from "modules/Core/sub-modules/ui-kit/components/Title";
import FeatureWrapper from "modules/Core/components/FeatureWrapper";
import Button from "modules/Core/sub-modules/ui-kit/components/Button";
import BoothScreen from "modules/shelter/components/BoothScreen";
import BoothsScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import styles from "./styles.module.scss";

export default ({ schema, onSubmit }) => (
    <BoothScreen spaceBetween flex col>
        <Container >
            {/* <Title text="Create Booth" /> */}
            <BoothsScreenHeader header="Create Booth" />
            <SchemaForm
                schema={schema}
                onSubmit={onSubmit}
                className={styles.form}
            />
        </Container>
        <Container mb3>
            <FeatureWrapper featureKey="mapal">
                <Button mb3 text='Create Mapal Booth' to="/mapal/create" panel />
            </FeatureWrapper>
            <FeatureWrapper featureKey="malchut">
                <Button mb3 text='Create Malchut Booth' to="/teachings/create" panel />
            </FeatureWrapper>
        </Container>
    </BoothScreen>
)