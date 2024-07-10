import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import AuthContext from './AuthContext';


const LogoutScreen = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
     <Text>Are you sure you want to be logged out?</Text>
     <Button
      style={styles.logoutButton}
      title="Logout"
      mode = "contained"
      onPress={handleLogout}
    >Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
  },
});

export default LogoutScreen;
