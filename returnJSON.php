<?php
include"dbconfig.php";
$con = mysqli_connect($host,$username,$password,$dbname);

$state = $_POST['state'];
$edu = $_POST['edu'];
$sql = "SELECT county, $edu, home_ownership 
    FROM simplemaps.uscounties where state_name = '$state'";
$result = mysqli_query($con, $sql); 
$emparray = array();
while($row =mysqli_fetch_assoc($result)){
    array_push($emparray, array ('county' => $row['county'], 
        'x' => floatval($row[$edu]), 
        'y' => floatval($row['home_ownership'])));
}
echo json_encode($emparray);
?>