import React, { useEffect, useState } from "react";
import { authApi, endpoints } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Spinner, Container, InputGroup, Form } from "react-bootstrap";
import { Search, MessageCircle, Users, Clock, ArrowRight } from "lucide-react";
import "../styles/ChatList.css";

const ChatList = () => {
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadRooms = async () => {
            try {
                setLoading(true);
                const res = await authApi().get(endpoints.chatRooms);
                setRooms(res.data);
                setFilteredRooms(res.data);
            } catch (err) {
                console.error("Lỗi load rooms:", err);
            } finally {
                setLoading(false);
            }
        };
        loadRooms();
    }, []);

    useEffect(() => {
        const filtered = rooms.filter(room =>
            room.partnerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.lastMessage?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRooms(filtered);
    }, [searchTerm, rooms]);

    const formatTime = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } else if (diffInHours < 48) {
            return 'Hôm qua';
        } else {
            return date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit'
            });
        }
    };

    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'U';
    };

    const getRandomColor = (str) => {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        ];
        const index = str?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return colors[index];
    };

    if (loading) {
        return (
            <div className="chat-list-loading">
                <div className="loading-content">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Đang tải danh sách phòng chat...</p>
                </div>
            </div>
        );
    }

    return (
        <Container className="chat-list-container">
            {/* Header */}
            <div className="chat-list-header">
                <div className="header-content">

                    <div>
                        <h1 className="page-title">Tin nhắn</h1>
                        <p className="page-subtitle">
                            {rooms.length} phòng chat
                        </p>
                    </div>
                    <div className="header-icon">
                        <MessageCircle size={32} />
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <Card className="search-card">
                <Card.Body>
                    <InputGroup className="search-input-group">
                        <InputGroup.Text className="search-icon">
                            <Search size={20} />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm theo tên hoặc tin nhắn..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-field"
                        />
                    </InputGroup>
                </Card.Body>
            </Card>

            {/* Rooms List */}
            <Card className="rooms-card">
                <Card.Header className="rooms-header">
                    <div className="d-flex align-items-center">
                        <Users size={20} className="me-2" />
                        <h5 className="mb-0">Danh sách phòng chat</h5>
                    </div>
                    <Badge bg="primary" className="rooms-count">
                        {filteredRooms.length} phòng
                    </Badge>
                </Card.Header>
                <Card.Body className="p-0">
                    {filteredRooms.length === 0 ? (
                        <div className="empty-state">
                            {searchTerm ? (
                                <>
                                    <div className="empty-icon">🔍</div>
                                    <h4>Không tìm thấy kết quả</h4>
                                    <p>Không có phòng chat nào phù hợp với từ khóa "{searchTerm}"</p>
                                </>
                            ) : (
                                <>
                                    <div className="empty-icon">💬</div>
                                    <h4>Chưa có phòng chat nào</h4>
                                    <p>Bắt đầu trò chuyện để tạo phòng chat mới</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="rooms-list">
                            {filteredRooms.map((room) => (
                                <div
                                    key={room.id}
                                    className="room-item"
                                    onClick={() => navigate(`/chat/${room.id}`)}
                                >
                                    <div className="room-avatar">
                                        {room.partnerAvatar ? (
                                            <img
                                                src={room.partnerAvatar}
                                                alt={room.partnerName}
                                                className="avatar-image"
                                            />
                                        ) : (
                                            <div
                                                className="avatar-placeholder"
                                                style={{ background: getRandomColor(room.partnerName) }}
                                            >
                                                {getInitials(room.partnerName)}
                                            </div>
                                        )}
                                        {room.unreadCount > 0 && (
                                            <Badge bg="danger" className="unread-badge">
                                                {room.unreadCount}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="room-content">
                                        <div className="room-header">
                                            <div className="room-info">
                                                <h6 className="partner-name">
                                                    {room.partnerName || "Người dùng"}
                                                </h6>
                                                {room.lastMessageAt && (
                                                    <div className="last-time">
                                                        <Clock size={12} />
                                                        {formatTime(room.lastMessageAt)}
                                                    </div>
                                                )}
                                            </div>
                                            <ArrowRight size={16} className="arrow-icon" />
                                        </div>

                                        <div className="room-preview">
                                            <p className="last-message">
                                                {room.lastMessage || "Chưa có tin nhắn nào"}
                                            </p>
                                            {room.isOnline && (
                                                <Badge bg="success" className="online-badge">
                                                    Online
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ChatList;