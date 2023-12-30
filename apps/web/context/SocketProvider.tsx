'use client'
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    sendMessage: (msg: string, channel: string) => any;
    messages: string[];
    users: string[];
    joinChannel: (username: string, channel: string) => any;
    channel: string;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if(!state) throw new Error("State is not defined.");
    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {

    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [channel, setChannel] = useState<string>('');

    const sendMessage: ISocketContext['sendMessage'] = useCallback((message: string, channel: string) => {
        console.log("Message in send message function ===> ", message);
        console.log("Channel in send message function ===> ", channel);
        if(socket) {
            socket.emit('event:message', { message, channel });
        } 
    }, [socket]);

    const joinChannel: ISocketContext['joinChannel'] = useCallback((username: string, channel: string) => {
        console.log("Username ====> "+username+" channel ====> "+channel);
        if(socket) {
            socket.emit('event:join', {username, channel});
        }
    }, [socket]);

    const onMessageRec = useCallback((msg: string) => {
        console.log("Message from server: ", msg);
        const { message } = JSON.parse(msg) as { message: string };
        setMessages((prev) => [...prev, message]);
    }, [])

    useEffect(() => {
        console.log("Connecting with server ...");
        const _socket = io("http://localhost:8080");
        _socket.on('message', onMessageRec);
        setSocket(_socket);
        return () => {
            console.log("Disconnecting server ...")
            _socket.disconnect();
            _socket.off('message', onMessageRec);
            setSocket(undefined);
        };
    }, []);

    return (
        <SocketContext.Provider value={{ sendMessage, messages, users, joinChannel, channel }}>
            {children}
        </SocketContext.Provider>
    )
}