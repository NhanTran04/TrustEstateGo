import { Box } from "@mui/material";
import { FunctionField, Show, SimpleShowLayout, TextField } from "react-admin";
import { Category } from "./CategoryBadge";
import CategoryCard from "./CategoryCard";

export const CategoryShow: React.FC = () => (
    <Show>
        <SimpleShowLayout>
            <Box sx={{ mb: 3 }}>
                <FunctionField<Category> render={record => <CategoryCard record={record} />} label="" />
            </Box>
            <TextField source="id" label="ID danh mục" />
            <TextField source="name" label="Tên danh mục" />
        </SimpleShowLayout>
    </Show>
);