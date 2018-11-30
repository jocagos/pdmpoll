<?php
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$title = $data['title'];
$dep = $data['dep'];
$user = $data['user'];
$des = $data['des'];
$con = new mysqli( 'localhost', 'root', '', 'pdmpoll');
$queryP = "INSERT INTO poll (pollTitle, pollDpt, pollDesc, userId) VALUES ('$title', '$dep', '$des', '$user')";

$con->query($queryP);
$pollId = $con->insert_id;
foreach( $data as $key => $val){
    if($key != 'title' && $key != 'dep' && $key != 'des' && $key != 'user'){
        $queryQ = "INSERT INTO question (questionContent, pollId) VALUES ('$key', '$pollId')";
        $con->query($queryQ);
        $qid = $con->insert_id;
        foreach( $val as $ans ){
            $queryA = "INSERT INTO answer (answerContent, questionId) VALUES ('$ans', '$qid')";
            $con->query($queryA);
        }
    }
}
$con->close();
?>