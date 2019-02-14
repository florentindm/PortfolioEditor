<?php

$params = json_decode($_POST['data'], true);
$data = file_get_contents('../data/works.json');
$data = json_decode($data, true);

include 'functions.php';

include 'components/header.php';
if(!$params){
	include 'components/welcomepage.php';
}elseif(isset($params['page']) && $params['page'] == 'contact'){
	include 'components/contact.php';
}elseif(isset($params['tag'])){
	include 'components/workgrid.php';
}elseif(is_numeric($params['work'])){
	include 'components/workpage.php';
}
?>