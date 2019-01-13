import Svg from "../../app/Svg";
import ListItem from "../../app/ListItem";
import moment from 'jalali-moment';

const listButtons = {
  food: t("food"),
  desk: t("table"),
  event: t("event")
};

class Screen extends Component {
  constructor(props) {
    super(props);
    moment.locale('fa');
    this.state = {
      listItems: [
        // {
        //   name: "برگر فرانسوی",
        //   remind: "2 - 5",
        //   type: "لحظه ای",
        //   percent: "25%",
        //   price: "20,000",
        //   startDate: "1397-10-01",
        //   endDate: "1397-10-11"
        // }
      ],
      discountType: 'food',
    };
    autoBind(this);
  }
  tabChange(key) {
    this.setState({discountType: key}, ()=>{
      this.pageList.reLoad();
    })
  }
  componentDidMount() {
    this.getData((data)=>{
        callBack(data)
    })
  }
  renderRow(item) {
    let Icon;
    switch(this.state.discountType){
      case 'food':
        Icon = Svg.Food;
        break;
      case 'desk':
        Icon = Svg.Table;
        break;
      case 'event':
        Icon = Svg.Event;
        break;
    }

    return (
      <View
        style={[
          styles.card,
          styles.shadow,
          sf.pad(10),
          sf.mar(10),
          sf.marT(50),
          sf.marV(5)
        ]}
      >
        <View style={[s.row, s.spaceB]}>
          <View style={[s.row, {flex: 1}]}>
            <Label style={[]}> </Label>
            <Label style={[sf.marS(5)]} color="#3A3B3F">
              {item.remind}
            </Label>
          </View>
          <View style={{flex: 1}}>
            <View style={[style.image, styles.shadow]} />
            <View style={[s.row, sf.padT(rH(7))]}>
              <Icon size={rF(10)} color="#828387" />
              <Label style={sf.marS(5)} size={rF(3.5)} color="#3A3B3F">
                {item.name}
              </Label>
            </View>
          </View>
          <View style={[s.row, {flex: 1, justifyContent: 'flex-end'}]}>
            <Button
              style={[sf.padH(20), sf.h(rH(4))]}
              border={theme("point")}
              color={theme("point")}
              background="#fff"
              radius={20}
              text={item.type}
              onPress={() => null}
            />
          </View>
        </View>
        <View style={[]}>
          <View style={[s.row, s.spaceB, s.w100]}>
            <Label style={[]}>{t("discount.percent")} : </Label>
            <Label style={[sf.marS(5)]} color="#3A3B3F">
              {item.percent}
            </Label>
          </View>
          <View style={[s.row, s.spaceB, s.w100]}>
            <Label style={[]}>{t("price")} : </Label>
            <Label style={[sf.marS(5)]} color="#3A3B3F">
              {item.price}
            </Label>
          </View>
          <View style={[s.row, s.spaceB, s.w100]}>
            <Label style={[]}>{t("discount.startDate")} : </Label>
            <Label style={[sf.marS(5)]} color="#3A3B3F">
              {item.startDate}
            </Label>
          </View>
          <View style={[s.row, s.spaceB, s.w100]}>
            <Label style={[]}>{t("discount.endDate")} : </Label>
            <Label style={[sf.marS(5)]} color="#3A3B3F">
              {item.endDate}
            </Label>
          </View>
        </View>
        <View style={[s.row, sf.marV(5), s.c]}>
          <Button
            style={{ width: "48%" }}
            icon="trash-alt"
            border={theme("point")}
            color={theme("point")}
            background="#fff"
            radius={20}
            text={t("discount.deleteDiscount")}
            onPress={() => null}
          />
          <Button
            style={{ width: "48%" }}
            icon="edit"
            border={theme("secColor")}
            radius={20}
            background={theme("secColor")}
            text={t("edit")}
            onPress={() => null}
          />
        </View>
      </View>
    );
  }
  refresh(callBack) {
    this.getData((data)=>{
        callBack(data)
    })
  }
  loadMore(page, callBack) {
    this.getData((data)=>{
        callBack(data)
    },page)
    // callBack(this.state.listItems.slice(10, 20));
  }
  getData(callBack,page = 1){
      let data = {};
      data.token = this.props.user.token;
      data.page = page;
      let api = 'res_discount_'+ this.state.discountType ;
      Fetch(api, data, (data)=>{
        if(data.status == 'success'){
            let temp=[], item;
            for(item of data.data){
              temp.push({
                name: (this.state.discountType == "food") ? item.product_title : item.desk_title,
                remind: item.count + ' از ...',
                type: '...',
                percent: item.percent+' %',
                price: '...',
                startDate: moment.from(item.start_date, 'en').format('YYYY/MM/DD'),
                endDate: moment.from(item.end_date, 'en').format('YYYY/MM/DD'),
                id: item.id,
              });
            }
            this.setState({listItems: temp});
          }
          callBack(this.state.listItems)
       })
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Header title={t("discounts")} left="back" />
        <ListItem
          style={[sf.marH(5), sf.marT(5)]}
          items={listButtons}
          width={rW(30.5)}
          selected="food"
          onChange={this.tabChange}
        />
        <View style={{ flex: 1, marginTop: 5 }}>
          <PageList
            ref = {(ref)=>this.pageList = ref}
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

const style = StyleSheet.create({
  image: {
    backgroundColor: "#eee",
    height: rH(12),
    width: rH(12),
    borderRadius: 8,
    position: "absolute",
    marginTop: -rH(6)
  },
  info: {
    flex: 0.75,
    paddingStart: rW(1)
  }
});
module.exports = connect(state => state)(Screen);
