'use client'
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";
import Link from "next/link";

export default function Page() {
  
  const { joinChannel } = useSocket();
  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('');

  const clickFunction = () => {
    joinChannel(username, channel);
    setUsername('');
    setChannel('');
  }

  return (
    <div>
      <div>
        <input 
          onChange={(e) => setUsername(e.target.value)} 
          className={classes['chat-input']} type="text" 
          value={username} placeholder="Enter User-Name..." />
        <input 
          onChange={(e) => setChannel(e.target.value)} 
          className={classes['chat-input']} type="text" 
          value={channel} placeholder="Enter Channel-Name..." />
        <button
          onClick={e => clickFunction()} disabled={channel==='' || username===''}
          className={classes['send-button']}>
            <Link href={`/channels/${channel.toLowerCase()}`}>
              Join Channel
            </Link>
          </button>
      </div>
    </div>
  )
}