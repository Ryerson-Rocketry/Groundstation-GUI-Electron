from distutils.log import debug
from socket import socket
from flask import Flask 
from flask_socketio import SocketIO, send, emit
from threading import Lock

thread = None
thread_lock = Lock()
import asyncio

app = Flask(__name__)
app.config['SECRET_KEY'] = 'mysecret'
socketio = SocketIO(app, cors_allowed_origins='*')

# @socketio.on('connect')
# def onConnect():
#     print("CONNNECTEDDD")
#     socketio.start_background_task(background_thread())

@socketio.on('message')
def handleMessage(msg):
	print('Message: ' + msg)
	send(msg, broadcast=True)

def background_thread():
    i = 0
    while True:
        print(f'ok {i}')
        socketio.emit("test", {'data':f"{i}"})
        socketio.emit("pressure", {'data':f"{i}"})
        socketio.emit("altitude", {'data':f"{i}"})
        socketio.emit("velocity", {'data':f"{i}"})
        socketio.emit("acceleration", {'data':f"{i}"})
        socketio.emit("temperature", {'data':f"{i}"})
        socketio.emit("location", {'data':f"{i}"})
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
    emit('test', {'data': 'Connected', 'count': 0})
    



if __name__ == '__main__':
	socketio.run(app, debug=True)

