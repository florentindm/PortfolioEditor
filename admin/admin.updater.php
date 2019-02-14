<?php
require 'lib/store.php';

$params = parseUserVariables($_POST['data']);
$params = json_decode($params, true);
$store = new Store('../data/works.json');
switch ($params['action']) {
	case 'edit':
		$result = $store->Edit($params['path'], $params['value']);
		break;

	case 'insert':
		$result = $store->Insert($params['path'], $params['value']);
		break;

	case 'remove':
		$result = $store->Remove($params['path']);
		break;

	case 'move':
		$result = $store->Move($params['path'], $params['old_index'], $params['new_index']);
		break;
	
	default:
		# code...
		break;
}

function parseUserVariables($string){
	return preg_replace_callback(
		'/{{(.*?)}}/',
        function ($matches) {
            return getUserVariable($matches[1]);
        },
		$string);
}

function getUserVariable($content){
	switch ($content) {
		case 'rand':
			return uniqid();
			break;
		
		default:
			return $content;
			break;
	}
}

?>