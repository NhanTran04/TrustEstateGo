import { authApi, endpoints } from "./api";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

let stompClient = null;

export const ChatService = {
    async createRoom(sellerId) {
        const res = await authApi().post(endpoints.chatRoom(sellerId));
        return res.data;
    },

    async getMessages(roomId) {
        const res = await authApi().get(endpoints.chatMessages(roomId));
        return res.data;
    },

    connect(roomId, onMessage) {
        const socket = new SockJS(endpoints.ws);

        // Với @stomp/stompjs mới, dùng over để tạo CompatClient
        stompClient = Stomp.over(socket);

        // Nếu không muốn log lằng nhằng
        stompClient.debug = () => { };

        stompClient.connect({}, () => {
            console.log("Connected to WebSocket");

            // Subscribe vào room
            stompClient.subscribe(`/topic/room/${roomId}`, (msg) => {
                const body = JSON.parse(msg.body);
                onMessage(body);
            });
        });
    },

    sendMessage(roomId, message) {
        if (stompClient && stompClient.connected) {
            stompClient.send(
                "/app/chat.sendMessage",
                {},
                JSON.stringify({ roomId, message })
            );
        }
    },

    disconnect() {
        if (stompClient && stompClient.connected) {
            stompClient.disconnect(() => {
                console.log("Disconnected from WebSocket");
            });
        }
    },
};
