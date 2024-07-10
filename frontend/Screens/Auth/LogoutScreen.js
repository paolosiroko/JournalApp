import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import AuthContext from './AuthContext';
import {FAB} from 'react-native-paper'

const LogoutScreen = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>

     <FAB
      style={styles.logoutButton}
      small = {true}
      icon="logout"
      label="->"
      onPress={handleLogout}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    position:'absolute',
    margin:16,
    left:0,
    bottom:0,
  },
});

export default LogoutScreen;
