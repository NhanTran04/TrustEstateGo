import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { authApi, endpoints } from "../services/api.js";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Button, Form, Card, Badge, Spinner, InputGroup } from "react-bootstrap";
import { Send, Wifi, WifiOff, User, Clock, Users, MessageCircle } from "lucide-react";
import "../styles/ChatRoom.css";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(1);

  const stompClientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format time
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return "";
    }
  };

  // Format date for message groups
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return "";
    }
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach(message => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  useEffect(() => {
    // 1. Load lịch sử tin nhắn
    const loadMessages = async () => {
      try {
        setLoading(true);
        const res = await authApi().get(endpoints.chatMessages(roomId));
        setMessages(res.data);
      } catch (err) {
        console.error("Lỗi load messages:", err);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();

    // 2. Kết nối WebSocket
    const socket = new SockJS(endpoints.ws);
    const client = Stomp.over(socket);
    client.debug = () => { };

    client.connect(
      {},
      () => {
        setConnected(true);
        console.log("Connected to WS");

        // subscribe vào room
        client.subscribe(`/topic/room/${roomId}`, (msg) => {
          const newMsg = JSON.parse(msg.body);
          setMessages((prev) => [...prev, newMsg]);
        });

        // Thêm subscription cho online users (nếu backend hỗ trợ)
        client.subscribe(`/topic/room/${roomId}/users`, (msg) => {
          const data = JSON.parse(msg.body);
          setOnlineUsers(data.onlineUsers || 1);
        });
      },
      (err) => {
        console.error("STOMP error:", err);
        setConnected(false);
      }
    );

    stompClientRef.current = client;

    // cleanup khi unmount
    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect(() => {
          setConnected(false);
          console.log("Disconnected from WS");
        });
      }
    };
  }, [roomId]);

  // 3. Gửi tin nhắn
  const send = () => {
    if (!connected || !input.trim()) return;
    if (!user) {
      console.error("User chưa đăng nhập");
      return;
    }

    stompClientRef.current.send(
      "/app/chat.sendMessage",
      {},
      JSON.stringify({
        roomId: parseInt(roomId, 10),
        message: input.trim(),
        senderId: user.id,
        senderName: user.username,
        timestamp: new Date().toISOString()
      })
    );
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const isMyMessage = (message) => {
    return message.senderId === user?.id;
  };

  const messageGroups = groupMessagesByDate();

  return (
    <div className="chat-room-container">
      {/* Header */}
      <div className="chat-header">
        <Card className="chat-main-card">
          <Card.Header className="chat-header-card">
            <div className="header-content">
              <div className="header-left">
                <div className="room-info">
                  <MessageCircle size={24} className="room-icon" />
                  <div>
                    <h4>Phòng Chat #{roomId}</h4>
                    <p className="welcome-text">Xin chào, <strong>{user?.username}</strong>!</p>
                  </div>
                </div>
              </div>
              <div className="header-right">
                <div className="status-indicators">
                  <Badge bg="light" text="dark" className="status-badge">
                    <User size={14} />
                    <span>{onlineUsers} online</span>
                  </Badge>
                  <Badge bg={connected ? "success" : "danger"} className="status-badge connection-badge">
                    {connected ? <Wifi size={14} /> : <WifiOff size={14} />}
                    <span>{connected ? "Đã kết nối" : "Mất kết nối"}</span>
                  </Badge>
                </div>
              </div>
            </div>
          </Card.Header>

          {/* Messages Area */}
          <Card.Body className="chat-body">
            <div className="messages-wrapper">
              {/* Messages Container */}
              <div
                ref={messagesContainerRef}
                className="messages-container"
              >
                {loading ? (
                  <div className="loading-state">
                    <Spinner animation="border" variant="primary" />
                    <p>Đang tải tin nhắn...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">💬</div>
                    <h4>Chưa có tin nhắn nào</h4>
                    <p>Hãy là người đầu tiên bắt đầu cuộc trò chuyện!</p>
                  </div>
                ) : (
                  Object.entries(messageGroups).map(([date, dateMessages]) => (
                    <div key={date} className="date-group">
                      <div className="date-divider">
                        <span>{date}</span>
                      </div>
                      {dateMessages.map((m, idx) => (
                        <div
                          key={idx}
                          className={`message-wrapper ${isMyMessage(m) ? "my-message" : "other-message"}`}
                        >
                          <div className="message-bubble">
                            {!isMyMessage(m) && (
                              <div className="sender-name">{m.senderName || "User"}</div>
                            )}
                            <div className="message-content">
                              {m.message}
                            </div>
                            <div className="message-time">
                              <Clock size={12} />
                              {formatTime(m.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="input-section">
                <InputGroup className="message-input-group">
                  <Form.Control
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={
                      connected ? "Nhập tin nhắn của bạn..." : "Đang kết nối..."
                    }
                    disabled={!connected}
                    className="message-input"
                  />
                  <Button
                    variant="primary"
                    onClick={send}
                    disabled={!connected || !input.trim()}
                    className="send-button"
                  >
                    <Send size={20} />
                  </Button>
                </InputGroup>
                <div className="input-hint">
                  <small>Nhấn Enter để gửi tin nhắn</small>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ChatRoom;