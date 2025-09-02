import React from "react";
import { CreateButton, Datagrid, DateField, DeleteButton, EditButton, ExportButton, FilterButton, FunctionField, List, ReferenceField, TextField, TopToolbar } from "react-admin";
import PriceField from "../packages/PackagePrice";
import { LocationField } from "./fields/Location";
import PropertyFilter from "./PropertyFilter";
import StatusField from "./fields/Status";
import { Stack } from "@mui/material";
import PropertyImages from "./fields/Images";
import { Link } from "react-router";


export const PropertyList: React.FC = () => (
    <List

        filters={PropertyFilter}
        filterDefaultValues={{}}
        actions={
            <TopToolbar>
                <FilterButton />
                <CreateButton />
                <ExportButton />
            </TopToolbar>
        }
        perPage={5}
        sort={{ field: 'createdAt', order: 'DESC' }}
    >
        <Datagrid rowClick="show" bulkActionButtons={false}>
            <TextField source="id" label="ID" />
            <FunctionField
                label="UserID"
                render={(record: any) => (
                    <UserIdLinkToPage userId={record.userId} />
                )}
            />
            <TextField source="title" label="Tiêu đề" />
            <FunctionField render={() => (
                <div
                    onClick={(e) => e.stopPropagation()} // chặn rowClick
                >
                    <PropertyImages />
                </div>
            )} label="Ảnh" />
            {/* <FunctionField render={() => <PropertyTypeChip />} label="Loại" /> */}
            <TextField source="propertyType" label="Loại BĐS" />
            <TextField source="categoryName" label="Thể loại" />
            <FunctionField render={() => <PriceField />} label="Giá" />
            <FunctionField render={() => <LocationField />} label="Địa chỉ" />
            <FunctionField render={() => <StatusField />} label="Trạng thái" />
            <DateField source="expireAt" label="Hết hạn" showTime />
            <FunctionField
                label="Actions"
                render={(record) => (
                    <Stack direction="row" spacing={0.1}>
                        <EditButton record={record} label="" />
                        <DeleteButton record={record} label="" />
                    </Stack>
                )}
            />
        </Datagrid>
    </List>
);

const UserIdLinkToPage: React.FC<{ userId: string }> = ({ userId }) => {
    return (
        <Link
            to={`/user-properties/${userId}`}
            onClick={(e) => e.stopPropagation()}
            style={{
                color: '#1976d2',
                textDecoration: 'underline',
                cursor: 'pointer'
            }}
        >
            {userId}
        </Link>
    );
};
