<?php
require 'lib/store.php';
$ds = DIRECTORY_SEPARATOR;
$storeFolder = '../files';
$store = new Store('../data/works.json');
if (!empty($_FILES)) {
	foreach ($_FILES as $key => $file) {
	    $tempFile = $file['tmp_name'];              
	    $targetPath = dirname( __FILE__ ).$ds.$storeFolder.$ds;
	    $extension = pathinfo($file['name'])['extension'];
	    $newname = uniqid().'.'.$extension;
	    $targetFile =  $targetPath.$newname;
	    if(move_uploaded_file($tempFile, $targetFile) AND isset($_POST[$key])){
	    	$params = json_decode($_POST[$key], true);
	    	$oldfile = $storeFolder.$ds.$store->Get($params['path']);
    		$store->Edit($params['path'], $newname);
	    }
	}
}

?> 