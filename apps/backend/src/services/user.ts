import _ from "lodash";
import mongoose from "mongoose";
import { Users } from "../api/users";

interface UserSchema {
    name: string,
    dob?: Date,
    phoneNumber: string,
    email: string,
    username: string,
    password: string
}

class UserServices {

    private Users;

    constructor() {
        this.Users = Users;
    }

    private async createEntity(body: UserSchema): Promise<object> {
        return this.Users.create(body);
    }
    private async getUser(query: { _id?: mongoose.Types.ObjectId, phoneNumber?: string, email?: string, username?: string }): Promise<object | null> {
        return this.Users.findOne(query);
    }
    private async getUsers(query: object): Promise<object[]> {
        return this.Users.find(query);
    }

    public async create(body: UserSchema) {

        const query = body.phoneNumber? { phoneNumber: body.phoneNumber }: { email: body.email };
        const existingUser = await this.getUser(query);

        if(!_.isEmpty(existingUser)) {
            const error = new Error("User exists with same phone number or username");
            (error as any).statusCode = 409;
            throw error;
        }

        return this.createEntity(body);
    }
    public async findUserByUsername(username: string) {
        return this.getUser({ username });
    }
    public async findUserById (id: mongoose.Types.ObjectId) {
        return this.getUser({ _id: id });
    }
}

export default UserServices;