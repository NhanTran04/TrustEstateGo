import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authApi, endpoints } from "../services/api";
import useAuth from "../hooks/useAuth";

const Chat = () => {
    const [rooms, setRooms] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const res = await authApi().get(endpoints.chatRooms);
                setRooms(res.data);
            } catch (err) {
                console.error("Lỗi khi load rooms:", err);
            }
        };
        loadRooms();
    }, []);

    return (
        <div className="container py-4" style={{ marginTop: "100px" }}>
            <div className="card shadow-sm">
                <div className="card-header">Danh sách phòng chat</div>
                <div className="list-group list-group-flush">
                    {rooms.length === 0 && (
                        <div className="p-3 text-muted">
                            Bạn chưa có cuộc trò chuyện nào
                        </div>
                    )}

                    {rooms.map((room) => {
                        const partnerName =
                            user.id === room.buyerId ? room.sellerName : room.buyerName;
                        return (
                            <Link
                                key={room.id}
                                to={`/chat/${room.id}`}
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                            >
                                <div>
                                    <b>Phòng #{room.id}</b> <br />
                                    <small>Người kia: {partnerName}</small>
                                </div>
                                {room.unreadCount > 0 && (
                                    <span className="badge bg-primary rounded-pill">
                                        {room.unreadCount}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Chat;
