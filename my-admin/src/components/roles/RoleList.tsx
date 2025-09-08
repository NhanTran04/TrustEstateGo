import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    FunctionField,
    TopToolbar,
    CreateButton,
    ExportButton,
    EditButton,
    ShowButton,
    DeleteButton,
} from 'react-admin';
import RolePreview from './RolePreview';


const RoleList: React.FC = () => (
    <List
        actions={
            <TopToolbar>
                <CreateButton />
                <ExportButton />
            </TopToolbar>
        }
        perPage={25}
        sort={{ field: 'id', order: 'ASC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="ID" />
            <FunctionField render={() => <RolePreview />} label="Vai trò" />
            <TextField source="description" label="Mô tả" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export default RoleList;
