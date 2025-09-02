import { DateRange } from '@mui/icons-material';
import React from 'react';
import { Show, TabbedShowLayout, Tab, TextField, ReferenceField, DateField, FunctionField, RecordContextProvider } from 'react-admin';
import PropertyImages from './fields/Images';
import { LocationField } from './fields/Location';
import StatusField from './fields/Status';
import BreadcrumbTitle from '../Breadcrumb';
// import { PropertyIcon, DateIcon } from '@mui/icons-material';
// import { PropertyCard } from './shared';

export const PropertyShow: React.FC = () => (
    <Show title={
        <RecordContextProvider value={{ name: "Chi tiết" }}>
            <BreadcrumbTitle base="Bài đăng" basePath="/properties" />
        </RecordContextProvider>
    }>
        <TabbedShowLayout>
            {/* <Tab label="Thông tin bất động sản">
        <FunctionField render={() => <PropertyCard />} label="" />
      </Tab> */}

            <Tab label="Chi tiết hệ thống" icon={<DateRange />}>
                <TextField source="id" label="ID" />
                <ReferenceField source="userId" reference="users" label="Người đăng">
                    <TextField source="firstName" />
                </ReferenceField>
                <ReferenceField source="categoryId" reference="categories" label="Danh mục">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="title" label="Tiêu đề" />
                <FunctionField render={() => (
                    <div
                        onClick={(e) => e.stopPropagation()} // chặn rowClick
                    >
                        <PropertyImages />
                    </div>
                )} label="Ảnh" />
                <TextField source="propertyType" label="Loại BĐS" />
                <FunctionField render={() => <LocationField />} label="Địa chỉ" />
                <FunctionField render={() => <StatusField />} label="Trạng thái" />
                <TextField source="description" label="Mô tả" />
                <DateField source="createdAt" label="Ngày tạo" showTime />
                <DateField source="expireAt" label="Ngày hết hạn" showTime />
            </Tab>
        </TabbedShowLayout>
    </Show>
);