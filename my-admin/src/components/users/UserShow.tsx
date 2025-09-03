import React from 'react';
import {
    Show, TabbedShowLayout, Tab, TextField, DateField,
    FunctionField, ReferenceArrayField, SingleFieldList, ChipField,
} from 'react-admin';
import { UserInfoCard } from './UserInfoCard';
import { StatusField } from './StatusField';

export const UserShow: React.FC = () => (
    <Show>
        <TabbedShowLayout>
            <Tab label="Thông tin cá nhân">
                <FunctionField render={() => <UserInfoCard />} label="" />
            </Tab>

            <Tab label="Thông tin hệ thống">
                <TextField source="id" label="ID" />
                <TextField source="username" label="Tên đăng nhập" />
                <FunctionField render={() => <StatusField />} label="Trạng thái" />
                <ReferenceArrayField source="roles" reference="roles" label="Vai trò">
                    <SingleFieldList>
                        <ChipField source="name" color="primary" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <DateField source="createdAt" label="Ngày tạo" showTime />
                <DateField source="updatedAt" label="Cập nhật lần cuối" showTime />
            </Tab>
        </TabbedShowLayout>
    </Show>
);
