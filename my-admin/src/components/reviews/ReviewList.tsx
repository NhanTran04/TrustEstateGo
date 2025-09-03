import { List, Datagrid, TextField, DateField, FunctionField, CreateButton, TopToolbar } from "react-admin";
import { useParams } from "react-router-dom";
import { RatingChip } from "./RatingChip";
import { ReviewCreate } from "./ReviewCreate";

export const ReviewList = () => {
    const { sellerId } = useParams<{ sellerId: string }>();

    return (
        <List
            resource={`reviews`} // gọi đúng API GET /api/reviews/{sellerId}/reviews
            perPage={10}
            filter={{}} // tránh bị đính filter mặc định
            queryOptions={{ meta: { sellerId } }}
            actions={<TopToolbar>
                <CreateButton to={`/sellers/${sellerId}/reviews/create`} />
            </TopToolbar>}

        >
            <Datagrid rowClick="show">
                <TextField source="id" label="Review ID" />
                <FunctionField
                    label="Đánh giá"
                    render={(record) => <RatingChip rating={record.rating} />}
                />
                <TextField source="comment" label="Nội dung" />
                <TextField source="buyerName" label="Người mua" />
                <TextField source="propertyTitle" label="Bất động sản" />
                <DateField source="createdAt" label="Ngày tạo" showTime />
            </Datagrid>
        </List>
    );
};