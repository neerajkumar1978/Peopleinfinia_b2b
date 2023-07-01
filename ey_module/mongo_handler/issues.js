const Joi = require('joi');
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Issue = mongoose.model('issue', issueSchema);

function validateIssue(issue) {
    const schema = {
        question: Joi.string().min(5).max(50).required(),
        status: Joi.string().min(5).max(8).optional()
    };

    return Joi.validate(issue, schema);
}

module.exports.issueSchema = issueSchema;
module.exports.Issue = Issue;
module.exports.validateIssue = validateIssue;
