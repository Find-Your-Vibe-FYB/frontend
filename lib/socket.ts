import { io, Socket } from "socket.io-client"

class SocketClient {
  private static instance: Socket
  
  static getInstance(): Socket {
    if (!this.instance) {
      this.instance = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:3001", {
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        autoConnect: false,
      })
    }
    return this.instance
  }
}

export const socket = SocketClient.getInstance()

export const connectSocket = () => {
  socket.connect()
  
  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error)
  })
}

export const disconnectSocket = () => {
  socket.disconnect()
}
