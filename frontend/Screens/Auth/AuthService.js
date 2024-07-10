import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../Utils/utils'

const register = (username, email, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    return axios.post(API_URL + 'register/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  
  const login = (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    return axios.post(API_URL + 'login/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(async (response) => {
      console.log('Login response:', response.data); // Log response data
      const { access, refresh } = response.data;
      if (access) {
        await AsyncStorage.setItem('accessToken', access);
        await AsyncStorage.setItem('refreshToken', refresh);
      }
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.log('Login error response data:', error.response.data); // Log error response data
        console.log('Login error response status:', error.response.status); // Log error response status
      } else {
        console.log('Login error:', error.message); // Log generic error message
      }
      throw error;
    });
  };
  
  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  };
  
  export default {
    register,
    login,
    logout,
  };

