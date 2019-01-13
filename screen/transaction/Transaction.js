const { width, height } = Dimensions.get('window');

import Svg from '../../app/Svg';
import ListItem from '../../app/ListItem';
import Chart from './Chart';

const listButtons = {
    all: t('all'),
    food: t('food'),
    table: t('table'),
    event: t('event'),
};

class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersArray: [
                {
                    startDate: '1397/10/05',
                    endDate: '1397/10/12',
                    date: '1397/10/12',
                    ordersNumber: '8',
                    price: C.toMoney('125600') ,
                    id: '10',
                    plus: '12353',
                    image: Images.logo,
                },
                {
                    startDate: '1397/10/05',
                    endDate: '1397/10/12',
                    date: '1397/10/12',
                    ordersNumber: '8',
                    price: C.toMoney('125600') ,
                    id: '10',
                    plus: '12353',
                    image: Images.logo,
                },
            ],
            resType: 'all',
            chartInfo: {
              order: 56,
              price: C.toMoney('10560250'),
            },
        }
        autoBind(this);
    }

    tabChange(key){
        this.setState({resType: key+''})
    }

    renderRow(item, resType){
        return(
          <View style={[styles.card, styles.shadow, style.eachListItem]} >
            <View style={[style.firstColumn, {flex: (resType == 'all') ? 2.5 : 1}]} >
              { (resType == 'all' || resType == 'food') &&
                <Svg.Food size={rF(13)} color="#E74C3C" />
              }
              { (resType == 'all' || resType == 'table') &&
                <Svg.Table size={rF(13)} color="#1BBC9B" />
              }
              { (resType == 'all' || resType == 'event') &&
                <Svg.Event size={rF(13)} color="#3597FF" />
              }
            </View>
            <View style={style.secondColumn} >
              { resType != 'all' &&
                <Label style={style.dateText}>{item.startDate} - {item.endDate}</Label>
              }
              { resType == 'all' &&
                <Label style={style.dateText}>{item.date}</Label>
              }
              <Label style={style.orderText}>{item.ordersNumber} {t('transaction.order')}</Label>
            </View>
            <View style={style.thirdColumn} >
              <View style={{flexDirection: 'row'}} >
                <Label style={style.priceText}>{item.price}</Label>
                <Label style={style.tomanText}>{t('transaction.toman')}</Label>
              </View>
              <Label style={style.plusText}>+{item.plus}</Label>
            </View>
          </View>
        );
    }
    refresh(callBack){
      setTimeout(() => {
          callBack(this.state.ordersArray.slice(0, 10));
      }, 500);
    }
    loadMore(page,callBack){
      callBack(this.state.ordersArray.slice(10, 20));
    }

    render() {
        return (
            <View style={[styles.container,sf.pad(10), {paddingBottom: 0}]}>
                <ListItem items={listButtons} onChange={this.tabChange} width={rW(21)} selected={'all'} />

                  <View style={style.chartHolder}>
                    <View style={style.chartHeader}>
                      <View style={style.chartRightIcons}>
                        { (this.state.resType == 'all' || this.state.resType == 'food') &&
                          <View style={{flexDirection: 'row'}}>
                            <Svg.Food size={rF(10)} color="#E74C3C" />
                            <Label style={[style.chartHeaderTexts, {color: "#E74C3C"}]}>{t('food')}</Label>
                          </View>
                        }
                        { (this.state.resType == 'all' || this.state.resType == 'table') &&
                          <View style={{flexDirection: 'row'}}>
                            <Svg.Table size={rF(10)} color="#1BBC9B" />
                            <Label style={[style.chartHeaderTexts, {color: "#1BBC9B"}]}>{t('table')}</Label>
                          </View>
                        }
                        { (this.state.resType == 'all' || this.state.resType == 'event') &&
                          <View style={{flexDirection: 'row'}}>
                            <Svg.Event size={rF(10)} color="#3597FF" />
                            <Label style={[style.chartHeaderTexts, {color: "#3597FF"}]}>{t('event')}</Label>
                          </View>
                        }
                      </View>
                      <View style={style.chartLeftPart}>
                        <Label style={style.chartLeftHeaderText}>{t('transaction.thousandToman')}</Label>
                      </View>
                    </View>

                    <Chart resType={this.state.resType} />

                    <View style={style.chartFooterHolder}>
                      <View style={style.chartFooterEachSideHolder}>
                        <Label style={style.chartFooterTitleTexts}>{t('transaction.totalOrders')}</Label>
                        <View style={{flexDirection: 'row'}}>
                          <Label style={style.chartFooterNumberTexts} isBold>{this.state.chartInfo.order}</Label>
                          <Label style={style.chartFooterUnitTexts}>{t('transaction.order')}</Label>
                        </View>
                      </View>
                      <View style={style.chartFooterEachSideHolder}>
                        <Label style={style.chartFooterTitleTexts}>{t('transaction.totalIncome')}</Label>
                        <View style={{flexDirection: 'row'}}>
                          <Label style={style.chartFooterNumberTexts} isBold>{this.state.chartInfo.price}</Label>
                          <Label style={style.chartFooterUnitTexts}>{t('transaction.toman')}</Label>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{flex: 1, marginTop: 5}}>
                      <PageList
                          pageLen={10}
                          renderRow={(item, x) => this.renderRow(item, this.state.resType)}
                          refresh={this.refresh}
                          loadMore={this.loadMore}
                      />
                  </View>
            </View>
         );
    }
}

const style = StyleSheet.create({
  chartHolder: {
    marginVertical: 10,
    // marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  eachListItem: {
    paddingVertical: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  firstColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 5,
  },
  secondColumn: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 5,
  },
  thirdColumn: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 2,
  },

  dateText: {
    fontSize: 13,
    color: '#828387',
  },
  orderText: {
    fontSize: 12,
    color: '#82838770',
  },
  priceText: {
    fontSize: 13,
    color: '#828387',
  },
  tomanText: {
    fontSize: 10,
    color: '#828387',
    marginStart: 5,
    marginTop: 2,
  },
  plusText: {
    fontSize: 14,
    color: '#26A65B',
  },

  chartHeader: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  chartRightIcons: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartHeaderTexts: {
    fontSize: 11,
    marginRight: 10,
    marginLeft: 3,
    marginTop: -2,
  },
  chartLeftPart: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartLeftHeaderText: {
    fontSize: 10,
    color: '#828387',
  },
  chartFooterHolder: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  chartFooterEachSideHolder: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  chartFooterTitleTexts: {
    fontSize: 12,
    color: '#3A3B3F',
    textAlign: 'center',
  },
  chartFooterNumberTexts: {
    fontSize: 12,
    color: '#3A3B3F',
    textAlign: 'center',
  },
  chartFooterUnitTexts: {
    fontSize: 10,
    color: '#3A3B3F',
    textAlign: 'center',
    marginStart: 5,
    marginTop: 2,
  },
});
module.exports = connect((state)=>(state))(Screen);
