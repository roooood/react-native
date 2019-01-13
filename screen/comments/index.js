import Svg from "../../app/Svg";
import ListItem from "../../app/ListItem";
import ViewMoreText from "../../component/ViewMoreText";

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [
        {
          id: "1",
          name: "سعید قاسمی",
          date: "1390/4/4",
          desc:
            "معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های"
        },
        {
          id: "1",
          name: "سعید قاسمی",
          date: "1390/4/4",
          desc:
            "معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های"
        },
        {
          id: "1",
          name: "سعید قاسمی",
          date: "1390/4/4",
          desc:
            "معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های"
        },
        {
          id: "1",
          name: "سعید قاسمی",
          date: "1390/4/4",
          desc:
            "معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های"
        }
      ]
    };
    autoBind(this);
  }
  tabChange(key) {
    alert(key);
  }
  componentDidMount() {}
  renderRow(item) {
    return (
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
        <View style={[s.row, s.spaceB]}>
          <View>
            <Label color="#3A3B3F" isBold size={rF(6)}>
              {item.name}
            </Label>
            <Label align="left">{item.date}</Label>
          </View>
          <View style={s.aliEnd}>
            <Button
              style={[{ width: "70%" }, sf.padV(5)]}
              border={theme("secColor")}
              radius={20}
              background={theme("secColor")}
              onPress={() =>
                this.props.navigation.push("CommentsView", { id: item.id })
              }
            >
              <Label isBold color="white">
                {t("commentsPage.view")}
              </Label>
            </Button>
          </View>
        </View>
        <View
          style={[sf.bgc("#EBEBEB"), sf.pad(10), sf.br(5), sf.marT(10)]}
        >
          <Label align="left" numberOfLines={1}>
            {item.desc}
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
    // callBack(this.state.listItems.slice(10, 20));
  }
  getData(callBack, page = 1) {
    let data = {};
    data.token = this.props.user.token;
    data.page = page;
    Fetch("res_comments", data, data => {
      if (data.status == "success") {
        let temp = [],
          item;
        for (item of data.data) {
          temp.push({
            id: item.id,
            name: item.name,
            date: item.created_at,
            desc: item.message
          });
        }
        callBack(temp);
      }
    });
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Header title={t("comments")} left="back" />
        <View style={{ flex: 1, marginTop: 5 }}>
          <PageList
            pageLen={10}
            renderRow={this.renderRow}
            refresh={this.refresh}
            loadMore={this.loadMore}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({});
module.exports = connect(state => state)(Screen);
