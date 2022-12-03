<?php
include"dbconfig.php";
$con = mysqli_connect($host,$username,$password,$dbname);

$state = $_POST['state'];
$edu = $_POST['edu'];
$sql = "SELECT round(max($edu), 2)eduMax, round(min($edu), 2)eduMin, 
    round(max(home_ownership), 2)hoMax, round(min(home_ownership), 2)hoMin, 
    count(county_fips)countyCt 
    FROM simplemaps.uscounties WHERE state_name = '$state'";
$result = mysqli_query($con, $sql); 
while($row = mysqli_fetch_assoc($result)){
    $eduMax = $row['eduMax'];
    $eduMin = $row['eduMin'];
    $hoMax = $row['hoMax'];
    $hoMin = $row['hoMin'];
    $countyCt = $row['countyCt'];
}
$infoArr = array(
    "eduMax" => floatval($eduMax), 
    "eduMin" => floatval($eduMin), 
    "hoMax" => floatval($hoMax), 
    "hoMin" => floatval($hoMin), 
    "countyCt" => $countyCt
);
echo json_encode($infoArr);
?>



