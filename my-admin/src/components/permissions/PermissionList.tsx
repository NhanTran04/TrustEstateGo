import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    TopToolbar,
    ExportButton,
    CreateButton,
    FilterButton,
    FunctionField,
    EditButton,
    ShowButton,
    DeleteButton,
} from 'react-admin';
import PermissionPreview from './PermissionPreview';
// import PermissionFilter from './parts/PermissionFilter';
// import PermissionPreview from './parts/PermissionPreview';

export const PermissionList: React.FC = () => (
    <List
        // filters={<PermissionFilter />}
        actions={
            <TopToolbar>
                {/* <FilterButton /> */}
                <CreateButton />
                <ExportButton />
            </TopToolbar>
        }
        perPage={25}
        sort={{ field: 'name', order: 'ASC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="ID" sx={{ maxWidth: 600 }} />
            <TextField source="name" label="Tên quyền" sx={{ maxWidth: 600 }} />
            <TextField source="description" label="Mô tả" sx={{ maxWidth: 600 }} />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
