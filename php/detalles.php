<?php
$data = file_get_contents('php://input');
$data = json_decode($data, true);
$uid = $data['user'];
$con = new mysqli('localhost', 'root', '', 'pdmpoll');
$queryP = "SELECT * FROM poll WHERE userId = '$uid'";
$ans = $con->query($queryP);
$ansJS = array();
while($r = $ans->fetch_object()){
    array_push($ansJS, array(
        "id"=>$r->pollId,
        "title"=>$r->pollTitle,
        "dep"=>$r->pollDpt,
        "des"=>$r->pollDesc,
        "user"=>$r->userId
    ));
}
echo json_encode($ansJS);
$con->close();
?>