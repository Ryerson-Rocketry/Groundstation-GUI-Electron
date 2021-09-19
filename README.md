# Groundstation-GUI-Electron
A new groundstation GUI based on ELectron
#radio config commands:
  * **-h, --help**     show this help message and exit
  * **-SS**            set SERIAL_SPEED: Serial speed in ‘one byte form’ Valid choices are: from 2400 to 115200. DEFAULT is: 57600
  * **-AS**            set AIR_SPEED: Valid choices are: from 4 to 250. DEFAULT is: 128
  * **-NETID**         set NET_ID: Network ID. Valid choices are: from 0 to 499. DEFAULT is: 1
  * **-PWR**           set TXPOWER: Transmit power in dBm. Valid choices are: from 1 to 30. DEFAULT is: 21
  * **-ECC**           set ECC: Enables or disables the golay error correcting code Valid choices are: from 0 to 1. DEFAULT is: 0
  * **-MAV**           set MAVLINK: Enables or disables the MAVLink framing and reporting Valid choices are: from 0 to 1. DEFAULT is: 0
  * **-OP**            set OPPRESEND:Opportunic Resend Valid choices are: from 0 to 1. DEFAULT is: 0
  * **-mf**            set MIN_FREQ: Min freq in KHz Valid choices are: from 902000 to 927000. DEFAULT is: 902000
  * **-MF**            set MAX_FREQ: Max freq in KHz Valid choices are: from 903000 to 928000. DEFAULT is: 908000
  * **-NC**            set NUM_CHANNELS: Number of frequency hopping channels Valid choices are: from 1 to 49. DEFAULT is: 1
  * **-DC**            set DUTY_CYCLE: The percentage of time to allow transmit Valid choices are: from 10 to 99. DEFAULT is: 40
  * **-LBT**           set LBT_RSSI: Listen before talk threshold Valid choices are: from 0 to 1. DEFAULT is: 0
  * **-MAN**           set MANCHESTER: Manchester encoding Valid choices are: from 0 to 1. DEFAULT is: 0
 * **-RTSCTS**        set RTSCTS: Ready To Send and Clear To Send Valid choices are: from 0 to 1. DEFAULT is: 0
 * **-NODE_ID**       set NODEID: Node ID. Base node ID is 0. One node must be acting as a base for a multipoint environment to work. NODECOUNT must be updated
                 first before updating this parameter with bigger number. Valid choices are: from 0 to 29. DEFAULT is: 0
 * **-NODE_DEST**     set NODEDESTINATION: Remote node ID to communicate with. Set the value to 65535 to broadcast to all nodes. Cannot be the same as NODEID.
                 NODECOUNT must be updated first before updating this parameter with bigger number. Valid choices are: from 0 to 29. DEFAULT is: 0
 * **-SYN**           set SYNCANY: If set to 1, allows the modem to send data to all non-base nodes without finding the base. It is strongly recommended to set the
                 value to 0 to avoid unwanted data communication confusion on a multipoint environment. Valid choices are: from 0 to 1. DEFAULT is: 0
 * **-NODE_COUNT**    set NODECOUNT: The total number of nodes. Valid choices are: from 2 to 30. DEFAULT is: 2
 * **--version**      show program's version number and exit
  * **-p** : PORT        Serial port. Default: COM4
  * **-v**: VERBOSE     Enables extra information output (debugging).
  * **-tb**: TEST_BAUD  Test serial port for correct baud rate.
  * **-b** : BAUD        Choose our serial connection speed to the radio in baud If no baud specified, it will test. (factory default: 57600)
