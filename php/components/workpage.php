<?php
$headersmall = $data['infos'];
$workinfo = $data['works'][$params['work']];
$workcontent = $data['works'][$params['work']]['content'];

echo '<div id="content">';
include 'components/workcontent.php';
include 'components/workinfo.php';
echo '</div>';
?>