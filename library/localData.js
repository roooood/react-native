

    export async function  Get(callBack) {
        try {
          ret = await AsyncStorage.getItem('Happy');
          if(ret != null)
            Data = JSON.parse(ret);
        } catch (error) {
            Data = {};
        }
        callBack();
    }
    export function Save() {
        AsyncStorage.setItem('Happy', JSON.stringify(Data))
    }