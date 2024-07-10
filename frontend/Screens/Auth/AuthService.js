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
  
  const login = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
  
    try {
      const response = await fetch(API_URL + 'login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Login error response data:', errorData);
        throw new Error(errorData.message || 'Login failed');
      }
  
      const data = await response.json();
      console.log('Login response:', data);
      const { access, refresh } = data;
      if (access) {
        await AsyncStorage.setItem('accessToken', access);
        await AsyncStorage.setItem('refreshToken', refresh);
      }
      return data;
    } catch (error) {
      console.log('Login error:', error.message);
      throw error;
    }
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

