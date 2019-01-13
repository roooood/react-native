import ListItem from '../../app/ListItem';
import moment from 'jalali-moment';
const { Input, Dropdown, Calender } = Form;

const listButtons = {
    h: t('discount.hourly') ,
    l: t('discount.lastmoment'),
    a: t('discount.allDay'),
    f: t('discount.fromTo'),
};

class Screen extends Component {
    constructor(props) {
        super(props);
        // moment.locale('fa');
        this.name = this.props.navigation.getParam('name');
        this.id = this.props.navigation.getParam('id');
        this.discountType = this.props.navigation.getParam('discountType');
        this.image = this.props.navigation.getParam('image');
        this.state = {
            tab : '',
            form : {
                percent : null ,
                count:'',
                startDate:'',
                endDate:'',
                fromHour : '',
                fromMinute : '',
                toHour : '',
                toMinute : '',
            }
        }

        this.inputs = [];
        this.itemHour = new Array(24).fill(undefined).map((val,i) => {val=i+1; return {name:""+val, id:""+val} });
        this.itemMinute = new Array(4).fill(undefined).map((val,i) => {val=i*15; return {name:""+val,id:""+val} });
        autoBind(this);
    }
    componentDidMount() {

    }
    tabChange(tab){
        this.setState({tab: tab})
    }
    focusNextField(id) {
        this.inputs[id].focus();
    }
    changeValue(key, value) {
        if(typeof value == 'object'){
            value = value[0];
        }
        this.setState(state => {
            state.form[key] = value
            return state;
        });
    }

