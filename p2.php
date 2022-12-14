<?php
include"dbconfig.php";
$con = mysqli_connect($host,$username,$password,$dbname);
?>
<!DOCTYPE html>
<html>
<head>
<title>Daniel Vera CPS4745 Presentation 2</title>
<style>
.hiddenContainer {
  display: none;
}
</style>
</head>
<body>
<h2>Daniel Vera's Presentation 2: 2D Density</h2>
<form>
    Select State:
    <select id="state_select" name="var">
        <option value="empty"></option>
        <option value="Alabama">Alabama</option>
        <option value="Alaska">Alaska</option>
        <option value="Arizona">Arizona</option>
        <option value="Arkansas">Arkansas</option>
        <option value="California">California</option>
        <option value="Colorado">Colorado</option>
        <option value="Colorado">Colorado</option>
        <option value="Delaware">Delaware</option>
        <option value="Florida">Florida</option>
        <option value="Georgia">Georgia</option>
        <option value="Hawaii">Hawaii</option>
        <option value="Idaho">Idaho</option>
        <option value="Illinois">Illinois</option>
        <option value="Indiana">Indiana</option>
        <option value="Iowa">Iowa</option>
        <option value="Kansas">Kansas</option>
        <option value="Kentucky">Kentucky</option>
        <option value="Louisiana">Louisiana</option>
        <option value="Maine">Maine</option>
        <option value="Maryland">Maryland</option>
        <option value="Massachusetts">Massachusetts</option>
        <option value="Michigan">Michigan</option>
        <option value="Minnesota">Minnesota</option>
        <option value="Mississippi">Mississippi</option>
        <option value="Missouri">Missouri</option>
        <option value="Montana">Montana</option>
        <option value="Nebraska">Nebraska</option>
        <option value="Nevada">Nevada</option>
        <option value="New Hampshire">New Hampshire</option>
        <option value="New Jersey">New Jersey</option>
        <option value="New Mexico">New Mexico</option>
        <option value="New York">New York</option>
        <option value="North Carolina">North Carolina</option>
        <option value="North Dakota">North Dakota</option>
        <option value="Ohio">Ohio</option>
        <option value="Oklahoma">Oklahoma</option>
        <option value="Oregon">Oregon</option>
        <option value="Pennsylvania">Pennsylvania</option>
        <option value="Rhode Island">Rhode Island</option>
        <option value="South Carolina">South Carolina</option>
        <option value="South Dakota">South Dakota</option>
        <option value="Tennessee">Tennessee</option>
        <option value="Texas">Texas</option>
        <option value="Utah">Utah</option>
        <option value="Vermont">Vermont</option>
        <option value="Virginia">Virginia</option>
        <option value="Washington">Washington</option>
        <option value="West Virginia">West Virginia</option>
        <option value="Wisconsin">Wisconsin</option>
        <option value="Wyoming">Wyoming</option>
    </select>
</form>
<form class="hiddenContainer" id="eduContainer" script="display:none;">
Select Education Level
    <select id="edu_select" name="var">
        <option value="empty"></option>
        <option value="education_less_highschool">education_less_highschool</option>
        <option value="education_highschool">education_highschool</option>
        <option value="education_some_college">education_some_college</option>
        <option value="education_bachelors">education_bachelors</option>
        <option value="education_graduate">education_graduate</option>
        <option value="education_college_or_above">education_college_or_above</option> 
    </select>
</form>
<div class="hiddenContainer" id="sliderContainer" script="display:block;">
  Darken <input id="slider" type="range" min="1" max="100" value="50"> Lighten
</div>
<div id="CountyCT"></div>
<div id="my_dataviz"></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://d3js.org/d3.v4.js"></script>
<script src="https://d3js.org/d3-contour.v1.min.js"></script>
<script type="text/javascript" src="main.js"></script>
</html>