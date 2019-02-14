<div id="content" class="grid two">
	<div id="picture" class="item">
		<?php
		echo '<img src="files/'.$data['infos']['picture'].'"/>';
		?>
	</div>
	<div id="text" class="item">
		<?php
		echo '<p class="plaintext" admin-editable-path="infos.bio">'.$data['infos']['bio'].'</p>';
		?>
	</div>
	<ul id="infos" class="item">
		<?php
		echo '<a href="'.$data['infos']['mail'].'"><li>'.$data['infos']['mail'].'</li></a>';
		echo '<a href="'.$data['infos']['facebook'].'"><li>Facebook</li></a>';
		?>
	</ul>
</div>