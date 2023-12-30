'use client'
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useSocket } from "../../../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  
    // const router = useRouter();
    const pathname = usePathname();
    const { sendMessage, messages } = useSocket();
    const [message, setMessage] = useState('');
    const [channel, setChannel] = useState('');

    useEffect(() => {
        const pathArray = pathname.split('/');
        const channelId = pathArray[pathArray.length -1];
        setChannel(channelId as string);
    }, [])

    // function to check if the user already exists or not
    useEffect(() => {
        console.log("check this route...");
    }, [])

    const clickFunction = (channel: string) => {
        sendMessage(message, channel);
        setMessage('');
    }

    return (
        <div>
        <div>
            <input 
            onChange={(e) => setMessage(e.target.value)} 
            className={classes['chat-input']} type="text" 
            value={message} placeholder="Messages" />
            <button
            onClick={e => clickFunction(channel)} disabled={message===''}
            className={classes['send-button']}>
                Send
            </button>
        </div>
        <div>
            { messages.map((e, index) => (
            <li key={index}>{e}</li>
            )) }
        </div>
        </div>
    )
}