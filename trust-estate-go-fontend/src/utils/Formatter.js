export const formatPrice = (price) => {
    if (!price || price === 0) return 'Liên hệ';
    if (price >= 1000000000) {
        return (price / 1000000000).toFixed(1) + ' tỷ';
    } else if (price >= 1000000) {
        return (price / 1000000).toFixed(0) + ' triệu';
    }
    return new Intl.NumberFormat('vi-VN').format(price) + ' đồng';
};

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('vi-VN');
};

export const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
};

export const formatArea = (area) => {
    if (!area) return 'N/A';
    return new Intl.NumberFormat('vi-VN').format(area) + ' m²';
};

export const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export const getPropertyTypeLabel = (type) => {
    const types = {
        'APARTMENT': 'Chung cư',
        'TOWNHOUSE': 'Nhà phố',
        'RENTAL_ROOM': 'Phòng trọ',
        'VILLA': 'Biệt thự',
    };
    return types[type] || type;
};