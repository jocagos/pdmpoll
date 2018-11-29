CREATE TABLE users(
    userId int,
    userName varchar(50),
    PRIMARY KEY (userId)
);

CREATE TABLE answer(
    answerId int,
    answerContent varchar(100),
    PRIMARY KEY (answerId)
);

CREATE TABLE question(
    questionId int,
    questionContent varchar(100),
    PRIMARY KEY (questionId)
);

CREATE TABLE poll(
    pollId int,
    pollTitle varchar(50),
    pollDpt varchar(50),
    userId int,
    PRIMARY KEY (pollId),
    FOREIGN KEY (userId) REFERENCES users(userId)
);

CREATE TABLE vote(
    voteId int,
    pollId int,
    questionId int,
    answerId int,
    PRIMARY KEY (voteId),
    FOREIGN KEY (pollId) REFERENCES poll(pollId),
    FOREIGN KEY (questionId) REFERENCES question(questionId),
    FOREIGN KEY (answerId) REFERENCES answer(answerId)
);

ALTER TABLE users ADD email varchar(100);
ALTER TABLE users ADD pass varchar(20);
ALTER TABLE poll ADD pdesc varchar(200);
ALTER TABLE poll ADD lim date;