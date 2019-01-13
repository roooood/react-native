import "./library/Global";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import DropdownAlert from "react-native-dropdownalert";
import Popup from "./component/Popup";

import MyRouter from "./Router";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  renderLoading = () => (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={theme('point')} />
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <DropdownAlert messageNumOfLines={4} messageStyle={style.message} ref={ref => (global.dropdown = ref)} />
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={this.renderLoading()}>
            <SafeAreaView style={s.flex}>
              <MyRouter />
              <Popup ref={popup => (global.popup = popup)} />
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </View>
    );
  }
}

var style = StyleSheet.create({
  message:{
    fontFamily,
    color:'#fff'
  },
})
//<StatusBar backgroundColor={Theme.statusBar}/>
//
