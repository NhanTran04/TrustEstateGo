import React from 'react';
import { List, Datagrid, TextField, FunctionField, DateField, EditButton, ShowButton, DeleteButton } from 'react-admin';
import PackageListActions from './PackageActions';
import PriceField from './PackagePrice';
import DurationField from './PackageDuration';

export const PackageList: React.FC = () => (
  <List actions={<PackageListActions />} perPage={25} sort={{ field: 'id', order: 'DESC' }}>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Tên gói" />
      <FunctionField render={() => <PriceField />} label="Giá" />
      <FunctionField render={() => <DurationField />} label="Thời hạn" />
      <TextField source="description" label="Mô tả" />
      <DateField source="createdAt" label="Ngày tạo" showTime />
      <EditButton />
      <ShowButton />
      <DeleteButton />
    </Datagrid>
  </List>
);