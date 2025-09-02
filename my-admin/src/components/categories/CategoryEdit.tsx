import { Box, Typography } from "@mui/material";
import { Edit, minLength, required, SimpleForm, TextInput } from "react-admin";
import BreadcrumbTitle from "../Breadcrumb";

export const CategoryEdit: React.FC = () => (
    <Edit title={<BreadcrumbTitle base="Danh mục" basePath="/categories" />}>
        <SimpleForm>
            <Box sx={{ maxWidth: 600 }}>
                <Typography variant="h6" gutterBottom color="primary">Chỉnh sửa danh mục</Typography>
                <TextInput
                    source="name"
                    label="Tên danh mục"
                    validate={[required(), minLength(2)]}
                    fullWidth
                    helperText="Nhập tên danh mục (ít nhất 2 ký tự)"
                />
            </Box>
        </SimpleForm>
    </Edit>
);