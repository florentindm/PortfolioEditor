<?php
function getImageOrientation($file){
	$prefix = '../';
	$path = $prefix.$file;
	$size = getimagesize($path);
	$ratio = $size[0]/$size[1];
	$result = ($ratio >= 1) ? 'landscape':'portrait';
	return $result;
}

function getItem($item, $params, $path, $legend = true){
	$html = '';
	$legend = '<h1 class="label legend" admin-editable-path="'.$path.'.legend" placeholder="Légende">'.$item['legend'].'</h1>';
	switch ($item['type']) {
		case 'html':
			$html .= '<div class="item '.$item['format'].'" admin-removable-path="'.$path.'" admin-type="html" admin-editable-html-path="'.$path.'.content" placeholder="Type some html here...">';
			$html .= $item['content'];
			$html .= '</div>';
			break;

		case 'image':
			$html .= '<div class="item '.$item['format'].'" admin-removable-path="'.$path.'" admin-type="image">';
			$html .= '<div class="content" admin-editable-image-path="'.$path.'.path" style="background-image: url(files/'.$item['path'].')"></div>';
			if($legend) $html .= $legend;
			$html .= '</div>';
			break;

		case 'roll':
			$html .= '<div class="item '.$item['format'].'" admin-removable-path="'.$path.'" admin-type="roll">';
			$html .= '<div class="content roll" admin-insertable-name="image" admin-insertable-path="'.$path.'.content">';
			foreach ($item['content'] as $key => $subitem) {
				$html .= '<img admin-editable-image-path="'.$path.'.content.'.$key.'.path" src="files/'.$subitem['path'].'"/>';
			}
			$html .= '</div>';
			if($legend) $html .= $legend;
			$html .= '</div>';
			break;
		
		default:
			# code...
			break;
	}
	return $html;
}

function is_external($url) {
  $components = parse_url($url);
  if ( empty($components['host']) ) return false;  // we will treat url like '/relative.php' as relative
  if ( strcasecmp($components['host'], 'example.com') === 0 ) return false; // url host looks exactly like the local host
  return strrpos(strtolower($components['host']), '.example.com') !== strlen($components['host']) - strlen('.example.com'); // check if the url host is a subdomain
}
?>