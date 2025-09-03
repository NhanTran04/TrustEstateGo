import { List, Datagrid, TextField, NumberField, FunctionField } from "react-admin";
import { Link } from "react-router-dom";
import { RatingChip } from "./RatingChip";

export const SellerList = () => (
    <List perPage={10} >
        <Datagrid rowClick={false}>
            <TextField source="sellerId" label="SellerID" />
            <TextField source="sellerName" label="Tên Seller" />
            <NumberField source="countReview" label="Số review" />
            <FunctionField
                label="Đánh giá trung bình"
                render={(record) => (
                    <RatingChip rating={record.avgRating} />
                )}
            />
            <FunctionField
                label="Xem reviews"
                render={(record: any) => (
                    <Link to={`/sellers/${record.sellerId}/reviews`}>
                        Xem review
                    </Link>
                )}
            />
        </Datagrid>
    </List>
);