const Joi = require('joi');
const mongoose = require('mongoose');

const userIssueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'issue',
        required: true
    },
    timeline: [{
        status: { type: String, enum: ['created', 'reviewed', 'resolved', 'closed'], default: 'created' },
        date: Date
    }],
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

const UserIssue = mongoose.model('userIssue', userIssueSchema);

function validateUserIssue(issue) {
    const schema = {
        user: Joi.string().required(),
        issue: Joi.string().required(),
        status: Joi.string().min(5).max(10).optional()
    };

    return Joi.validate(issue, schema);
}

module.exports.userIssueSchema = userIssueSchema;
module.exports.UserIssue = UserIssue;
module.exports.validateUserIssue = validateUserIssue;

