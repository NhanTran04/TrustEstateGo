import { Chip } from "@mui/material";

export const RatingChip = ({ rating }: { rating: number }) => {
    const getColor = () => {
        if (rating >= 4) return "success";
        if (rating >= 3) return "warning";
        return "error";
    };

    return (
        <Chip
            label={`${rating} ★`}
            color={getColor()}
            size="small"
            sx={{ fontWeight: "bold" }}
        />
    );
};
