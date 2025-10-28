// import React, { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { authApi, endpoints } from "../services/api.js";
// import { Stomp } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { Button, Form, Card, Badge, Spinner, InputGroup } from "react-bootstrap";
// import { Send, Wifi, WifiOff, User, Clock, Users } from "lucide-react";

// const ChatRoom = () => {
//   const { roomId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [connected, setConnected] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [onlineUsers, setOnlineUsers] = useState(1);

//   const stompClientRef = useRef(null);
//   const messagesEndRef = useRef(null);
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Auto scroll to bottom
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Format time
//   const formatTime = (timestamp) => {
//     if (!timestamp) return "";
//     try {
//       const date = new Date(timestamp);
//       return date.toLocaleTimeString('vi-VN', {
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch {
//       return "";
//     }
//   };

//   useEffect(() => {
//     // 1. Load lịch sử tin nhắn
//     const loadMessages = async () => {
//       try {
//         setLoading(true);
//         const res = await authApi().get(endpoints.chatMessages(roomId));
//         setMessages(res.data);
//       } catch (err) {
//         console.error("Lỗi load messages:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadMessages();

//     // 2. Kết nối WebSocket
//     const socket = new SockJS(endpoints.ws);
//     const client = Stomp.over(socket);
//     client.debug = () => { };

//     client.connect(
//       {},
//       () => {
//         setConnected(true);
//         console.log("Connected to WS");

//         // subscribe vào room
//         client.subscribe(`/topic/room/${roomId}`, (msg) => {
//           const newMsg = JSON.parse(msg.body);
//           setMessages((prev) => [...prev, newMsg]);
//         });

//         // Thêm subscription cho online users (nếu backend hỗ trợ)
//         client.subscribe(`/topic/room/${roomId}/users`, (msg) => {
//           const data = JSON.parse(msg.body);
//           setOnlineUsers(data.onlineUsers || 1);
//         });
//       },
//       (err) => {
//         console.error("STOMP error:", err);
//         setConnected(false);
//       }
//     );

//     stompClientRef.current = client;

//     // cleanup khi unmount
//     return () => {
//       if (stompClientRef.current) {
//         stompClientRef.current.disconnect(() => {
//           setConnected(false);
//           console.log("Disconnected from WS");
//         });
//       }
//     };
//   }, [roomId]);

//   // 3. Gửi tin nhắn
//   const send = () => {
//     if (!connected || !input.trim()) return;
//     if (!user) {
//       console.error("User chưa đăng nhập");
//       return;
//     }

//     stompClientRef.current.send(
//       "/app/chat.sendMessage",
//       {},
//       JSON.stringify({
//         roomId: parseInt(roomId, 10),
//         message: input.trim(),
//         senderId: user.id,
//         senderName: user.username,
//         timestamp: new Date().toISOString()
//       })
//     );
//     setInput("");
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       send();
//     }
//   };

//   const isMyMessage = (message) => {
//     return message.senderId === user?.id;
//   };

//   return (
//     <div className="container py-4" style={{ marginTop: "80px", maxWidth: "800px" }}>
//       {/* Header */}
//       <Card className="shadow-sm border-0">
//         <Card.Header className="bg-primary text-white border-0">
//           <div className="d-flex justify-content-between align-items-center">
//             <div className="d-flex align-items-center">
//               <Users size={20} className="me-2" />
//               <h5 className="mb-0">Phòng Chat #{roomId}</h5>
//             </div>
//             <div className="d-flex gap-2">
//               <Badge bg="light" text="dark" className="d-flex align-items-center">
//                 <User size={12} className="me-1" />
//                 {onlineUsers}
//               </Badge>
//               <Badge bg={connected ? "success" : "danger"} className="d-flex align-items-center">
//                 {connected ? <Wifi size={12} /> : <WifiOff size={12} />}
//                 <span className="ms-1">{connected ? "Đã kết nối" : "Mất kết nối"}</span>
//               </Badge>
//             </div>
//           </div>
//         </Card.Header>

//         {/* Messages Area */}
//         <Card.Body className="p-0" style={{ height: "500px" }}>
//           <div
//             className="h-100 d-flex flex-column"
//             style={{ background: "#f8f9fa" }}
//           >
//             {/* Messages Container */}
//             <div
//               className="flex-grow-1 p-3"
//               style={{
//                 overflowY: "auto",
//                 maxHeight: "400px"
//               }}
//             >
//               {loading ? (
//                 <div className="text-center py-4">
//                   <Spinner animation="border" variant="primary" />
//                   <p className="text-muted mt-2">Đang tải tin nhắn...</p>
//                 </div>
//               ) : messages.length === 0 ? (
//                 <div className="text-center py-5">
//                   <div className="text-muted mb-2">💬</div>
//                   <p className="text-muted">Chưa có tin nhắn nào trong phòng</p>
//                   <small className="text-muted">Hãy bắt đầu cuộc trò chuyện!</small>
//                 </div>
//               ) : (
//                 messages.map((m, idx) => (
//                   <div
//                     key={idx}
//                     className={`mb-3 d-flex ${isMyMessage(m) ? "justify-content-end" : "justify-content-start"}`}
//                   >
//                     <div
//                       className={`p-3 rounded-3 position-relative ${isMyMessage(m)
//                           ? "bg-primary text-white"
//                           : "bg-white border"
//                         }`}
//                       style={{
//                         maxWidth: "70%",
//                         boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
//                       }}
//                     >
//                       {/* Message header */}
//                       <div className="d-flex justify-content-between align-items-center mb-1">
//                         <small className={`fw-bold ${isMyMessage(m) ? "text-white-50" : "text-secondary"}`}>
//                           {isMyMessage(m) ? "Bạn" : m.senderName || "User"}
//                         </small>
//                         <small className={`ms-2 ${isMyMessage(m) ? "text-white-50" : "text-muted"}`}>
//                           <Clock size={12} className="me-1" />
//                           {formatTime(m.timestamp)}
//                         </small>
//                       </div>

//                       {/* Message content */}
//                       <div className="message-content">
//                         {m.message}
//                       </div>

//                       {/* Triangle indicator */}
//                       <div
//                         className={`position-absolute top-0 ${isMyMessage(m)
//                             ? "right-0 translate-end"
//                             : "left-0 translate-start"
//                           }`}
//                         style={{
//                           width: "0",
//                           height: "0",
//                           borderLeft: "8px solid transparent",
//                           borderRight: "8px solid transparent",
//                           borderTop: `8px solid ${isMyMessage(m) ? "#0d6efd" : "#fff"}`,
//                           transform: isMyMessage(m)
//                             ? "translateX(8px) translateY(-8px) rotate(90deg)"
//                             : "translateX(-8px) translateY(-8px) rotate(-90deg)",
//                           zIndex: 1
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input Area */}
//             <div className="border-top bg-white p-3">
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder={
//                     connected ? "Nhập tin nhắn của bạn..." : "Đang kết nối..."
//                   }
//                   disabled={!connected}
//                   className="border-end-0"
//                   style={{ borderRight: "none" }}
//                 />
//                 <Button
//                   variant="primary"
//                   onClick={send}
//                   disabled={!connected || !input.trim()}
//                   className="d-flex align-items-center"
//                   style={{
//                     borderTopLeftRadius: 0,
//                     borderBottomLeftRadius: 0
//                   }}
//                 >
//                   <Send size={18} />
//                 </Button>
//               </InputGroup>
//               <div className="text-center mt-2">
//                 <small className="text-muted">
//                   Nhấn Enter để gửi tin nhắn
//                 </small>
//               </div>
//             </div>
//           </div>
//         </Card.Body>
//       </Card>

//       {/* User info */}
//       {user && (
//         <div className="text-center mt-3">
//           <small className="text-muted">
//             Đang đăng nhập với tên: <strong>{user.username}</strong>
//           </small>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatRoom;

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