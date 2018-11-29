var mongoose = require('mongoose');
var express = require('express');

mongoose.connect('mongodb://jocagos:Yc8PMCDLfauSIlExUC7QRHXz5iCPSpexIfmTIZOY4ZwWBmV4PoKDE4xllsRGXHABOzkQIZqWlT37LVU9qU3UOg%3D%3D@jocagos.documents.azure.com:10255/?ssl=true');

var userSchema = new Schema({
    email: String,
    username: String,
    password: String
});

var User = mongoose.model('User', userSchema);

var answerSchema = new Schema({
    answer: String
});

var Answer = mongoose.model('Answer', answerSchema);

var questionSchema = new Schema({
    question: String
});

var Question = mongoose.model('Question', questionSchema);

var pollSchema = new Schema({
    title: String,
    dependency: String,
    desc: String,
    userSchema_id: original_id,
    limit: Date
});

var Poll = mongoose.model('Poll', pollSchema);

var voteSchema = new Schema({
    pollSchema_id: original_id,
    questionSchema_id: original_id,
    answerSchema_id: original_id
});

var Vote = mongoose.model('Vote', voteSchema);