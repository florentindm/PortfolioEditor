<div class="infos">
	<?php
	echo '<span class="date" admin-editable-path="works.'.$params['work'].'.date" placeholder="00.2000">'.$workinfo['date'].'</span>';
	echo '<h1 class="name" admin-editable-path="works.'.$params['work'].'.name" placeholder="Title">'.$workinfo['name'].'</h1>';
	echo '<p class="description plaintext" admin-editable-path="works.'.$params['work'].'.description" placeholder="Description">'.$workinfo['description'].'</p>';
	echo '<ul class="tags" admin-insertable-name="worktag" admin-insertable-path="works.'.$params['work'].'.tags">';
	foreach ($data['works'][$params['work']]['tags'] as $key => $tag) {
		echo '<li admin-editable-path="works.'.$params['work'].'.tags.'.$key.'" admin-removable-path="works.'.$params['work'].'.tags.'.$key.'">'.$tag.'</li>';
	}
	echo '</ul>';
	?>
</div>