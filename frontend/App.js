import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screens/Auth/LoginScreen';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import LogoutScreen from './Screens/Auth/LogoutScreen';
import Home from './Screens/Home'
import Create from './Screens/Create'
import JournalDetails from './Screens/JournalDetails'
import JournalUpdate from './Screens/JournalUpdate';
import Constants from 'expo-constants';
import AuthContext, { AuthProvider } from './Screens/Auth/AuthContext';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

const myStyles = {
  title: "Journal list",
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor:"grey"
  },
};

const JournalApp = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={myStyles} />
    <Stack.Screen name="Create" component={Create} options={{ ...myStyles, title: "Create" }} />
    <Stack.Screen name="JournalDetails" component={JournalDetails} options={{ ...myStyles, title: "Journal View" }} />
    <Stack.Screen name="JournalUpdate" component={JournalUpdate} options={{ ...myStyles, title: "Journal Update" }} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Journal App">
    <Drawer.Screen name="Journals" component={JournalApp} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
    {/* Add more screens here if needed */}
  </Drawer.Navigator>
);


const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        ) : (
          <Stack.Screen name="Journal" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edfdf',
    marginTop: Constants.statusBarHeight,
  },

  textStyle :{
    fontSize:25,
    color:'red'
  }
  
});
