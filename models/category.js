const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    categoryName: String,
    categoryImage: {type: String, default: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'},
    priority: Number
});

module.exports = mongoose.model('Category', categorySchema);

