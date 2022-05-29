from curses.ascii import alt
from distutils.log import debug
from socket import socket
from flask import Flask 
from flask_socketio import SocketIO, send, emit
from threading import Lock
import asyncio



thread = None
thread_lock = Lock()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)


time = []
pressure = []
altitude = []
velocity = []
acceleration = []
temperature = []

thread_started = False

def background_thread():

    global time
    global pressure
    global altitude
    global velocity
    global acceleration
    global temperature
    global thread_started

    i = 0
    # socketio.emit("initarrays",{'time':time,
    #             'pressure': pressure,
    #             'altitude':altitude,?"}P{ z?"":LKJGF DS}    #             'velocity':velocity,
    #             'acceleration':acceleration,
    #             'temperature':temperature} )

    if thread_started == True:
        return

    thread_started = True

    while True:

        print(f'ok {i}')
        time.append(i)
        pressure.append(i)
        altitude.append(i)
        velocity.append(i)
        acceleration.append(i)
        temperature.append(i)

        socketio.emit("test", {'data':f"{time}"})
        socketio.emit("pressure", {'data':f"{pressure[i]}"})
        socketio.emit("altitude", {'data':f"{altitude[i]}"})
        socketio.emit("velocity", {'data':f"{velocity[i]}"})
        socketio.emit("acceleration", {'data':f"{acceleration[i]}"})
        socketio.emit("temperature", {'data':f"{temperature[i]}"})
        socketio.emit("location", {'data':f"{time[i]}"})

        socketio.sleep(1)

        i += 1



@socketio.event
def connect():
    global thread
    global time
    global pressure
    global altitude
    global velocity
    global acceleration
    global temperature

    

    with thread_lock:
        if thread is None:
            print("Starting thread")
            thread = socketio.start_background_task(background_thread)

    print("Started thread")
    emit('test',{'data': 'Connected'})
    



if __name__ == '__main__':
	socketio.run(app, debug=True)

