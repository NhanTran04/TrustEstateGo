import React from "react";
import {
    CreateButton,
    Datagrid,
    DateField,
    DeleteButton,
    EditButton,
    ExportButton,
    FilterButton,
    FunctionField,
    List,
    TextField,
    TopToolbar,
    Title
} from "react-admin";
import PriceField from "../packages/PackagePrice";
import { LocationField } from "./fields/Location";
import StatusField from "./fields/Status";
import { Stack, Typography } from "@mui/material";
import PropertyImages from "./fields/Images";
import propertyFilters from "./PropertyFilter";
import { Link, useParams } from "react-router";

// Component để hiển thị properties của một user cụ thể
export const UserPropertiesList: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    return (
        <>
            <Title title={`Bài đăng của User ${userId}`} />
            <List
                filters={propertyFilters}
                resource="properties"
                filter={{ userId }} // Filter theo userId từ URL params
                actions={
                    <TopToolbar>
                        <FilterButton />
                        <CreateButton />
                        <ExportButton />
                    </TopToolbar>
                }
                perPage={10}
                sort={{ field: 'createdAt', order: 'DESC' }}
            >
                <Typography variant="h6" sx={{ my: '20px', color: 'primary.main', textAlign: 'center', fontSize: '26px' }}>
                    Danh sách bài đăng của User: {userId}
                </Typography>

                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <TextField source="id" label="ID" />
                    <TextField source="title" label="Tiêu đề" />
                    <FunctionField render={() => (
                        <div onClick={(e) => e.stopPropagation()}>
                            <PropertyImages />
                        </div>
                    )} label="Ảnh" />
                    <TextField source="propertyType" label="Loại BĐS" />
                    <TextField source="categoryName" label="Thể loại" />
                    <FunctionField render={() => <PriceField />} label="Giá" />
                    <FunctionField render={() => <LocationField />} label="Địa chỉ" />
                    <FunctionField render={() => <StatusField />} label="Trạng thái" />
                    <DateField source="expireAt" label="Hết hạn" showTime />
                    <DateField source="createdAt" label="Ngày đăng" showTime />
                    <FunctionField
                        label="Actions"
                        render={(record) => (
                            <Stack direction="row" spacing={0.1}>
                                {/* <EditButton record={record} label="" /> */}
                                <DeleteButton record={record} label="" />
                            </Stack>
                        )}
                    />
                </Datagrid>
            </List>
        </>
    );
};
