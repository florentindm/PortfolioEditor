<?php
echo '<div id="items" admin-insertable-name="roll,html,image" admin-insertable-path="works.'.$params['work'].'.content" class="grid four">';
foreach ($workcontent as $key => $item) {
	$path = 'works.'.$params['work'].'.content.'.$key;
	echo getItem($item, $params, $path, false);
}
echo '</div>';
?>