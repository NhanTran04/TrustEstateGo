import {
    List,
    Datagrid,
    TextField,
    DateField,
    ImageField,
    EditButton,
    DeleteButton,
    FunctionField,
} from "react-admin";

const ReportList = () => (
    <List perPage={10}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="userId" label="userId" />
            <TextField source="name" label="Người tố cáo" />
            <TextField source="propertyId" label="Id bất động sản" />
            <TextField source="propertyTitle" label="Tên bất động sản" />
            <ImageField source="propertyImage" label="Hình ảnh" />
            <TextField source="reason" label="Lý do không chính xác" />
            <FunctionField
                label="Trạng thái"
                render={(record) =>
                    record.status === true
                        ? "✅ Đã xử lý"
                        : "⏳ Chưa xử lý"
                }
            />
            <DateField source="createdAt" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default ReportList;
