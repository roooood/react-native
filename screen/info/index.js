import ListItem from "../../app/ListItem";

const listButtons = {
  profile: t("info.profile"),
  gallery: t("info.gallery"),
  Possibility: t("info.Possibility"),
  position: t("info.position")
};

const Profile = require("./profile/");
const Picture = require("./picture/");
const Possibilities = require("./possibilities/");
const Position = require("./position/");

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "profile"
    };
    autoBind(this);
  }
  tabChange(tab) {
    this.setState({ tab: tab });
  }
  componentDidMount() {
    Fetch("res_profile", { token: this.props.user.token }, res => {
      if (res.status == "success") {
        let item;
        let data = {};
        for (item in res.data) {
          data[item] = res.data[item];
        }
        data.res_types.map(v=>''+v)
        this.props.dispatch(setInfoProfileData(data));
      } else {
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title={t("info.title")} left="back" />
        <ListItem
          style={[sf.marH(5), sf.marT(5)]}
          items={listButtons}
          onChange={this.tabChange}
          width={rW(22)}
          selected={this.state.tab}
          // showChips={false}
        />
        <View style={s.flex}>
          {
            {
              profile: <Profile />,
              gallery: <Picture />,
              Possibility: <Possibilities />,
              position: <Position />
            }[this.state.tab]
          }
        </View>
      </View>
    );
  }
}

module.exports = connect(state => state)(Screen);
