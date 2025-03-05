// /**
//  * authoer:- saadhya
//  *
//  * @format
//  */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from './providers/AuthContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import HomeStack from './navigation/HomeStack';


const App: React.FC = () => {
  const userType: 'customer' | 'host' = 'host'; // Change to 'host' to test the host navigation
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <NavigationContainer>
          {/* <BottomTabs userType={userType} /> */}
          <HomeStack/>
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;

// import React from 'react';
// import {
//   StyleSheet,
//   useColorScheme,
// } from 'react-native';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';
// import {AuthProvider} from './providers/AuthContext';
// import {NavigationContainer} from '@react-navigation/native';
// import BottomTabs from './navigation/BottomTabs';

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
//   const safePadding = '5%';
//   const userType: 'customer' | 'host' = 'host'; // Change to 'host' to test the host navigation

//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <BottomTabs userType={userType} />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
