icons:-
https://oblador.github.io/react-native-vector-icons/#Feather

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


# to start metro bundler:-
- npx expo start --clear/-c

- npm install --save @react-navigation/material-bottom-tabs

# initial setup:-
- login/signup screen = mandatory

# SQLITE
- creating connection with db
- creating db tables

# error resolved:-
npm install wa-sqlite
npm install expo-sqlite@latest
and do it:-

Ensure the .wasm file is available The wa-sqlite.wasm file should be in the correct path. If it's missing, you can manually copy it:-
Locate the .wasm file in node_modules/wa-sqlite/dist/wa-sqlite.wasm
Copy it to node_modules/expo-sqlite/web/wa-sqlite/

# CREATING CONFIG FILE:- metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('wasm');
module.exports = config;


# clear cache:-
- npx expo start -c

# for the error:-Uncaught Error
Aborted(LinkError: WebAssembly.instantiate(): Import #69 "a" "pa": function import requires a callable)
- run the app on the android phone on expo app

# error- CommandError: ngrok tunnel took too long to connect.
npm install -g ngrok
npm install @expo/ngrok@2.4.3
npx expo start --reset-cache
# Verify ngrok installation and configuration:
Ensure ngrok is installed globally: npm install -g ngrok or yarn global add ngrok.
If using nvm (Node Version Manager), ensure the npm prefix is correctly aligned with your active Node.js version. You can check this with npm config get prefix and fix it with npm config set prefix "$NVM_BIN/..".
Reinstall the @expo/ngrok package: npm install -g @expo/ngrok@^4.1.0

# Adjust Expo start command and package.json:
Ensure your start script in package.json explicitly uses the --tunnel flag, e.g., "start": "expo start --tunnel".
Try running npx expo start --tunnel --reset-cache to clear the Expo cache.

# npx expo start - working for mobile and emulator both

# working:-
- remove node-modules and package-lock file 
- uninstall expo-go
- then run this cmd:- npx expo start --tunnel

- npm install rimraf@^4.0.0 uuid@^9.0.0 glob@^9.0.0
- npm audit fix

# NEW LIBRARIES:-
npx expo install react-native-pager-view
npx expo install expo-contacts
npx expo install react-native-multiple-select

# ERROR:- 
- Error [ERR_REQUIRE_ESM]: require() of ES Module C:\MY-PERSONAL\projects\React-native-Explorer\split-bill\metro.config.js from C:\MY-PERSONAL\projects\React-native-Explorer\split-bill\node_modules\cosmiconfig\node_modules\import-fresh\index.js not supported.     
metro.config.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.
Instead either rename metro.config.js to end in .cjs, change the requiring code to use dynamic import() which is available in all CommonJS modules, or change "type": "module" to "type": "commonjs" in C:\MY-PERSONAL\projects\React-native-Explorer\split-bill\package.json to treat all .js files as CommonJS (using .mjs for all ES modules instead).

# SOLUTION:-
- metro.config.js is used by the Metro bundler, which expects a CommonJS module.
If your project uses "type": "module" in package.json, then .js files are treated as ES Modules, which breaks Metro's expectations.
- type: "commonjs"
Renaming to .cjs tells Node to treat it as CommonJS, solving the compatibility issue.

# how to upgrade sdk 54 version
- https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/
- npm install expo@^54.0.0 
- npx expo install --fix
- npx expo-doctor
- npm install --legacy-peer-deps
- npx expo install --check

# update these libs 
- npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
- update babel file

- working cmd = npx expo start --clear

# refactoring and reusing the groupexpenselist and groupexpenseitem because we are using same in friends


# next to be done is fix the settlement of the expenses in groups and friends both.
- its done in groups and friends both.
- update account ui also
- createsplit not loading data properly
- delete expense item added by mistake
- remove group and friends functionality



