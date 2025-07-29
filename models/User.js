const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    account: String,
    password: String,
    phone: String,
    gender: String,
    age: Number,
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    },
    toObject: {
        transform(doc, ret) {
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
