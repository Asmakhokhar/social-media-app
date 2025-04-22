import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    participant: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    message: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})
export default Conversation = mongoose.model('Conversation', conversationSchema);