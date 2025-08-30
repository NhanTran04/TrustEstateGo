import { Box, Typography } from "@mui/material";
import { Create, minLength, required, SimpleForm, TextInput } from "react-admin";

export const CategoryCreate: React.FC = () => (
  <Create>
    <SimpleForm>
      <Box sx={{ maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom color="primary">Tạo danh mục mới</Typography>
        <TextInput
          source="name"
          label="Tên danh mục"
          validate={[required(), minLength(2)]}
          fullWidth
          helperText="Nhập tên danh mục (ít nhất 2 ký tự)"
        />
      </Box>
    </SimpleForm>
  </Create>
);