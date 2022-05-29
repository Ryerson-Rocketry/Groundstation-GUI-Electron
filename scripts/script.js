let pressure = [];
let altitude = [];
let temperature = [];
let velocity = [];
let acceleration = [];
let time = [0];



////    Functions to run at page load    ////

window.onload = function()
{
    renderColor();            // check css theme in use
    gotoPage('overview');     // go to overview page
}


function renderColor()
{
    var dark = window.sessionStorage.getItem("dark");

    if(dark == 'true')
    {
        document.body.classList.add("dark-mode");
    }
}


function toggleMode()
{
    var dark = window.sessionStorage.getItem("dark");

    if(dark == 'true')
    {
        document.body.classList.remove("dark-mode");
        window.sessionStorage.setItem("dark", false);
    }
    else
    {
        document.body.classList.add("dark-mode");
        window.sessionStorage.setItem("dark", true);
    }
}


////    navigation functions    ////

/**
 * Update header to new section name.
 * 
 * @param {string} name name of the new section to write
 */
function updateHeader(name)
{
    document.getElementById("section_name").innerHTML = name;
}


/**
 * Updated selected sidenav options.
 * 
 * @param {string} id the id of the sidenav option to highlight as selcted
 */
function updateSidenav(id)
{
    var elements = document.getElementById("sidenav").getElementsByClassName("selected");

    for(element of elements)
    {
        element.classList.remove("selected");
        element.classList.add("option");
    }

    document.getElementById(id).classList.remove("option");
    document.getElementById(id).classList.add("selected");
}

/**
 * Load other pages from files and insert their content in element.
 * 
 * @param {HTMLElement} element     the element which's content will be updated
 * @param {string}      filename    url to the file to be loaded
 */
function innerHTMLfromFile(element, filename)
{
    var client = new XMLHttpRequest();  // we need a GET request to load them
    client.open('GET', filename);
    client.onreadystatechange = function()
    {
        element.innerHTML = client.responseText;
    };
    client.send();
}


/**
 * Load page from file and update the GUI accordingly.
 * 
 * @param {string} name name of the new page to load
 */


function gotoPage(name)
{


    updateHeader(name);
    updateSidenav(name);

    innerHTMLfromFile(document.getElementById("main"), './pages/' + name + '.html');

    if (name == "pressure") {
        setTimeout(makePressureChart, 20);
    } else if (name == "acceleration") {
        setTimeout(makeAccelerationChart, 20);
    } else if (name == "altitude") {
        setTimeout(makeAltitudeChart, 20);
    } else if (name == "temperature") {
        setTimeout(makeTemperatureChart, 20);
    } else if (name == "velocity") {
        setTimeout(makeVelocityChart, 20);
    }

    
}




function startSockets() {
    var socket = io.connect('http://127.0.0.1:5000');


    socket.on('test', function(msg) {
        try {
            document.getElementById("test").innerHTML = `text! ${msg.data}`;
        } catch (e) {}
        socket.send("Test data recieved.")
    });
    
    socket.on('pressure', function(msg) {
        pressure[pressure.length] = msg.data;
        try {
            document.getElementById("pressure-tag").innerHTML = `pressure ${msg.data}`;
        }
        catch (e) {}
        try{
            document.getElementById("pressurepage-tag").innerHTML = `pressure: ${msg.data}`;
            updateChart(pressureChart, pressure)
        }
        catch (e) {}
        socket.send("Pressure data recieved.")
    });

    socket.on('altitude', function(msg) {
        altitude[altitude.length] = msg.data;
        try {
            document.getElementById("altitude-tag").innerHTML = `altitude: ${msg.data}`;
        } catch (e) {}
        try {
          document.getElementById("altitudepage-tag").innerHTML = `altitude: ${msg.data}`;
          updateChart(altitudeChart, altitude)
        } catch (e) {}
        socket.send("altitude data recieved.")
    });

    socket.on('acceleration', function(msg) {
        acceleration[acceleration.length] = msg.data;
        try {
            document.getElementById("acceleration-tag").innerHTML = `acceleration: ${msg.data}`;
        } catch (e) {}
        try {
          document.getElementById("accelerationpage-tag").innerHTML = `acceleration: ${msg.data}`;
          updateChart(accelerationChart, acceleration)
        } catch (e) {}
        socket.send("acceleration data recieved.")
    });

    socket.on('temperature', function(msg) {
        temperature[temperature.length] = msg.data;
        try {
            document.getElementById("temperature-tag").innerHTML = `temperature: ${msg.data}`;
        } catch (e) {}
        try {
          document.getElementById("temperaturepage-tag").innerHTML = `temperature: ${msg.data}`;
          updateChart(temperatureChart, temperature)
        } catch (e) {}
        socket.send("temperature data recieved.")
    });

    socket.on('velocity', function(msg) {
        velocity[velocity.length] = msg.data;
        try {
            document.getElementById("velocity-tag").innerHTML = `velocity: ${msg.data}`;
        } catch (e) {}
        try {
          document.getElementById("velocitypage-tag").innerHTML = `velocity: ${msg.data}`;
          updateChart(velocityChart, velocity)
        } catch (e) {}
        socket.send("velocity data recieved.")
    });

    socket.on('location', function(msg) {
        try {
            document.getElementById("location-tag").innerHTML = `location: ${msg.data}`;
        } catch (e) {}
        socket.send("location data recieved.")
    });

    // socket.on('initarrays', function (msg) {
    //     console.log("initializing values");
    //     pressure = msg.pressure;
    //     altitude = msg.altitude;
    //     time = msg.time;
    //     velocity = msg.velocity;
    //     acceleration = msg.acceleration;
    //     location = msg.location;
    // });

}



