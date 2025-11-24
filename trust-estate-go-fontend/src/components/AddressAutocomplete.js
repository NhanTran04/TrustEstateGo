import React, { useState, useEffect, useRef } from "react";

const AddressAutocomplete = ({ value, onChange }) => {
    const [suggestions, setSuggestions] = useState([]);
    const typingTimeout = useRef(null);

    const handleInput = (e) => {
        const text = e.target.value;
        onChange(text);

        // Xóa timeout trước đó
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current);
        }

        // Chỉ gọi API sau khi user ngừng gõ 400ms
        typingTimeout.current = setTimeout(() => {
            fetchSuggestions(text);
        }, 400);
    };

    const fetchSuggestions = async (text) => {
        if (text.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json` +
                `&q=${encodeURIComponent(text)}` +
                `&addressdetails=1&limit=5&countrycodes=vn`, // Ưu tiên Việt Nam
                {
                    headers: {
                        "User-Agent": "TrustEstateGo/1.0",
                        "Accept-Language": "vi",
                    },
                }
            );

            const data = await res.json();
            setSuggestions(data);
        } catch (err) {
            console.error("OSM Suggestion Error:", err);
        }
    };

    const handleSelect = (item) => {
        onChange(item.display_name);
        setSuggestions([]);
    };

    return (
        <div className="position-relative">
            <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Nhập địa chỉ..."
                value={value}
                onChange={handleInput}
            />

            {suggestions.length > 0 && (
                <ul
                    className="list-group position-absolute w-100 mt-1 shadow-sm"
                    style={{ zIndex: 1000 }}
                >
                    {suggestions.map((item) => (
                        <li
                            key={item.place_id}
                            className="list-group-item list-group-item-action"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSelect(item)}
                        >
                            {item.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
