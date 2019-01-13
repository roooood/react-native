import { createMaterialTopTabNavigator } from "react-navigation";

const NewOrders = require("./NewOrders");
const AllOrders = require("./AllOrders");

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {}
    };
  }
  componentDidMount() {}
  render() {
    const Tabs = createMaterialTopTabNavigator(
      {
        new: {
          screen: () => <NewOrders navigation={this.props.navigation} />,
          navigationOptions: {
            title: t("orders.newOrders")
          }
        },
        all: {
          screen: () => <AllOrders navigation={this.props.navigation} />,
          navigationOptions: {
            title: t("orders.AllOrders")
          }
        }
      },
      {
        initialRouteName: "new",
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
            fontFamily: fontFamily
          },
          style: {
            borderWidth: 0,
            backgroundColor: "#fff"
          }
        }
      }
    );
    return (
      <View style={styles.container}>
        <Header title={t("orders.orderManagment")} left="back" />
        <Tabs />
      </View>
    );
  }
}

module.exports = connect(state => state)(Screen);
