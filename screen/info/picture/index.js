import { createMaterialTopTabNavigator } from "react-navigation";

const Slider = require("./Slider");
const Gallery = require("./Gallery");
const Logo = require("./Logo");

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
    this.Tabs = createMaterialTopTabNavigator(
      {
        Logo: {
          screen: () => <Logo />,
          navigationOptions: {
            title: t("info.Logo")
          }
        },
        Slider: {
          screen: () => <Slider />,
          navigationOptions: {
            title: t("info.Slider")
          }
        },
        Gallery: {
          screen: () => <Gallery />,
          navigationOptions: {
            title: t("info.Gallery")
          }
        }
      },
      {
        initialRouteName: "Logo",
        animationEnabled: true,
        swipeEnabled: true,
        tabBarColor: "#fff",
        navigationOptions: ({ navigation }) => ({}),
        tabBarOptions: {
          indicatorStyle: {
            backgroundColor: theme("point")
          },
          inactiveTintColor: theme("color"),
          activeTintColor: theme("point"),
          labelStyle: {
            fontFamily: fontFamily,
            margin: 0
          },
          style: {
            borderWidth: 0,
            backgroundColor: "#fff"
          }
        }
      }
    );
  }
  componentDidMount() {}

  render() {
    const Tabs = this.Tabs;
    return (
      <View style={styles.container}>
          <View style={[sf.pad(10, 15), s.aliCenter,s.flex]}>
            <View
              style={[
                styles.card,
                s.hidden,
                styles.shadow,
                sf.marTop(10),
                s.w100,
                sf.pad(0),
                s.flex
              ]}
            >
              <Tabs />
            </View>
          </View>
      </View>
    );
  }
}

module.exports = connect(state => state)(Screen);
