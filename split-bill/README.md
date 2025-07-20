
SPLITWISE FEATURES:- 
create friends & groups
Split amount with them
track payments and revenue
in devices database- sqlite
access contacts & add them friends

tech stack:-
ui & state management
react native paper & other libs & context api

db: sqlite with joins
navigation: react -nav
built tool: expo

# Pre-requisites:
- npx create-expo-app@latest --template react-navigation/template

- to reset the default setup of expo-app:- 
npm run reset-project


- FOR BARE-RN= npm install react-native-screens react-native-safe-area-context
- or
- FOR EXPO= npx expo install react-native-screens react-native-safe-area-context

npm install --save react-native-safe-area-context react-native-paper react-native-vector-icons react-native-screens

provide support to navigation:
npm install --save @react-navigation/native
npm install --save @react-navigation/stack
npm install --save react-native-gesture-handler


npx pod-install ios

resources:
https://oblador.github.io/react-native-vector-icons/
https://docs.expo.dev/get-started/set-up-your-environment/
https://callstack.github.io/react-native-paper/docs/components/Card/
https://excalidraw.com/
https://docs.expo.dev/develop/tools/


to restart metro bundler:-
npx expo start --clear

npm install --save @react-navigation/material-bottom-tabs

initial setup:-
login/signup screen = mandatory

SQLITE
creating connection with db
creating db tables

error resolved:-
npm install wa-sqlite
npm install expo-sqlite@latest
and do it:-

Ensure the .wasm file is available The wa-sqlite.wasm file should be in the correct path. If it's missing, you can manually copy it:-
Locate the .wasm file in node_modules/wa-sqlite/dist/wa-sqlite.wasm
Copy it to node_modules/expo-sqlite/web/wa-sqlite/

CREATING CONFIG FILE:- metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('wasm');
module.exports = config;


- clear cache:-
- npx expo start -c

- for the error:-Uncaught Error
Aborted(LinkError: WebAssembly.instantiate(): Import #69 "a" "pa": function import requires a callable)
- run the app on the android phone on expo app
