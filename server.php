<!-- without json -->
<!-- <?php
echo var_dump($_POST);
?> -->
<!-- with json -->
<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);
?>