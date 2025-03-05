import {
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native';
const windowDimensions = Dimensions.get('window');
const winHeight = windowDimensions.height;
type FooterProps = {
  navigation: any;
};
const Footer: React.FC<FooterProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <Image
          source={require('../assets/logo.jpg')}
          style={{width: 50, height: 50}}
        />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.logoText}>GloboChat</Text>
          <Text style={styles.menu}>OUR STORY</Text>
          <Text style={styles.menu}>ROBOTICS</Text>
          <Text style={styles.menu}>CAREERS</Text>
        </View>
      </View>
      <Text style={styles.menu}>© 2023 - All rights reserved</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120,
    paddingVertical:5,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    width: '100%',
    padding:5,
    ...Platform.select({
      ios: {
        position: 'absolute',
        height: winHeight - 50,
      },
      android: {
        position: 'absolute',
        height: winHeight - 50,
      },
      default: {
        bottom: 0,
        position: 'absolute',
      },
    }),
  },
  logoText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    alignSelf: 'center',
  },
  menu: {
    color: '#fff',
    marginTop: 5,
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
});
export default Footer;
