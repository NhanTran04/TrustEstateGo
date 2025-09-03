// components/Reviews/ReviewShow.tsx
import React from "react";
import {
    Show,
    TabbedShowLayout,
    Tab,
    TextField,
    NumberField,
    DateField,
    ReferenceField,
    FunctionField,
    useRecordContext,
} from "react-admin";
import {
    RateReview as ReviewIcon,
    CalendarToday as DateIcon,
    Comment as CommentIcon,
    Home as PropertyIcon,
} from "@mui/icons-material";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Avatar,
    Divider,
    Rating,
} from "@mui/material";

interface Review {
    id: number;
    rating: number;
    comment: string;
    propertyId: number;
    propertyTitle: string;
    propertyImage: string;
    createdAt: string;
}

// Card hiển thị chi tiết review
const ReviewCard: React.FC = () => {
    const record = useRecordContext<Review>();
    if (!record) return null;

    return (
        <Card sx={{ maxWidth: 800, mb: 2 }}>
            <CardContent>
                <Stack spacing={3}>
                    {/* Header */}
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
                            <ReviewIcon />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Đánh giá #{record.id}
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Rating value={record.rating} readOnly size="small" />
                                <Typography variant="body2" fontWeight={500}>
                                    {record.rating}/5
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {new Date(record.createdAt).toLocaleDateString("vi-VN")}
                                </Typography>
                            </Stack>
                        </Box>
                    </Box>

                    <Divider />

                    {/* Property Info */}
                    <Box>
                        <Typography
                            variant="subtitle2"
                            gutterBottom
                            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                        >
                            <PropertyIcon fontSize="small" />
                            Bất động sản được đánh giá
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                p: 2,
                                bgcolor: "background.default",
                                borderRadius: 1,
                            }}
                        >
                            {record.propertyImage && (
                                <img
                                    src={record.propertyImage}
                                    alt={record.propertyTitle}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 8,
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                            <Box>
                                <Typography variant="body1" fontWeight={500}>
                                    {record.propertyTitle}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    ID: {record.propertyId}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Comment */}
                    {record.comment && (
                        <Box>
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                            >
                                <CommentIcon fontSize="small" />
                                Bình luận
                            </Typography>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "background.default",
                                    borderRadius: 1,
                                    borderLeft: "4px solid",
                                    borderLeftColor: "primary.main",
                                }}
                            >
                                <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
                                    {record.comment}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};

export const ReviewShow: React.FC = () => (
    <Show>
        <TabbedShowLayout>
            <Tab label="Đánh giá chi tiết" icon={<ReviewIcon />}>
                <FunctionField render={() => <ReviewCard />} label="" />
            </Tab>

            <Tab label="Thông tin hệ thống" icon={<DateIcon />}>
                <TextField source="id" label="ID đánh giá" />
                <NumberField source="rating" label="Điểm đánh giá" />
                <TextField source="comment" label="Bình luận" />
                <ReferenceField
                    source="propertyId"
                    reference="properties"
                    label="Bất động sản"
                >
                    <TextField source="title" />
                </ReferenceField>
                <TextField source="propertyTitle" label="Tiêu đề bất động sản" />
                <TextField source="propertyImage" label="Hình ảnh bất động sản" />
                <DateField source="createdAt" label="Ngày tạo" showTime />
            </Tab>
        </TabbedShowLayout>
    </Show>
);
