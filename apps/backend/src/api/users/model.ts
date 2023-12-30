import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface User extends Document {
    name: string,
    dob?: Date,
    phoneNumber: string,
    email: string,
    username: string,
    password: string
}

const UserSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String
    }
}, {
    timestamps: true
})

UserSchema.pre<User>('save', async function (next) {
    if ( this.isModified('password') || this.isNew ) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
    next();
});

UserSchema.methods.comparePassword = async function (password: string) {
    if(password) {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } return false;
}

const userModel = mongoose.model<User>('users', UserSchema);
export default userModel;