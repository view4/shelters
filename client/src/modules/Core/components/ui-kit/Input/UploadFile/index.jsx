import Input from "modules/Core/components/ui-kit/Input"
import Container from "modules/Core/components/ui-kit/Container";
import Button from "../../Button";
import Attachment from "../../Attachment";

const UploadFile = ({ className, file, upload, onChange }) => (
    <Container flex center col className={className}>
        <Input file value={file} onChange={onChange} ValueComponent={Attachment} />
        <Button disabled={!Boolean(file)} onClick={upload}>Upload</Button>
    </Container>
);

export default UploadFile;