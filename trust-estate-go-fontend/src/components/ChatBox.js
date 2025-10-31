import React, { useState, useRef, useEffect } from "react";
import { authApi, endpoints } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBox() {
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Xin chào! Tôi là AI Assistant. Tôi có thể giúp gì cho bạn?", timestamp: new Date() }
    ]);
    const [input, setInput] = useState("");
    const [isMinimized, setIsMinimized] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const send = async () => {
        if (!input.trim()) return;

        const userMessage = {
            sender: "you",
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput("");

        setIsTyping(true);
        try {
            const res = await authApi().post(endpoints.chatBox, { message: currentInput });

            const botMessage = {
                sender: "bot",
                text: res.data.reply,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            const errorMessage = {
                sender: "bot",
                text: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
            console.error(err);
        } finally {
            setIsTyping(false);
        }
    };


    const formatTime = (date) => {
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const clearChat = () => {
        setMessages([
            { sender: "bot", text: "Cuộc trò chuyện đã được xóa. Chúng ta có thể bắt đầu lại!", timestamp: new Date() }
        ]);
    };

    <AnimatePresence mode="wait">
        {isMinimized ? (
            // Nút chat nhỏ
            <motion.div
                key="chat-button"
                className="position-fixed bottom-0 end-0 m-3"
                style={{ zIndex: 1050 }}
                initial={{ opacity: 0, scale: 0.6, y: 80 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: 80 }}
                transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 120,
                    damping: 10
                }}
            >
                <button
                    className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
                    style={{
                        width: '70px',
                        height: '70px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    }}
                    onClick={() => setIsMinimized(false)}
                >
                    <i className="bi bi-robot text-white" style={{ fontSize: '28px' }}></i>
                </button>
            </motion.div>
        ) : (
            // Chatbox lớn (thêm motion.div để có hiệu ứng phóng to)
            <motion.div
                key="chat-window"
                className="position-fixed bottom-0 end-0 m-3 shadow-lg"
                style={{
                    width: '400px',
                    maxWidth: '90vw',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: 'white',
                    border: '1px solid #e9ecef',
                    zIndex: 1050
                }}
                initial={{ opacity: 0, scale: 0.6, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: 100 }}
                transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 150,
                    damping: 12
                }}
            >
                {/* Toàn bộ nội dung chatbox của bạn ở đây */}
                {/* Header, Messages, Input... */}
            </motion.div>
        )}
    </AnimatePresence>


    if (isMinimized) {
        return (
            <AnimatePresence>
                {isMinimized && (
                    <motion.div
                        className="position-fixed bottom-0 end-0 m-3"
                        style={{ zIndex: 1050 }}
                        initial={{ opacity: 0, scale: 0.6, y: 80 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, y: 80 }}
                        transition={{
                            duration: 0.6,
                            ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing (mềm)
                            type: "spring",
                            stiffness: 120,
                            damping: 12
                        }}
                    >
                        <button
                            className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
                            style={{
                                width: '70px',
                                height: '70px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                transition: 'transform 0.5s ease'
                            }}
                            onClick={() => setIsMinimized(false)}
                        >
                            <i className="bi bi-robot text-white" style={{ fontSize: '28px' }}></i>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }


    return (
        <div
            className="position-fixed bottom-0 end-0 m-3 shadow-lg"
            style={{
                width: '400px',
                maxWidth: '90vw',
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'white',
                border: '1px solid #e9ecef',
                zIndex: 1050
            }}
        >
            {/* Header */}
            <div
                className="d-flex align-items-center justify-content-between p-3 text-white"
                style={{
                    background: 'linear-gradient(45deg, #1259e8ff, #8899ebff)',
                    borderRadius: '20px 20px 0 0'
                }}
            >
                <div className="d-flex align-items-center">
                    <div
                        className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <i className="fas fa-robot"></i>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold">AI Assistant</h6>
                        <small style={{ opacity: 0.9 }}>
                            {isTyping ? (
                                <>
                                    <i className="fas fa-circle text-success me-1" style={{ fontSize: '8px' }}></i>
                                    Đang nhập...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-circle text-success me-1" style={{ fontSize: '8px' }}></i>
                                    Trực tuyến
                                </>
                            )}
                        </small>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-link text-white p-1 me-2"
                        onClick={clearChat}
                        title="Xóa cuộc trò chuyện"
                        style={{ textDecoration: 'none' }}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                        className="btn btn-link text-white p-1"
                        onClick={() => setIsMinimized(true)}
                        title="Thu nhỏ"
                        style={{ textDecoration: 'none' }}
                    >
                        <i className="fas fa-minus"></i>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                className="p-3"
                style={{
                    height: '400px',
                    overflowY: 'auto',
                    background: '#f8f9fa'
                }}
            >
                {messages.map((m, i) => (
                    <div key={i} className={`mb-3 d-flex ${m.sender === "you" ? "justify-content-end" : "justify-content-start"}`}>
                        <div className={`${m.sender === "you" ? "order-2" : "order-1"}`}>
                            <div
                                className={`px-3 py-2 rounded-3 shadow-sm position-relative`}
                                style={{
                                    maxWidth: '280px',
                                    background: m.sender === "you"
                                        ? 'linear-gradient(45deg, #1259e8ff, #8899ebff)'
                                        : 'white',
                                    color: m.sender === "you" ? 'white' : '#333',
                                    border: m.sender === "bot" ? '1px solid #e9ecef' : 'none',
                                    borderRadius: m.sender === "you" ? '20px 20px 5px 20px' : '20px 20px 20px 5px'
                                }}
                            >
                                <div className="fw-medium mb-1" style={{ fontSize: '14px' }}>
                                    {m.text}
                                </div>
                                <div
                                    className="text-end"
                                    style={{
                                        fontSize: '11px',
                                        opacity: 0.7,
                                        color: m.sender === "you" ? 'rgba(255,255,255,0.8)' : '#666'
                                    }}
                                >
                                    {formatTime(m.timestamp)}
                                </div>
                            </div>
                        </div>
                        {m.sender === "bot" && (
                            <div className="order-0 me-2 align-self-end">
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        background: 'linear-gradient(45deg, #1259e8ff, #8899ebff)',
                                        color: 'white'
                                    }}
                                >
                                    <i className="fas fa-robot" style={{ fontSize: '12px' }}></i>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isTyping && (
                    <div className="mb-3 d-flex justify-content-start">
                        <div className="me-2 align-self-end">
                            <div
                                className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'linear-gradient(45deg, #1259e8ff, #8899ebff)',
                                    color: 'white'
                                }}
                            >
                                <i className="fas fa-robot" style={{ fontSize: '12px' }}></i>
                            </div>
                        </div>
                        <div
                            className="px-3 py-2 rounded-3 shadow-sm bg-white"
                            style={{
                                border: '1px solid #e9ecef',
                                borderRadius: '20px 20px 20px 5px'
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <div
                                    className="spinner-grow spinner-grow-sm text-primary me-1"
                                    style={{ width: '8px', height: '8px' }}
                                ></div>
                                <div
                                    className="spinner-grow spinner-grow-sm text-primary me-1"
                                    style={{ width: '8px', height: '8px', animationDelay: '0.1s' }}
                                ></div>
                                <div
                                    className="spinner-grow spinner-grow-sm text-primary"
                                    style={{ width: '8px', height: '8px', animationDelay: '0.2s' }}
                                ></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-top">
                <div className="d-flex align-items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        className="form-control border-0 shadow-none"
                        placeholder="Nhập tin nhắn..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                send();
                            }
                        }}
                        style={{
                            background: '#f8f9fa',
                            borderRadius: '25px',
                            padding: '12px 20px',
                            fontSize: '14px'
                        }}
                        disabled={isTyping}
                    />
                    <button
                        className="btn btn-link text-decoration-none ms-2 p-0"
                        onClick={send}
                        disabled={!input.trim() || isTyping}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: input.trim() ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#e9ecef',
                            border: 'none',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            {/* Add FontAwesome CSS */}
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
            />
        </div>
    );
}