    save() {
      let api = 'res_add_discount_' + this.discountType;
      let input = {};
      input.token = this.props.user.token;
      input.food_id = this.id;
      input.percent = this.state.form["percent"];
      input.count = this.state.form["count"];

      if(this.state.tab == 'h'){
        input.type = 4;
        input.start_date = moment(this.state.form["startDate"], 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        input.end_date = moment(this.state.form["endDate"], 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        input.start_hour = this.state.form["fromHour"];
        input.start_min = this.state.form["fromMinute"];
        input.end_hour = this.state.form["toHour"];
        input.end_min = this.state.form["toMinute"];
      }
      else if(this.state.tab == 'l'){
        input.type = 1;
        input.start_date = '';
        input.end_date = '';
        input.start_hour = '';
        input.start_min = '';
        input.end_hour = this.state.form["toHour"];
        input.end_min = this.state.form["toMinute"];
      }
      else if(this.state.tab == 'a'){
        input.type = 2;
        input.start_date = moment(this.state.form["startDate"], 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        input.end_date = '';
        input.start_hour = '';
        input.start_min = '';
        input.end_hour = '';
        input.end_min = '';
      }
      else if(this.state.tab == 'f'){
        input.type = 3;
        input.start_date = moment(this.state.form["startDate"], 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        input.end_date = moment(this.state.form["endDate"], 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        input.start_hour = '';
        input.start_min = '';
        input.end_hour = '';
        input.end_min = '';
      }
      // p(input)

      Fetch(api, input, (res)=>{
        if(res.status == 'success') {
          dropdown.alertWithType('success', '', t('product.successSave'))
        } else {
          dropdown.alertWithType('error', '', t('product.errorSave'))
        }
      })
    }

    render() {

        return (
            <View style={styles.container}>
                <TouchableOpacity style={[s.absR,sf.wh(40),sf.zx(9999),sf.marT(15),s.c]} activeOpacity={0.9} onPress={()=>{this.props.navigation.goBack();}}>
                    <Awesome5  size={20} color={theme('headerColor')} name='chevron-left' />
                </TouchableOpacity>
                <View style={styles.header} />
                <KeyboardAwareScrollView>
                <View style={[sf.pad(10, 20), s.aliCenter]}>
                    <View style={[sf.wh(50),sf.bgc('rgba(0,0,0,.3)'),sf.br(25)]} >
                      <Image
                        resizeMode="cover"
                        source={{uri: this.image}}
                        style={{width: '100%', height: '100%', borderRadius: 25}}
                        />
                    </View>
                    <View style={[s.row,s.c]} >
                        <Label size={rF(5)} color={theme("pointSet")}>{t("discount.discountTo")}</Label>
                        <Label style={sf.marS(5)} isBold size={rF(7)} color={theme("pointSet")}>{this.name}</Label>
                    </View>
                    <Label size={rF(5)} color="rgba(255,255,255,.9)">{t("pleaseFillData")}</Label>
                    <View style={[styles.card, styles.shadow, sf.marTop(10), s.w100,sf.pad(0),sf.padB(rH(6.5)),{minHeight:rH(50)}]}>
                        <View style={sf.pad(10)} >
                            <Label size={rF(5)} >{t("discount.selectDiscountType")}</Label>
                            <ListItem items={listButtons} onChange={this.tabChange} width={rW(18.5)} radius={5} />
                            {['h','l','a','f'].includes(this.state.tab) &&
                            <Input
                                label={t("discount.percent")}
                                onChange={val => this.changeValue("percent", val)}
                                value={this.state.form.percent}
                                onRef={ref => {this.inputs["percent"] = ref;}}
                                onSubmit={() => this.focusNextField("count")}
                                style={{ paddingEnd: rW(15) }}
                                type = 'phone-pad'
                                maxLength = {3}
                                after={
                                <View
                                    style={[
                                    sf.br(0, 5, 0, 5),
                                    sf.bgc("rgba(112,112,112,.30)"),
                                    s.absRight,
                                    s.h100,
                                    s.center,
                                    sf.padH(15)
                                    ]}
                                >
                                    <Awesome5 name='percent' size={rF(5)} color='#333' />
                                </View>
                                }
                            />
                            }{['h','l','a','f'].includes(this.state.tab) &&
                            <Input
                                label={t("discount.discountCount")}
                                onChange={val => this.changeValue("count", val)}
                                maxLength = {3}
                                value={this.state.form.count}
                                onRef={ref => {this.inputs["count"] = ref;}}
                                onSubmit={() => null}
                                style={{ paddingEnd: rW(15) }}
                                type = 'phone-pad'
                                after={
                                <View
                                    style={[
                                    sf.br(0, 5, 0, 5),
                                    sf.bgc("rgba(112,112,112,.30)"),
                                    s.absRight,
                                    s.h100,
                                    s.center,
                                    sf.padH(11)
                                    ]}
                                >
                                    <Label color='#333'>{t('discount.number')}</Label>
                                </View>
                                }
                            />
                            }{['h'].includes(this.state.tab) &&
                            <View style={s.row}>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Calender
                                        label = {t("form.beginDay")}
                                        onChange={val => this.changeValue("startDate", val)}
                                        value = {this.state.form.startDate}
                                    />
                                </View>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Dropdown
                                        onChange={val => this.changeValue("fromHour", val)}
                                        value={this.state.form.fromHour}
                                        items={this.itemHour}
                                        label= {t('discount.formHour')}
                                    />
                                </View>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Dropdown
                                        onChange={val => this.changeValue("fromMinute", val)}
                                        value={this.state.form.fromMinute}
                                        items={this.itemMinute}
                                        label={t('discount.minute')}
                                    />
                                </View>
                            </View>
                            }{['h'].includes(this.state.tab) &&
                            <View style={s.row}>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Calender
                                        label = {t("form.endDay")}
                                        onChange={val => this.changeValue("endDate", val)}
                                        value = {this.state.form.endDate}
                                    />
                                </View>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Dropdown
                                        onChange={val => this.changeValue("toHour", val)}
                                        value={this.state.form.toHour}
                                        items={this.itemHour}
                                        label= {t('discount.toHour')}
                                    />
                                </View>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Dropdown
                                        onChange={val => this.changeValue("toMinute", val)}
                                        value={this.state.form.toMinute}
                                        items={this.itemMinute}
                                        label={t('discount.minute')}
                                    />
                                </View>
                            </View>
                            }{['l'].includes(this.state.tab) &&
                            <View style={s.row}>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Dropdown
                                        onChange={val => this.changeValue("toHour", val)}
                                        value={this.state.form.toHour}
                                        items={this.itemHour}
                                        label= {t('discount.toHour')}
                                    />
                                </View>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Dropdown
                                        onChange={val => this.changeValue("toMinute", val)}
                                        value={this.state.form.toMinute}
                                        items={this.itemMinute}
                                        label={t('discount.minute')}
                                    />
                                </View>
                            </View>
                            }{['a'].includes(this.state.tab) &&
                            <Calender
                                label = {t("form.date")}
                                onChange={val => this.changeValue("startDate", val)}
                                value = {this.state.form.startDate}
                            />
                            }{['f'].includes(this.state.tab) &&
                            <View style={s.row}>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Calender
                                        label = {t("form.beginDay")}
                                        onChange={val => this.changeValue("startDate", val)}
                                        value = {this.state.form.startDate}
                                    />
                                </View>
                                <View style={[s.flex,sf.marH(5)]} >
                                    <Calender
                                        label = {t("form.endDay")}
                                        onChange={val => this.changeValue("endDate", val)}
                                        value = {this.state.form.endDate}
                                    />
                                </View>
                            </View>
                            }
                        </View>
                        <Button radius={1} style={[s.absBottom,s.w100,sf.h(rH(6)),sf.mar(0),sf.br(0,0,8,8)]} text={t('discount.saveDiscount')}  onPress={() => this.save()}  />
                    </View>
                </View>
                </KeyboardAwareScrollView>
            </View>
         );
    }
}

module.exports = connect((state)=>(state))(Screen);
