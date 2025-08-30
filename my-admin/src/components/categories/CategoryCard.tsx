import React from "react";
import { Category } from "./CategoryBadge";
import { Box, Typography } from "@mui/material";
import { CategorySharp } from "@mui/icons-material";

const CategoryCard: React.FC<{ record?: Category }> = ({ record }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1, borderRadius: 1, bgcolor: 'background.paper' }}>
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 40, height: 40, borderRadius: 2, bgcolor: 'primary.main', color: 'white'
        }}>
            <CategorySharp fontSize="small" />
        </Box>
        <Box>
            <Typography variant="subtitle1" fontWeight={600}>{record?.name}</Typography>
            <Typography variant="caption" color="text.secondary">ID: {record?.id}</Typography>
        </Box>
    </Box>
);

export default CategoryCard;