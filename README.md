# Groundstation-GUI-Electron
A new groundstation GUI based on ELectron
## radio config commands:

 * -h, --help       show this help message and exit
  * -SS               set SERIAL_SPEED: Serial speed in ‘one byte form’_______Valid choices are: from 2400 to 115200.______ DEFAULT is: 57600 _______
  * -AS             set AIR_SPEED: _______Valid choices are: from 4 to 250.______ DEFAULT is: 128 _______
  * -NETID         set NET_ID: Network ID._______Valid choices are: from 0 to 499.______ DEFAULT is: 1 _______
  * -PWR             set TXPOWER: Transmit power in dBm._______Valid choices are: from 1 to 30.______ DEFAULT is: 21 _______
  * -ECC             set ECC: Enables or disables the golay error correcting code_______Valid choices are: from 0 to 1.______ DEFAULT is: 0 _______
  * -MAV              set MAVLINK: Enables or disables the MAVLink framing and reporting_______Valid choices are: from 0 to 1.______ DEFAULT is: 0 _______
  * -OP             set OPPRESEND:Opportunic Resend_______Valid choices are: from 0 to 1.______ DEFAULT is: 0 _______
  * -mf               set MIN_FREQ: Min freq in KHz_______Valid choices are: from 902000 to 927000.______ DEFAULT is: 902000 _______
  * -MF              set MAX_FREQ: Max freq in KHz_______Valid choices are: from 903000 to 928000.______ DEFAULT is: 908000 _______
  * -NC               set NUM_CHANNELS: Number of frequency hopping channels_______Valid choices are: from 1 to 49.______ DEFAULT is: 1 _______
  * -DC               set DUTY_CYCLE: The percentage of time to allow transmit_______Valid choices are: from 10 to 99.______ DEFAULT is: 40 _______
  * -LBT              set LBT_RSSI: Listen before talk threshold_______Valid choices are: from 0 to 1.______ DEFAULT is: 0 _______
  * -MAN             set MANCHESTER: Manchester encoding_______Valid choices are: from 0 to 1.______ DEFAULT is: 0 _______
  * -RTSCTS           set RTSCTS: Ready To Send and Clear To Send_______Valid choices are: from 0 to 1.______ DEFAULT is: 0 _______
  * -NODE_ID          set NODEID: Node ID. Base node ID is 0. One node must be acting as a base for a multipoint environment to work. NODECOUNT must be
                    updated first before updating this parameter with bigger number._______Valid choices are: from 0 to 29.______ DEFAULT is: 0 _______
  * -NODE_DEST      set NODEDESTINATION: Remote node ID to communicate with. Set the value to 65535 to broadcast to all nodes. Cannot be the same as
                   NODEID. NODECOUNT must be updated first before updating this parameter with bigger number._______Valid choices are: from 0 to 29.______
                   DEFAULT is: 0 _______
  * -SYN             set SYNCANY: If set to 1, allows the modem to send data to all non-base nodes without finding the base. It is strongly recommended to
                   set the value to 0 to avoid unwanted data communication confusion on a multipoint environment._______Valid choices are: from 0 to 1.______
                   DEFAULT is: 0 _______
  * -NODE_COUNT      set NODECOUNT: The total number of nodes._______Valid choices are: from 2 to 30.______ DEFAULT is: 2 _______
  * --version        show program's version number and exit
  * -p PORT          Serial port. Default: COM4
  * -v VERBOSE       Enables extra information output (debugging).
  * -tb TEST_BAUD    Test serial port for correct baud rate.
  * -l LOCAL_RADIO   Work with the local radio. Program default. Can't be used simultaneously with remote option.
  * -r REMOTE_RADIO  Work with the remote radio.
  * -b BAUD          Choose our serial connection speed to the radio in baud If no baud specified, it will test. (factory default: 57600)
