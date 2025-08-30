import React from "react";
import { Datagrid, DeleteButton, EditButton, FunctionField, List, ShowButton, TextField } from "react-admin";
import CategoryBadge, { Category } from "./CategoryBadge";


export const CategoryList: React.FC = () => (
    <List
        //actions={<CategoryListActions />}
        perPage={25}
        sort={{ field: 'id', order: 'ASC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="ID" />
            <FunctionField<Category> render={record => <CategoryBadge record={record} />} label="Tên danh mục" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);