let state_name = "empty";   //state_name and edu_level are set to "empty" becuase the default value from the dropdown's are "empty"
let edu_level = "empty";
let dataCopy = "";
let eduMax = "";
let eduMin = "";
let hoMax = "";
let hoMin = "";
let countyCT = "";

$(document).on('change','#state_select',function(e){
    state_name = $(this).val();
    if(state_name == "empty") { //if empty state_name option is selected the the other dropdown, slider, and chart will be hidden
        edu_level = "empty"
        clearChart();
        hideForm("eduContainer");
        hideForm("sliderContainer");
    } else {
        if(edu_level != "empty"){   //checks if edu_level is not "empty" because that means the edu_level dropdown does not need to unhidden
            openForm("sliderContainer");
            $.ajax({  //gets info from the database based on the the selctions made in the dropdown menus
                type: 'POST',
                url: 'returnInfo.php',
                dataType: 'json',
                data: {state:state_name, edu:edu_level}, 
                success: function(data){    //The max and min value of edu_level and home_ownership are going to used for the max and min values of the x and y axis
                    eduMax = data.eduMax;
                    eduMin = data.eduMin;
                    hoMax = data.hoMax;
                    hoMin = data.hoMin;
                    countyCt = data.countyCt; 
                    document.getElementById("CountyCT").innerHTML = "Number of counties in "+state_name+": " + countyCt;
                },
            });
            $.ajax({  //returnJSON gets the table based on the user's input as a JSON to be used to create the chart in D3
                type: 'POST',
                url: 'returnJSON.php',
                dataType: 'json',
                data: {state:state_name, edu:edu_level},                 
                success: function(data){
                    dataCopy = data;
                    document.getElementById("slider").value = "50"; //resets the slider to default value and position
                    pointsPerPixel = .005;  //resets the point per pixel value that matches the default slider value
                    clearChart();
                    if(state_name != "empty") { 
                        document.getElementById("CountyCT").innerHTML = "Number of counties in "+state_name+": " + countyCt;
                        drawMapNew(data, eduMax, eduMin, hoMax, hoMin, pointsPerPixel);
                    }
                }
            }); 
        } else {
            openForm("eduContainer"); //if the edu_select is "empty" then the edu_select dropdown is revealed
        }
    }
});

$(document).on('change','#edu_select',function(e){
    edu_level = $(this).val();
    if(edu_level == "empty") {  //hides slider and clears chart when no edu_level is selected 
        clearChart();
        hideForm("sliderContainer");
    } else {    // when a edu_level is selected the slider is revealed
        openForm("sliderContainer");
        $.ajax({ //gets info from the database based on the the selctions made in the dropdown menus 
            type: 'POST',
            url: 'returnInfo.php',
            dataType: 'json',
            data: {state:state_name, edu:edu_level}, 
            success: function(data){    //The max and min value of edu_level and home_ownership are going to used for the max and min values of the x and y axis
                eduMax = data.eduMax;
                eduMin = data.eduMin;
                hoMax = data.hoMax;
                hoMin = data.hoMin;
                countyCt = data.countyCt; 
                document.getElementById("CountyCT").innerHTML = "Number of counties in "+state_name+": " + countyCt;
            },
        });
        $.ajax({ //returnJSON gets the table based on the user's input as a JSON to be used to create the chart in D3 
            type: 'POST',
            url: 'returnJSON.php',
            dataType: 'json',
            data: {state:state_name, edu:edu_level},                 
            success: function(data){
                dataCopy = data
                document.getElementById("slider").value = "50"; //resets the slider to default value and position
                pointsPerPixel = .005;  //resets the point per pixel value that matches the default slider value
                clearChart();
                if(state_name != "empty") { //if state_name and edu_level are both not empty then the cart id drawn
                    document.getElementById("CountyCT").innerHTML = "Number of counties in "+state_name+": " + countyCt;
                    drawMapNew(data, eduMax, eduMin, hoMax, hoMin, pointsPerPixel);
                }
            }
        }); 
    }
});

$(document).on('change','#slider',function(e){  //when the slider is adjusted then the points per pixel is changed, eother darkening or ligtening the density chart
    var sliderVal = $(this).val()*0.0001;   //the slider values is changed from a value with no decimals to the value multiplied by .0001
    $.ajax({
        success: function(){    //when the slider is asjusted the char is cleared and recreated with the updated points per pixel 
            clearChart(); 
            if(state_name != "empty") {
                document.getElementById("CountyCT").innerHTML = "Number of counties in "+state_name+": " + countyCt;
                pointsPerPixel = sliderVal; 
                drawMapNew(dataCopy, eduMax, eduMin, hoMax, hoMin, pointsPerPixel); 
                return pointsPerPixel;
            } else {
                alert('Please select a state');
                document.getElementById("slider").value = "50"; 
            }
        }
    });
});

function drawMapNew(data, xMax, xMin, yMax, yMin, pointsPerPixel) {
    xMax += 5;  //adds or subtracts 5 from the X and Y Max to give padding the density
    xMin -= 5;
    yMax += 5;
    yMin -= 5;

    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
    
    // read data
    //d3.csv("https://raw.githubusercontent.com/danvera-dev/CPS4745_presentation2/main/uscounties.csv", function(data) { 
    var x = d3.scaleLinear()
        .domain([xMin, xMax])
        .range([ margin.left, width - margin.right ]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    
    // Add Y axis
    var y = d3.scaleLinear()
        .domain([yMin, yMax])
        .range([ height - margin.bottom, margin.top ]);
    svg.append("g")
        .call(d3.axisLeft(y));
    
    // Prepare a color palette
    var color = d3.scaleLinear()
        .domain([0, pointsPerPixel]) // Points per square pixel.
        .range(["white", "green"])
    
    // compute the density data
    var densityData = d3.contourDensity()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); })
        .size([width, height])
        .bandwidth(20)
        (data)
    
    // show the shape!
    svg.insert("g", "g")
        .selectAll("path")
        .data(densityData)
        .enter().append("path")
            .attr("d", d3.geoPath())
            .attr("fill", function(d) { return color(d.value); })
    
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text(edu_level + " (Percent)");
    
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("home_ownership (Percent)");
}

function clearChart() { //clears the chart and the statement saying how many counties there are
    document.getElementById("CountyCT").innerHTML = "";
    document.getElementById("my_dataviz").innerHTML = "";
}

function openForm(form) {   
    document.getElementById(form).style.display = "block";
}

function hideForm(form) {
    document.getElementById(form).style.display = "none"; 
}