import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { authApi, endpoints } from "../services/api.js";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Button, Form } from "react-bootstrap";

const ChatRoom = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [connected, setConnected] = useState(false);

  const stompClientRef = useRef(null);

  useEffect(() => {
    // 1. Load lịch sử tin nhắn (cần login mới gọi được)
    const loadMessages = async () => {
      try {
        const res = await authApi().get(endpoints.chatMessages(roomId));
        setMessages(res.data);
      } catch (err) {
        console.error("Lỗi load messages:", err);
      }
    };
    loadMessages();

    // 2. Kết nối WebSocket (không cần token)
    const socket = new SockJS(endpoints.ws);
    const client = Stomp.over(socket);
    client.debug = () => { }; // tắt log spam

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
    const user = JSON.parse(localStorage.getItem("user"));
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
        senderId: user.id
      })
    );
    setInput("");
  };

  return (
    <div className="container py-4" style={{ marginTop: "100px" }}>
      <h4>Phòng chat #{roomId}</h4>
      <div
        className="border p-3 mb-3"
        style={{ height: "400px", overflowY: "auto" }}
      >
        {messages.length === 0 && (
          <div className="text-muted">Chưa có tin nhắn nào</div>
        )}
        {messages.map((m, idx) => (
          <div key={idx} className="mb-2">
            <strong>{m.senderName || "User"}:</strong> {m.message}
          </div>
        ))}
      </div>

      <Form
        className="d-flex"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <Form.Control
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            connected ? "Nhập tin nhắn..." : "Đang kết nối WebSocket..."
          }
          disabled={!connected}
        />
        <Button
          type="submit"
          variant="primary"
          className="ms-2"
          disabled={!connected}
        >
          Gửi
        </Button>
      </Form>
    </div>
  );
};

export default ChatRoom;
