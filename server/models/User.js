import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    username: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },

    tasks: {
        type: Array,
        required: false
    }
})

export default mongoose.model('Users', UserSchema);
// 'Users' -> name of collection in mongodb cluster