# chat application with react native
- websocket
- close connection- 
- close()- for default close when user exit the chat
- close(code)- with optional code arg
- close(code, reason)- optional code and reason arg
- code can be custom-> 1000- 3000

# websocket instance properties
- buffered amount- return the amount of data that has been queued using the send method  (value sets to 0 else not 0)
- extensions- extensions will returns any extension provided by the server. extend the properties of websocket protocol.
- url - returns the url of the websocket
- protocol- returns the subprotocol that was supplied to the websocket constructor
- binarytype- which type of bdata supplied to websocket
- blob- will use blob type for binary data
- arraybuffer- for binarydata only

# creating socket.io server
- easier to work with
- room support
- connection state recovery
 
# installation and creating the project
- npm install -g react-native-cli
- npx react-native init MyApp
- or 
- npx react-native init MyApp --template react-native-template-typescript

# In POWERSHELL :-
$env:ANDROID_HOME="C:\Users\SAADHY\AppData\Local\Android\Sdk"
$env:PLATFORM_TOOLS="$env:ANDROID_HOME\platform-tools"
$env:Path+=";$env:PLATFORM_TOOLS"

Get-ChildItem -Path Env:\Path
# verify device connection:-
adb devices
npx react-native run-android

# add this in build.gradle file to enable icons
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")

In terminal:
cd android
./gradlew clean

# import like below in components:-
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
