<?php
session_start();
$_SESSION['user'] = true;
$data = file_get_contents('data/works.json');
$data = json_decode($data, true);
$data = $data['infos'];
?>
<!DOCTYPE html>
<html>
<head>
	<title><?php echo $data['title']; ?></title>
	<meta charset="utf-8">

	<meta name="author" content="Florentin de Moffarts" />
	<meta name="description" content="Portfolio" />
	<meta name="keywords" content="design, portfolio, florentin, moffarts" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" type="text/css" href="css/reset.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/cases.css">
	<link href="https://fonts.googleapis.com/css?family=Hind:400,300,500" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="js/slick/slick.css"/>
	<link rel="stylesheet" type="text/css" href="js/slick/slick-theme.css"/>
	<?php
	if($_SESSION['user']){
		echo '<link rel="stylesheet" type="text/css" href="admin/admin.css">';
		echo '<link rel="stylesheet" href="admin/lib/codemirror/lib/codemirror.css">';
	}
	?>
</head>
<body>
	<?php
	if($_SESSION['user']){
		include 'admin/admin.html';
	}
	?>
	<div id="wrap"></div>
	<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script type="text/javascript" src="js/slick/slick.min.js"></script>
	<script type="text/javascript" src="js/bridge.js"></script>
	<script type="text/javascript" src="js/roll.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
	<?php
	if($_SESSION['user']){
		echo '<script src="admin/lib/droploaders.js"></script>';
		echo '<script src="admin/lib/sortable.min.js"></script>';
		echo '<script src="admin/lib/codemirror/lib/codemirror.js"></script>';
		echo '<script src="admin/lib/codemirror/mode/htmlmixed/htmlmixed.js"></script>';
		echo '<script src="admin/admin.js"></script>';
		echo '<script src="admin/script.js"></script>';
	}
	?>
</body>
</html>