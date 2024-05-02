import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageService {
  static async set(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`AsyncStorage set error for key '${key}':`, error);
    }
  }

  static async get(key: string, defaultValue = null) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`AsyncStorage get error for key '${key}':`, error);
      return defaultValue;
    }
  }

  static async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`AsyncStorage remove error for key '${key}':`, error);
    }
  }

  static async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('AsyncStorage clear error:', error);
    }
  }
}

export default AsyncStorageService;
