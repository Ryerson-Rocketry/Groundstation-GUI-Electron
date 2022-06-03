//lists for data
let pressure = [];
let altitude = [];
let temperature = [];
let velocity = [];
let acceleration = [];

//list for timestamps
let pressuretime = [];
let altitudetime = [];
let temperaturetime = [];
let velocitytime = [];
let accelerationtime = [];



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

    // loads the appropriate chart, uses a timeout to wait for DOM to load
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

    // tests that socket is running
    // socket.on('test', function(msg) {
    //     try {
    //         document.getElementById("test").innerHTML = `text! ${msg.data}`;
    //     } catch (e) {}
    //     socket.send("Test data recieved.")
    // });
    

    /*
    Starting sockets, tries updating the overview page and if that fails, it tries updating 
    the respective page
    */

    /*

    initalize currently breaking the site for some reason, will update when i figure it out
    socket.on('initialize', function(msg) {
        pressure = msg.pressure;
        altitude = msg.altitude;
        velocity = msg.velocity;
        acceleration = msg.acceleration;
        temperature = msg.temperature;
        location = msg.location
        socket.send("initialized.")
    });
    */

    socket.on('pressure', function(msg) {
        pressure[pressure.length] = msg.data;
        pressuretime[pressuretime.length] = msg.time;
        try {
            document.getElementById("pressure-tag").innerHTML = `Pressure ${msg.data}`;
        }
        catch (e) {}
        try{
            document.getElementById("pressurepage-tag").innerHTML = `Pressure: ${msg.data}`;
            updateChart(pressureChart, pressure, pressuretime)
        }
        catch (e) {}
        socket.send("Pressure data recieved.")
    });

    socket.on('altitude', function(msg) {
        altitude[altitude.length] = msg.data;
        altitudetime[altitudetime.length] = msg.time;
        try {
            document.getElementById("altitude-tag").innerHTML = `Altitude: ${msg.data}`;
        } catch (e) {}
        try {
          document.getElementById("altitudepage-tag").innerHTML = `Altitude: ${msg.data}`;
          updateChart(altitudeChart, altitude, altitudetime)
        } catch (e) {}
        socket.send("altitude data recieved.")
    });

    socket.on('acceleration', function(msg) {
        acceleration[acceleration.length] = msg.data;
        accelerationtime[accelerationtime.length] = msg.time;
        try {
            document.getElementById("acceleration-tag").innerHTML = `Acceleration: ${msg.data}`;
        } catch (e) {}
        try {
          document.getElementById("accelerationpage-tag").innerHTML = `Acceleration: ${msg.data}`;
          updateChart(accelerationChart, acceleration, accelerationtime)
        } catch (e) {}
        socket.send("acceleration data recieved.")
    });

    socket.on('temperature', function(msg) {
        temperature[temperature.length] = msg.data;
        temperaturetime[temperaturetime.length] = msg.time;
        try {
            document.getElementById("temperature-tag").innerHTML = `Temperature: ${msg.data}`;
        } catch (e) {}
        try {
          document.getElementById("temperaturepage-tag").innerHTML = `Temperature: ${msg.data}`;
          updateChart(temperatureChart, temperature, temperaturetime)
        } catch (e) {}
        socket.send("temperature data recieved.")
    });

    socket.on('velocity', function(msg) {
        velocity[velocity.length] = msg.data;
        velocitytime[velocitytime.length] = msg.time;
        try {
            document.getElementById("velocity-tag").innerHTML = `Velocity: ${msg.data}`;
        } catch (e) {}
        try {
          document.getElementById("velocitypage-tag").innerHTML = `Velocity: ${msg.data}`;
          updateChart(velocityChart, velocity, velocitytime)
        } catch (e) {}
        socket.send("velocity data recieved.")
    });

    socket.on('location', function(msg) {
        try {
            document.getElementById("location-tag").innerHTML = `Location: ${msg.data}`;
        } catch (e) {}
        socket.send("location data recieved.")
    });


}



$(document).ready(function() {

    var socket = io.connect('http://127.0.0.1:5000');

    socket.on('connect', function() {
        socket.send('User has connected!');
        // document.getElementById("test").innerHTML = "New text!";

        // setInterval(updateTime, 1000)
    });

    socket.send("Init Request")

    startSockets();
        
});

// function updateTime() {
//     time[time.length] = parseInt(time[time.length-1]) + 1;
// }

// makes a global pressure chart
let pressureChart;

function makePressureChart() {

    try {
        pressureChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('pressureChartDiv').getContext('2d');

    pressureChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:pressuretime,
        datasets:[{
          label:'Pressure',
          data: pressure,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        showLine: true,
        spanGap: true
        }]
      },
      options:{
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

// makes a global altitude chart
let altitudeChart;

function makeAltitudeChart() {

    try {
        altitudeChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('altitudeChartDiv').getContext('2d');

    altitudeChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:altitudetime,
        datasets:[{
          label:'Altitude',
          data: altitude,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        showLine: true,
        spanGap: true
        }]
      },
      options:{
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

// makes a global acceleration chart
let accelerationChart;

function makeAccelerationChart() {

    try {
        accelerationChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('accelerationChartDiv').getContext('2d');

    accelerationChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:accelerationtime,
        datasets:[{
          label:'Acceleration',
          data: acceleration,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        showLine: true,
        spanGap: true
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

// makes a global temperature chart
let temperatureChart;

function makeTemperatureChart() {

    try {
        temperatureChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('temperatureChartDiv').getContext('2d');

    temperatureChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:temperaturetime,
        datasets:[{
          label:'Temperature',
          data: temperature,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        showLine: true,
        spanGap: true
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

// makes a global velocity chart
let velocityChart;

function makeVelocityChart() {

    try {
        velocityChart.destroy();
    } catch (e) {};
    
    let myChart = document.getElementById('velocityChartDiv').getContext('2d');

    velocityChart = new Chart(myChart, {
      type:'line',
      data:{
        labels:velocitytime,
        datasets:[{
          label:'Velocity',
          data: velocity,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        showLine: true,
        spanGap: true
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

// updates chart
function updateChart(chart, data, label) {
  chart.data.datasets[0].data = data;
  chart.data.labels = label;
  chart.update();
}
