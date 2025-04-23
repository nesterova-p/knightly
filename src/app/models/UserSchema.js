import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        clerkUserId: {
            type: String,
            unique: true,
            required: true,
        },
        emailAddress: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true,   // false - want it optional
            trim: true,
        },
    },
    { timestamps: true }
);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
