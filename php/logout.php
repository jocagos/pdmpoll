<?php
if( isset($_SESSION['open']) && $_SESSION['open']){
    $_SESSION['open'] = false;
    session_destroy();
}
?>