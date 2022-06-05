from flask import Flask 
from flask_socketio import SocketIO, send, emit
from threading import Lock

# declare the global array variables
time = []
pressure = []
altitude = []
velocity = []
acceleration = []
temperature = []

thread = None
thread_lock = Lock()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('message')
def handleMessage(msg):
    print('Message: ' + msg)
    if msg == "Init Request":
        # print("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\hello")
        socketio.emit("initialize",{"pressure":f"{pressure}",
        "altitude":f"{altitude}",
        "acceleration":f"{acceleration}",
        "altitude":f"{altitude}",
        "temperature":f"{temperature}",
        "velocity":f"{velocity}"
        })
	# send(msg, broadcast=True)


thread_started = False

'''
Background thread starts a loop that runs every second and updates the frontend via sockets

''' 
def background_thread():

    global time
    global pressure
    global altitude
    global velocity
    global acceleration
    global temperature
    global thread_started

    i = 0

    # logic to prevent multiple threads from starting 
    if thread_started == True:
        return

    thread_started = True

    while True:

        # code to test, you can remove
        print(f'ok {i}')
        time.append(i)
        pressure.append(i)
        altitude.append(i)
        velocity.append(i)
        acceleration.append(i)
        temperature.append(i)

        """
        implement logic to decide which data to send, append it to the array
        use the respective namespace in the emit function to send that data to frontend
        if you are using a timestamp, add the timestamp as well.

        you can delete the time global variable after you implement timestamps

        also need to add logic for location tracking
        """

        socketio.emit("test", {'data':f"{time}"})
        socketio.emit("pressure", {'data':f"{pressure[i]}", "time":f"{time[i]}"})
        socketio.emit("altitude", {'data':f"{altitude[i]}", "time":f"{time[i]}"})
        socketio.emit("velocity", {'data':f"{velocity[i]}", "time":f"{time[i]}"})
        socketio.emit("acceleration", {'data':f"{acceleration[i]}", "time":f"{time[i]}"})
        socketio.emit("temperature", {'data':f"{temperature[i]}", "time":f"{time[i]}"})
        socketio.emit("location", {'data':f"{time[i]}", "time":f"{time[i]}"})

        socketio.sleep(1)

        i += 1



@socketio.event
def connect():
    global thread

    with thread_lock:
        if thread is None:
            print("Starting thread")
            thread = socketio.start_background_task(background_thread)

    print("Started thread")
    emit('test',{'data': 'Connected'})
    



if __name__ == '__main__':
	socketio.run(app, debug=True)

