<?php
$data = file_get_contents('php://input');
$data = json_decode($data, true);

$user = $data['user'];
$pollTitle = $data['title'];

$queryP = "DELETE FROM poll WHERE pollTitle = '$pollTitle' AND userId = '$user'";
$con = new mysqli( 'localhost', 'root', '', 'pdmpoll');
$ans = $con->query($queryP);
if( $ans == TRUE ){
    return 'true';
}
else return $ans;
$con->close();
?>