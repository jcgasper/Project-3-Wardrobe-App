const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    category: {
        type: String,
        enum: ['outerwear','top','bottom','footwear','accessory'],
        required: 'please select a valid category'
    },
    description: {
        type: String
    },
    tags: [{
        type: String
    }],
    url: {
        type: String
    }
});

const Article = model('Article', articleSchema);