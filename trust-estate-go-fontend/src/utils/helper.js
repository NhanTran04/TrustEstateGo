export const toSlug = (text) => {
    return text
        .toLowerCase() // chữ thường hết
        .normalize("NFD") // chuẩn Unicode
        .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
        .replace(/\s+/g, "-") // thay khoảng trắng bằng -
        .replace(/[^\w-]/g, ""); // bỏ ký tự đặc biệt
};
