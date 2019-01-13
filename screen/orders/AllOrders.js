import { createMaterialTopTabNavigator } from "react-navigation";
import ListItem from "../../app/ListItem";
import moment from "jalali-moment";

const listButtons = {
  // all: t("all"),
  food: t("food"),
  desk: t("table"),
  event: t("event")
};
const NewOrders = require("./NewOrders");
const AllOrders = require("./AllOrders");

class Screen extends Component {
  constructor(props) {
    super(props);
    moment.locale("fa");
    this.state = {
      listItems: [
        {
          name: "",
          type: "",
          number: "",
          discount: "",
          date: "",
          price: "",
          id: ""
        }
      ],
      orderType: "food"
    };
    autoBind(this);
  }
  tabChange(key) {
    this.setState({ orderType: key }, () => {
      this.pageList.reLoad();
    });
  }

  componentDidMount() {}

  goto(route, data) {
    this.props.navigation.navigate(route, data);
  }
  renderRow(item) {
    return (
      <View
        style={[
          styles.card,
          styles.shadow,
          sf.pad(10),
          sf.marV(5),
          sf.marH(10)
        ]}
      >
        <View style={[s.row]}>
          <Label color="#3A3B3F" style={{ flex: 1 }} size={rF(10)}>
            {item.name}
          </Label>
        </View>
        <View style={[s.row, s.spaceB]}>
          <Label size={rF(6)}>{t("orders.type")}:</Label>
          <Label size={rF(6)} color="#3A3B3F">
            {item.type}
          </Label>
        </View>
        <View style={[s.row, s.spaceB]}>
          <Label size={rF(6)}>{t("orders.number")}:</Label>
          <Label size={rF(6)} color="#3A3B3F">
            {item.number}
          </Label>
        </View>
        <View style={[s.row, s.spaceB]}>
          <Label size={rF(6)}>{t("orders.discount")}:</Label>
          <Label size={rF(6)} color="#3A3B3F">
            {item.discount}
          </Label>
        </View>
        <View style={[s.row, s.spaceB]}>
          <Label size={rF(6)}>{t("orders.date")}:</Label>
          <Label size={rF(6)} color="#3A3B3F">
            {item.date}
          </Label>
        </View>
        <View style={[styles.hr, sf.marV(10)]} />
        <View style={[s.row, s.spaceB]}>
          <Label size={rF(8)} color="#2DC56D">
            {t("orders.price")}:
          </Label>
          <Label size={rF(8)} color="#2DC56D">
            {item.price}
          </Label>
        </View>
      </View>
    );
  }

  refresh(callBack) {
    this.getData(data => {
      callBack(data);
    });
  }
  loadMore(page, callBack) {
    this.getData(data => {
      callBack(data);
    }, page);
  }
  getData(callBack, page = 1) {
    let data = {};
    data.token = this.props.user.token;
    data.page = page;
    let api = "res_order_" + this.state.orderType;
    Fetch(api, data, res => {
      if (res.status == "success") {
        let temp = [], item;
        for (item of res.data) {
          temp.push({
            name: item.title,
            type: listButtons[this.state.orderType],
            number: item.count,
            discount: item.percent,
            date:
              moment.from(item.start_date, "en").format("YYYY/MM/DD") +
              " " +
              item.start_time,
            price: C.toMoney(item.price),
            id: "10"
          });
        }
        callBack(temp);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListItem
          style={[sf.marH(5), sf.marT(5)]}
          items={listButtons}
          width={rW(30)}
          selected="food"
          onChange={this.tabChange}
        />
        <View style={{ flex: 1, marginTop: 5 }}>
          <PageList
            pageLen={10}
            ref={ref => (this.pageList = ref)}
            renderRow={this.renderRow}
            refresh={this.refresh}
            loadMore={this.loadMore}
          />
        </View>
      </View>
    );
  }
}

module.exports = connect(state => state)(Screen);
