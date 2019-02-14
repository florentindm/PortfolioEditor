<?php
$tags = $data['infos']['tags'];
$menus = $data['infos']['menus'];

echo '<div id="menu">';
echo '<ul admin-insertable-name="tag" admin-insertable-path="infos.tags">';
foreach ($tags as $key => $tag) {
	$path = 'infos.tags.'.$key;
	if(isset($params['tag']) and intval($params['tag']) == $tag['id']){
		$tagvalue = 'all';
		$state = 'active';
	}else{
		$tagvalue = $tag['id'];
		$state = 'inactive';
	}
	echo '<a href="?tag='.$tagvalue.'"><li class="'.$state.'" admin-editable-path="'.$path.'.string" admin-removable-path="'.$path.'" placeholder="Tag">'.$tag['string'].'</li></a>';
}
echo '</ul>';
echo '<ul admin-insertable-name="menu" admin-insertable-path="infos.menus">';
foreach ($menus as $key => $menu) {
	$path = 'infos.menus.'.$key;
	$state = (isset($params['page']) && $params['page'] == $menu['name']) ? 'active' : 'inactive';
	echo '<a href="'.$menu['url'].'" target="_blank"><li class="'.$state.'" admin-editable-path="'.$path.'.string" admin-removable-path="'.$path.'" placeholder="Menu">'.$menu['string'].'</li></a>';
}
echo '</ul>';
echo '</div>';
?>