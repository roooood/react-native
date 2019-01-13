import Svg from "../../app/Svg";
import ListItem from "../../app/ListItem";
import ViewMoreText from "../../component/ViewMoreText";
import moment from "jalali-moment";

class Screen extends Component {
  constructor(props) {
    super(props);
    moment.locale("fa");
    this.id = this.props.navigation.getParam("id", 0);
    this.state = {
      id: "",
      name: "",
      date: "",
      score: "",
      desc: ""
    };
    autoBind(this);
  }
  tabChange(key) {
    alert(key);
  }
  componentDidMount() {
    let data = {};
    data.token = this.props.user.token;
    data.comment_id = this.id;

    Fetch("res_comment_show", data, res => {
      if (res.status == "success") {
        this.setState({
          id: res.data.id,
          name: res.data.name,
          date: moment
            .from(res.data.created_at, "en")
            .format("YYYY/MM/DD HH:mm:ss"),
          score: res.data.rate,
          desc: res.data.message
        });
      }
    });
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Header title={t("comments")} left="back" />
        <View style={{ flex: 1, marginTop: 5 }}>
          <View
            style={[
              styles.card,
              styles.shadow,
              sf.pad(10),
              sf.mar(10),
              //   sf.marT(50),
              sf.marV(5)
            ]}
          >
            <View style={[s.row, { alignItem: "center" }]}>
              <View>
                <View style={s.row}>
                  <Label>ارسال نظر توسط:</Label>
                  <Label
                    color="#3A3B3F"
                    isBold
                    size={rF(6)}
                    style={sf.marH(5)}
                  >
                    {this.state.name}
                  </Label>
                </View>
                <View style={[s.row, sf.padT(5)]}>
                  <Label>تاریخ ارسال نظر:</Label>
                  <Label
                    color="#3A3B3F"
                    isBold
                    size={rF(7)}
                    style={sf.marH(5)}
                  >
                    {this.state.date}
                  </Label>
                </View>
                <View style={[s.row, sf.padT(5)]}>
                  <Label>امتیاز دریافتی:</Label>
                  <Label
                    color="#3A3B3F"
                    isBold
                    size={rF(7)}
                    style={sf.marH(5)}
                  >
                    {this.state.score}
                  </Label>
                </View>
              </View>
            </View>
            <View
              style={[sf.bgc("#EBEBEB"), sf.pad(10), sf.br(5), sf.marT(10)]}
            >
              <Label align="left" style={{ lineHeight: 24 }}>
                {this.state.desc}
              </Label>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({});
module.exports = connect(state => state)(Screen);