$(document).ready(function() {

    var socket = io.connect('http://127.0.0.1:5000');

    socket.on('connect', function() {
        socket.send('User has connected!');
        document.getElementById("test").innerHTML = "New text!";

        setInterval(updateTime, 1000)
        // pressure = msg.pressure;
        // altitude = msg.altitude;
        // time = msg.time;
        // velocity = msg.velocity;
        // acceleration = msg.acceleration;
        // location = msg.location;
    });

    startSockets();

    // setInterval(updateChart, 2000)

        
});

function updateTime() {
    time[time.length] = parseInt(time[time.length-1]) + 1;
    // document.getElementById("location").innerHTML = `test ${time[time.length-1]}`;
}


let pressureChart;

function makePressureChart() {

    try {
        pressureChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('pressureChartDiv').getContext('2d');

    pressureChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:time,
        datasets:[{
          label:'Pressure',
          data: pressure,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        }]
      },
      options:{
        // responsive: true,
        title:{
          display:true,
          text:'Pressure',
          fontSize:25
        },
        animation: {
            duration: 5
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });

}

let altitudeChart;

function makeAltitudeChart() {

    try {
        altitudeChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('altitudeChartDiv').getContext('2d');

    altitudeChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:time,
        datasets:[{
          label:'Altitude',
          data: altitude,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        }]
      },
      options:{
        // responsive: true,
        title:{
          display:true,
          text:'Altitude',
          fontSize:25
        },
        animation: {
            duration: 5
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });

}

let accelerationChart;

function makeAccelerationChart() {

    try {
        accelerationChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('accelerationChartDiv').getContext('2d');

    accelerationChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:time,
        datasets:[{
          label:'Acceleration',
          data: acceleration,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        }]
      },
      options:{
        responsive: true,
        title:{
          display:true,
          text:'Acceleration',
          fontSize:25
        },
        animation: {
            duration: 0
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });

}

let temperatureChart;

function makeTemperatureChart() {

    try {
        temperatureChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('temperatureChartDiv').getContext('2d');

    temperatureChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:time,
        datasets:[{
          label:'Temperature',
          data: temperature,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        }]
      },
      options:{
        responsive: true,
        title:{
          display:true,
          text:'Temperature',
          fontSize:25
        },
        animation: {
            duration: 0
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });

}

let velocityChart;

function makeVelocityChart() {

    try {
        velocityChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('velocityChartDiv').getContext('2d');

    velocityChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:time,
        datasets:[{
          label:'Velocity',
          data: velocity,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
        }]
      },
      options:{
        responsive: true,
        title:{
          display:true,
          text:'Velocity',
          fontSize:25
        },
        animation: {
            duration: 0
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });

}


function updateChart(chart, data) {
  chart.data.datasets[0].data = data;
  chart.data.labels = time;
  chart.update();
}

// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }


// function updateChart() {
//     try {
//         pressureChart.destroy();
//         setTimeout(makePressureChart, 0);
//     } catch (e) {};

// }