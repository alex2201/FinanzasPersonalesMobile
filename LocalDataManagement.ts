import AsyncStorage from "@react-native-community/async-storage";

const storeData = async (key: string, val: string) => {
    try {
        await AsyncStorage.setItem(key, val);
    } catch (e) {
        console.warn(e);
    }
};

const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.warn(e);
    }
};

const retrieveData = async (key: string) => {
    let value;
    try {
        value = await AsyncStorage.getItem(key);
    } catch (e) {
        console.warn(e);
    }
    return value;
};

export const LocalDataManagement = {storeData: storeData, retrieveData: retrieveData, removeData: removeData};