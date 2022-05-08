import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      alert(e);
    }
  }

const storeObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    alert(e);
  }
}

  const getData = async (key, onValueCallback) => {
    try {
      const value = await AsyncStorage.getItem(key)      
      onValueCallback(value);

    } catch(e) {
        alert(e);
    }
  }

  export { storeData, getData };