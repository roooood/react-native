import { createDrawerNavigator, createStackNavigator } from "react-navigation";
//import SideMenu from './component/Drawer';
import RNRestart from "react-native-restart";

import Home from "./screen/home/";
import Sign from "./screen/sign/Sign";
import Transaction from "./screen/transaction/"
import Product from "./screen/product/";
import Category from "./screen/category/";
import DiscountAdd from "./screen/discount/Add";
import DiscountManage from "./screen/discount/Manage";
import AddTable from "./screen/product/add/Table";
import AddFood from "./screen/product/add/Food";
import AddEvent from "./screen/product/add/Event";
import Comments from "./screen/comments/index";
import CommentsView from "./screen/comments/View";
import Orders from "./screen/orders/";
import Info from "./screen/info/";
import Setting from "./screen/setting/";

export default class MyRouter extends React.Component {
  constructor(props) {
    super(props);
    this.homePage = "Home";

    this.StackNavigator = createStackNavigator(
      {
        Home,
        Sign,
        Transaction,
        Product,
        AddTable,
        AddFood,
        AddEvent,
        Category,
        DiscountAdd,
        DiscountManage,
        Comments,
        CommentsView,
        Orders,
        Info,
        Setting
      },
      {
        initialRouteName: this.homePage,
        headerMode: "none",
        navigationOptions: {}
      }
    );
    this.Drawer = createDrawerNavigator(
      {
        home: this.StackNavigator
      },
      {
        contentComponent: null,
        drawerWidth: rW(70),
        drawerPosition: "right",
        headerMode: "none"
      }
    );

    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
    if (!I18nManager.isRTL) RNRestart.Restart();
    this.props.dispatch(setUserData({token:'9ae4a6d8b62603beeae5c11d09e1ffd0'}));
  }

  render() {
    const Drawer = this.Drawer;
    return (
      <View style={[styles.container]}>
        <Drawer />
      </View>
    );
  }
}

module.exports = connect(state => state)(MyRouter);
