import React, { useEffect, useState } from "react";
import { authApi, endpoints } from "../services/api";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const res = await authApi().get(endpoints.chatRooms);
                setRooms(res.data);
            } catch (err) {
                console.error("Lỗi load rooms:", err);
            }
        };
        loadRooms();
    }, []);

    return (
        <div className="container py-4" style={{ marginTop: "100px" }}>
            <h4 className="mb-3">Danh sách phòng chat</h4>

            {rooms.length === 0 && (
                <div className="text-muted">Chưa có phòng chat nào</div>
            )}

            <div className="list-group shadow-sm rounded">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className="list-group-item list-group-item-action d-flex align-items-center"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/chat/${room.id}`)}
                    >
                        {/* Avatar */}
                        <img
                            src={room.partnerAvatar || "/default-avatar.png"}
                            alt="avatar"
                            className="rounded-circle me-3"
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />

                        {/* Thông tin */}
                        <div className="flex-grow-1">
                            <div className="fw-semibold">{room.partnerName}</div>
                        </div>

                        {/* Thời gian tin nhắn cuối (nếu muốn) */}
                        {room.lastMessageAt && (
                            <small className="text-muted ms-2">
                                {new Date(room.lastMessageAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </small>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatList;
