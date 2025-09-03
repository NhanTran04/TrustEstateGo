import React from 'react';
import {
    List, Datagrid, EmailField, TextField,
    FunctionField, EditButton, ShowButton, DeleteButton,
    TopToolbar, FilterButton, CreateButton, ExportButton,
} from 'react-admin';
import { UserAvatar } from './UserAvatar';
import { FullNameField } from './FullnameField';
import { RolesField } from './RoleField';
import { StatusField } from './StatusField';

const UserListActions: React.FC = () => (
    <TopToolbar>
        {/* <FilterButton /> */}
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const UserList: React.FC = () => (
    <List actions={<UserListActions />} perPage={25} sort={{ field: 'id', order: 'DESC' }}>
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <FunctionField render={() => <UserAvatar />} label="" />
            <FunctionField render={() => <FullNameField />} label="Họ tên" />
            <TextField source="username" label="Tên đăng nhập" />
            <EmailField source="email" label="Email" />
            <TextField source="phone" label="Số điện thoại" />
            <FunctionField render={() => <RolesField />} label="Vai trò" />
            <FunctionField render={() => <StatusField />} label="Trạng thái" />
            <EditButton />
            <ShowButton />
            <DeleteButton />
        </Datagrid>
    </List>
);
