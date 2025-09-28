import { Edit, SimpleForm, BooleanInput } from "react-admin";

const ReportEdit = () => (
    <Edit>
        <SimpleForm>
            <BooleanInput source="status" label="Đã Xử lý" />
        </SimpleForm>
    </Edit>
);

export default ReportEdit;
