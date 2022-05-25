let pressure = [0];
let altitude = [0];
let temperature = [0];
let velocity = [0];
let acceleration = [0];
let time = [0]



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

    startSockets();

    // if (name = "pressure") {
    //     console.log('making pressure chart');
    //     makePressureChart();
    // }

    
}




function startSockets() {
    var socket = io.connect('http://127.0.0.1:5000');

    // socket.on('connect', function() {
    //     socket.send('User has connected!');
    //     document.getElementById("test").innerHTML = "New text!";
        
    // });

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
        }
        catch (e) {}
        socket.send("Pressure data recieved.")
    });

    socket.on('altitude', function(msg) {
        altitude[altitude.length] = msg.data;
        try {
            document.getElementById("altitude-tag").innerHTML = `altitude: ${msg.data}`;
        } catch (e) {}
        socket.send("altitude data recieved.")
    });

    socket.on('acceleration', function(msg) {
        acceleration[acceleration.length] = msg.data;
        try {
            document.getElementById("acceleration-tag").innerHTML = `acceleration: ${msg.data}`;
        } catch (e) {}
        socket.send("acceleration data recieved.")
    });

    socket.on('temperature', function(msg) {
        temperature[temperature.length] = msg.data;
        try {
            document.getElementById("temperature-tag").innerHTML = `temperature: ${msg.data}`;
        } catch (e) {}
        socket.send("temperature data recieved.")
    });

    socket.on('velocity', function(msg) {
        velocity[velocity.length] = msg.data;
        try {
            document.getElementById("velocity-tag").innerHTML = `velocity: ${msg.data}`;
        } catch (e) {}
        socket.send("velocity data recieved.")
    });

    socket.on('location', function(msg) {
        try {
            document.getElementById("location-tag").innerHTML = `location: ${msg.data}`;
        } catch (e) {}
        socket.send("location data recieved.")
    });
}



$(document).ready(function() {

    var socket = io.connect('http://127.0.0.1:5000');

    socket.on('connect', function() {
        socket.send('User has connected!');
        document.getElementById("test").innerHTML = "New text!";

        setInterval(updateTime, 1000)
        pressure = msg.pressure;
        altitude = msg.altitude;
        time = msg.time;
        velocity = msg.velocity;
        acceleration = msg.acceleration;
        location = msg.location;
    });

        
});

function updateTime() {
    time[time.length] = time[time.length-1] + 1;
    console.log(time);
    document.getElementById("location").innerHTML = `test ${time[time.length-1]}`;
}

// function makePressureChart() {
    


// }



