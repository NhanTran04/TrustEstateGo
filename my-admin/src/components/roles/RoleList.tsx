// components/Roles/RoleList.tsx
import React from 'react';
import {
    List, Datagrid, TextField, EditButton, ShowButton, DeleteButton,
    FunctionField, TopToolbar, ExportButton, CreateButton, FilterButton,
    SearchInput, Filter
} from 'react-admin';
// import { RolePreview } from './components/RolePreview';

// const RoleFilter: React.FC = (props) => (
//     <Filter {...props}>
//         <SearchInput source="q" placeholder="Tìm kiếm tên vai trò..." alwaysOn />
//     </Filter>
// );

export const RoleList: React.FC = () => (
    <List
        // filters={<RoleFilter />}
        actions={
            <TopToolbar>
                {/* <FilterButton /> */}
                <CreateButton />
                <ExportButton />
            </TopToolbar>
        }
        perPage={25}
        sort={{ field: 'id', order: 'ASC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="ID" />
            {/* <FunctionField render={() => <RolePreview />} label="Vai trò" /> */}
            <TextField source="description" label="Mô tả" sx={{ maxWidth: 300 }} />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
