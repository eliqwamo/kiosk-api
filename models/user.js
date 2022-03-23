const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    createdAt: {type: Date, default: Date.now},
    password: String,
    mobile: String,
    dob: Date,
    avatar: {type: String, default: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'},
    firstName: String,
    lastName: String,
    passcode: Number,
    subs: [
        {
            storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
        }
    ],
    level: {type: String, default: 'Newbie'},
    points: {type: Number, default: 0},
    isBusiness: {type: Boolean, default: false},
    isApproved: {type: Boolean, default: false},
    isLocked: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);

