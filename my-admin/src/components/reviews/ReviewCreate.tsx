// components/Reviews/ReviewCreate.tsx
import React from "react";
import {
    Create,
    SimpleForm,
    NumberInput,
    TextInput,
    required,
    minValue,
    maxValue,
} from "react-admin";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export const ReviewCreate: React.FC = () => {
    const { sellerId } = useParams<{ sellerId: string }>();

    return (
        <Create redirect="list" resource="reviews" mutationOptions={{ meta: { sellerId } }}>
            <SimpleForm>
                <Box sx={{ maxWidth: 600 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                        Tạo đánh giá mới cho Seller #{sellerId}
                    </Typography>

                    <NumberInput
                        source="buyerId"
                        label="Id buyer"
                        validate={[required(), minValue(1), maxValue(5)]}
                        fullWidth
                    />

                    <TextInput
                        source="sellerId"
                        defaultValue={sellerId}
                        style={{ display: "none" }}
                    />

                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <NumberInput
                            source="rating"
                            label="Đánh giá (1-5 sao)"
                            validate={[required(), minValue(1), maxValue(5)]}
                            min={1}
                            max={5}
                            step={1}
                            defaultValue={5}
                            fullWidth
                        />

                        <NumberInput
                            source="propertyId"
                            label="Id bài đăng"
                            validate={[required(), minValue(1), maxValue(5)]}
                            fullWidth
                        />
                    </Stack>

                    <TextInput
                        source="comment"
                        label="Bình luận"
                        multiline
                        rows={4}
                        fullWidth
                    />

                    {/* nếu backend tự fill thì có thể bỏ mấy cái này đi */}
                </Box>
            </SimpleForm>
        </Create>
    );
};
