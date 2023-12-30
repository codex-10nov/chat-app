import { Server } from "socket.io";
import RedisConnection from "./redis"; 

const pub = new RedisConnection().redis;
const sub = new RedisConnection().redis;

class SocketService {
    private _io: Server;
    constructor() {
        console.log("Socket Server initialised...");
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        });
    }

    public initListeners() {
        console.log("Socket listeners initialize...");
        const io = this.io;
        io.on('connect', (socket) => {
            console.log("New Socket connection", socket.id);

            socket.on('disconnect', async() => {
                console.log("Server disconnected ...");
            });

            socket.on('event:join', async({ username, channel }: { username: String, channel: String }) => {
                console.log(`User with username:${username} and channel:${channel}`);
                socket.join(channel.toUpperCase());
                sub.subscribe(channel.toUpperCase());
            })

            socket.on('event:message', async ({message, channel}: {message: String, channel: String}) => {
                console.log("New message received... ", message);
                await pub.publish(channel.toUpperCase(), JSON.stringify({ message }));
            });
        })

        sub.on('message', async(channel, message) => {
            if( channel ) {
                console.log(`Message received:${message} on channel:${channel}`);
                io.to(channel.toUpperCase()).emit('message', message);
            }
        })
    }

    get io() {
        return this._io;
    }
}

export default SocketService;