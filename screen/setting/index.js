import {createStackNavigator } from 'react-navigation'

import SettingHome from './Home';
import SettingFaq from './Faq';
import SettingRules from './Rules';
import ContactUs from './contactUs';
import ChangePass from './changePass';


class Screen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    let xnavigation = this.props.navigation;
    this.Tabs = createStackNavigator(
      {
        SettingHome : {
          screen : (({navigation})=><SettingHome parent={xnavigation} navigation={navigation} />)
        },
        SettingFaq,
        SettingRules,
        ContactUs,
        ChangePass
      },
      {
        mode: 'modal',
        headerMode: 'none',
        initialRouteName: "SettingHome",
        headerMode: 'none',
        navigationOptions: () => ({
          tabBarVisible: false,
        }),
      }
    );
  }
  render() {
    const Tabs = this.Tabs;
    return (
      <View style={s.f}>
        <Tabs/>
      </View>
    );
  }
}

var style = StyleSheet.create({
  
});

module.exports = connect(state => state)(Screen);
