import { createMaterialTopTabNavigator } from "react-navigation";

const MainInfo = require("./MainInfo");
const MoreInfo = require("./MoreInfo");

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
    this.Tabs = createMaterialTopTabNavigator(
      {
        mainInfo: {
          screen: () => <MainInfo save={this.saveInfo} />,
          navigationOptions: {
            title: t("info.mainInfo")
          }
        },
        moreInfo: {
          screen: () => <MoreInfo save={this.saveInfo} />,
          navigationOptions: {
            title: t("info.moreInfo")
          }
        }
      },
      {
        initialRouteName: "mainInfo",
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
  saveInfo(loading) {
 
    let msg = [];
    if(this.props.infoProfile.res_name.length < 2){
      msg.push(t('info.resName') + t('form.emptyOrShort'))
    }
   
    if(msg.length > 0){
      loading.hide();
      dropdown.alertWithType('warn', '', msg.join('\n'))
      return;
    }
    let data   = {};
    data.token = this.props.user.token;
    data.name  = this.props.infoProfile.res_name;
    let input  = ['domain','food_status','site','delivery','percent','description','send_time','delivery_type'];
    for(i of input){
      data[i] = this.props.infoProfile[i];
    }
   
    Fetch("res_profile_update", data, res => {
      loading.hide();
      if(res.status == 'success'){
        dropdown.alertWithType('success', '', t('successSubmit'))
        this.setState({title:''})
        this.pageList.reLoad();
      }
      else{
        dropdown.alertWithType('error', '', t('errorSubmit'))
      }
    });
  }
  componentDidMount() {
    if (!("res_type" in this.props.infoProfile)) {
      Fetch("res_type", res => {
        if (res.status == "success") {
          let item,
            temp = [];
          for (item in res.data) {
            temp.push({
              id: res.data[item].id + "",
              name: res.data[item].title
            });
          }
          this.props.dispatch(setInfoProfileData({ res_type: temp }));
        } else {
        }
      });
    }

  }

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
