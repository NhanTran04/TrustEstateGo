export const formatPrice = (price) => {
    if (!price) return 'Liên hệ';
    if (price >= 1000000000) {
        return (price / 1000000000).toFixed(1) + ' tỷ';
    } else if (price >= 1000000) {
        return (price / 1000000).toFixed(0) + ' triệu';
    }
    return new Intl.NumberFormat('vi-VN').format(price);
};