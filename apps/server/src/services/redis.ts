import Redis from "ioredis";

class RedisConnection {
    private _connection: Redis;
    constructor() {
        this._connection = new Redis({
            host: "redis-chat-personal-board.a.aivencloud.com",
            port: 26559,
            username: "default",
            password: "AVNS_N7FMDeU4cLcibpTsc3_",
        });
    }

    get redis() {
        return this._connection;
    }
}

export default RedisConnection; 