const { Schema, model } = require('mongoose');
//library for Date objects
const { DateTime } = require('luxon');
const dateFormat = require('../utils/dateFormat');

//Thought Schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: DateTime.now(),
        get: (createdAtVal) => dateFormat(createdAtVal)
    }
})