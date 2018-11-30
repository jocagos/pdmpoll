CREATE TABLE users(
    userId int NOT NULL AUTO_INCREMENT,
    userName varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    pass varchar(100) NOT NULL,
    PRIMARY KEY (userId)
);


CREATE TABLE poll(
    pollId int NOT NULL AUTO_INCREMENT,
    pollTitle varchar(50) NOT NULL,
    pollDpt varchar(50) NOT NULL,
    pollDesc varchar(200) NOT NULL,
    userId int NOT NULL,
    PRIMARY KEY (pollId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE question(
    questionId int NOT NULL AUTO_INCREMENT,
    questionContent varchar(100) NOT NULL,
    pollId int NOT NULL,
    PRIMARY KEY (questionId),
    FOREIGN KEY (pollId) REFERENCES poll(pollId)
);

CREATE TABLE answer(
    answerId int NOT NULL AUTO_INCREMENT,
    answerContent varchar(100) NOT NULL,
    questionId int NOT NULL,
    PRIMARY KEY (answerId),
    FOREIGN KEY (questionId) REFERENCES question(questionId)
);

CREATE TABLE vote(
    voteId int NOT NULL AUTO_INCREMENT,
    pollId int NOT NULL,
    questionId int NOT NULL,
    answerId int NOT NULL,
    PRIMARY KEY (voteId),
    FOREIGN KEY (pollId) REFERENCES poll(pollId),
    FOREIGN KEY (questionId) REFERENCES question(questionId),
    FOREIGN KEY (answerId) REFERENCES answer(answerId)
);