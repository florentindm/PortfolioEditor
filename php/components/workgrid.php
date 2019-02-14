<?php
echo '<div id="content" admin-insertable-name="works" admin-insertable-path="works">';
foreach ($data['works'] as $key => $item) {
	if($params['tag'] != 'all'){
		if(!in_array(intval($params['tag']), $item['tags'])) continue;
	}
	echo '<a href="?work='.$key.'" admin-removable-path="works.'.$key.'">
		<div class="item vignette">
			<div class="content" admin-editable-image-path="works.'.$key.'.cover" style="background-image: url(files/'.$item['cover'].')"></div>
			<h1 class="label title" admin-editable-path="works.'.$key.'.name" placeholder="Titre">'.$item['name'].'</h1>
		</div>
	</a>';
}
echo '</div>';
?>