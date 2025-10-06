import c from "classnames";
import BoothScreen from "modules/shelter/components/BoothScreen";
import BoothScreenHeader from "modules/shelter/components/BoothScreen/BoothScreenHeader";
import { ENTRIES } from "modules/booths/components/InfoComponent/lib/keys";
import { Text, Card, ConditionalContainer, Button, TextAreaInput, Container } from "modules/Core/sub-modules/ui-kit/exports";
import { formatDateTime } from "modules/Core/sub-modules/ui-kit/components/Date";
import styles from "./styles.module.scss"

const ViewEntryScreen = ({
    name,
    text,
    id,
    boothId,
    createdAt,
    onSave,
    isEditMode,
    openEditMode,
    closeEditMode,
    draftText,
    setDraftText,
    handleCardDoubleClick
}) => (
    <BoothScreen
        boothId={boothId}
        RightPanelComponent={() => (
            <ConditionalContainer className={styles.rightPanelContainer} shouldRender={isEditMode} maxWidth maxHeight flex col flexEnd>
                <Button onClick={onSave}>Save</Button>
                <Button onClick={closeEditMode}>Cancel</Button>
            </ConditionalContainer>
        )}
    >
        <BoothScreenHeader
            header={name}
            options={[{ text: "Edit", props: { onClick: openEditMode } }]}
            subheading={formatDateTime(createdAt)}
            infoKey={ENTRIES.view}
        />
        <Card onDoubleClick={handleCardDoubleClick} className={styles.card}>
            <ConditionalContainer shouldRender={isEditMode} maxWidth maxHeight flex col>
                <TextAreaInput
                    className={c(styles.editorInput)}
                    defaultValue={text}
                    // value={draftText}
                    onChange={setDraftText}
                    rows={8}
                />
            </ConditionalContainer>
            <ConditionalContainer shouldRender={!isEditMode} maxWidth maxHeight flex col>
                <Text className={styles.text}>{text}</Text>
            </ConditionalContainer>

        </Card>
    </BoothScreen>
)


export default ViewEntryScreen