import { Category } from "@mui/icons-material";
import { Chip } from "@mui/material";


export interface Category {
    id: number;
    name: string;
}

const CategoryBadge: React.FC<{ record?: Category }> = ({ record }) => (
    <Chip
        label={record?.name}
        color="primary"
        variant="outlined"
        size="small"
        icon={<Category />}
    />
);

export default CategoryBadge;