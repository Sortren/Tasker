import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: false
    },

    tasks: {
        type: Array,
        required: false
    }
})

export default mongoose.model('Users', UserSchema);
// 'Users' -> name of collection in mongodb cluster