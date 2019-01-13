import Svg from "../../../app/Svg";
import ImagePicker from "../../../app/imagePicker";
const regex = /(<([^>]+)>)/ig;
import moment from 'jalali-moment';
const { Input, Dropdown,Calender, CheckBox } = Form;

class Screen extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.navigation.getParam('id',0);
    this.state = {
      form: {
        title: "",
        count: "",
        price: "",
        free_entry_fee : 0,
        start_date:'',
        end_date:'',
        description: "",
      },
      event:{
        title: "",
        count: "",
        price: "",
        description: "",
      },
      time:{
        start_hour : '',
        end_hour : '',
        start_minute : '',
        end_minute : '',
      },
      listPackage : [] ,
      EditMode : false,
      packageID : false

    };
    autoBind(this);
    this.inputs = [];
    this.hour = new Array(24).fill(undefined).map((val,i) => {val=(i<9?'0':'')+(i+1); return {name:""+val,id:""+val} });
    this.minute = new Array(4).fill(undefined).map((val,i) => {val= i==0? '00':i*15; return {name:""+val,id:""+val} });
  }

  changeValue(key, value) {
    this.setState(state => {
      state["form"][key] = value;
      return state;
    });
  }
  
  changeEvent(key, value) {
    if(key == 'price' && value.length > 3)
      value = value.replace(',','');
    this.setState(state => {
      state["event"][key] = value;
      return state;
    });
  }
  componentDidMount() {
    if(this.id > 0){
      Fetch('res_event_data',{token:this.props.user.token,id:this.id},(res)=>{
        if(res.status == 'success'){
          let temp = {
            title: res.data.event.title,
            count: res.data.event.count+'',
            price: res.data.event.price+'',
            start_date: moment(res.data.event.start_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD'),
            end_date: moment(res.data.event.end_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD'),
            description: res.data.event.description.replace(regex, ''),
          }
   
          let pkg = [] , item;
          for(item of res.data.package){
            pkg.push({
              title: item.title,
              count: item.count+'',
              price: item.price+'',
              description: item.description.replace(regex, ''),
            })
          }
          
          let stime = res.data.event.start_time.split(':')
          let etime = res.data.event.end_time.split(':')

          this.setState({
            form:temp,
            EditMode:true,
            avatar:res.data.event.file_name ,
            listPackage:pkg,
            time:{
              start_hour : stime[0],
              end_hour : etime[0],
              start_minute : stime[1],
              end_minute : etime[1],
            },
          })
        }else{
          this.props.navigation.goBack();
        }
      });
    }
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  changeTimeValue(key, value) {
    this.setState(state => {
      state.time[key] = value;
      return state;
    });
  }

  imageTaked(res){
    var photo = {
      uri: res.path,
      type: 'multipart/form-data',
      name: 'photo.jpg',
    };
    this.setState({
      avatar : res.path ,
    });

    this.setState(state => {
      state.form['file'] = photo;
      return state;
    });
      
  }

  save(loading){

    let msg = [];
    if(this.state.form.title.length < 3){
      msg.push(t('form.title') + t('form.emptyOrShort'))
    }
    if(this.state.form.count.length < 1){
      msg.push(t('form.capacity') + t('form.empty'))
    }
    if(this.state.listPackage.length == 0 && this.state.form.price.length < 2){
      msg.push(t('form.capacity') + t('form.empty'))
    }


    if(msg.length > 0){
      loading.hide();
      dropdown.alertWithType('warn', '', msg.join('\n'))
      return;
    }

  
    let data   = this.state.form;
    data.token = this.props.user.token;
    data.price =  data.price.length > 3 ? data.price.replace(/,/g,'') : data.price;
  
    if(this.state.listPackage.length == 0){
      data.package = JSON.stringify([{
        title: "ورودی",
        count: "0",
        price: data.price,
        description: "",
      }]);
    }
    else{
      data.package = JSON.stringify(this.state.listPackage);
    }

    data.start_date = moment(data.start_date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
    data.end_date = moment(data.start_date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');

    data.start_time = this.state.time.start_hour +':'+ this.state.time.start_minute + ':00';
    data.end_time = this.state.time.end_hour +':'+ this.state.time.end_minute + ':00';
    data.multipart = true;
    if(this.state.EditMode)
      data.event_id = this.id;

    Fetch('res_event_'+(this.state.EditMode?'edit':'add'),data,(res)=>{p(res)
        loading.hide();
        if(res.status == 'success'){
          dropdown.alertWithType('success', '', this.state.EditMode?t('successEdit'):t('successSubmit'))
        }
        else{
          dropdown.alertWithType('error', '', t('errorSubmit'))
        }
    })
  }
  addPackage(){
    let msg = [];
    if(this.state.event.title.length < 3){
      msg.push(t('form.title') + t('form.emptyOrShort'))
    }
    if(this.state.event.count.length < 1){
      msg.push(t('form.capacity') + t('form.empty'))
    } 
    if(this.state.event.price.length < 1){
      msg.push(t('form.price') + t('form.empty'))
    }

    if(msg.length > 0){
      dropdown.alertWithType('warn', '', msg.join('\n'))
      return;
    }

    if(this.state.packageID === false){
      this.setState({listPackage:[...this.state.listPackage,this.state.event]});
      this.setState({ 
        event:{
          title: "",
          count: "",
          price: "",
          description: "",
        }
      });
    }else{
      let temp = this.state.listPackage;
      temp[this.state.packageID] = this.state.event;
      this.setState({listPackage:temp});
    }
    this.refs.Package.hide();
  }
  editPackage(i){
    let temp = this.state.listPackage[i];
    this.setState({ 
      event:temp ,
      packageID  : i
    });
    this.refs.Package.show();
  }
  delPackage(i){
    let temp = this.state.listPackage;
    temp.splice(i,1);
    this.setState({ 
      listPackage:temp
    });
  }
  renderPackage(){
    return (
      <View style={[s.f]}>
        <View style={[s.flex,sf.marT(10),sf.pad(1),sf.b('#ddd',5)]}>
          <View style={[s.row,s.spaceB,sf.pad(5)]} >
            <Label style={[sf.marT(5)]} isBold>{t('packageList')}</Label>
            <TouchableOpacity style={[sf.bgc('#0E699D'),sf.pad(3,6),s.c,sf.br(8)]} onPress={()=>this.refs.Package.show()} >
              <Awesome5  size={15} color={'#fff'} name='plus' />
            </TouchableOpacity>
          </View>
          <View style={[s.row,s.spaceB,sf.marT(10),sf.bgc('#fff'),sf.padH(5),sf.padV(1)]} >
            <Label align='left' style={{width:'40%'}} >{t('packageName')}</Label>
            <Label align='left' style={{width:'22%'}} >{t('form.capacity')}</Label>
            <Label align='left' style={{width:'22%'}} >{t('form.price')}</Label>
            <Label align='left' style={{width:'15%'}} ></Label>
          </View>
          {
            this.state.listPackage.map((item,i)=>{
                return (
                  <View key={i+""} style={[s.row,s.spaceB,sf.bgc(i%2 == 0?'#f9f9f9':'#fff'),sf.padH(5),sf.padV(1)]} >
                  <Label align='left' style={{width:'30%',marginEnd:'5%'}} numberOfLines={1}  >{item.title}</Label>
                  <Label align='left' style={{width:'22%'}} >{item.count}</Label>
                  <Label align='left' style={{width:'22%'}} >{item.price}</Label>
                  <View style={[s.row,s.justC,sf.marE(10)]}>
                    <TouchableOpacity style={[sf.pad(5),s.c]} onPress={()=>this.editPackage(i)} >
                      <Awesome5  size={15} color={'#0E699D'} name='edit' />
                    </TouchableOpacity>
                    <TouchableOpacity style={[sf.pad(5),s.c]} onPress={()=>this.delPackage(i)} >
                      <Awesome5  size={15} color={'tomato'} name='trash-alt' />
                    </TouchableOpacity>
                  </View>
                </View>
                )
            })
          }
        </View>
        <Modal ref='Package' style={[sf.pad(0),sf.br(8)]}>
            <View style={[styles.card, sf.marTop(10), s.w100,sf.padB(rH(7))]}>
              <Input
                  label={t("form.title")}
                  onChange={val => this.changeEvent("title", val)}
                  value={this.state.event.title}
                  onRef={ref => {
                    this.inputs["xtitle"] = ref;
                  }}
                  onSubmit={() => this.focusNextField("xprice")}
                />
                <View style={[s.row]} >
                  <View style={[sf.marE(10),,{width:'48%'}]}>
                    <Input
                      label={t("form.price")}
                      onChange={val => this.changeEvent("price", val)}
                      value={C.toMoney(this.state.event.price)}
                      onRef={ref => {
                        this.inputs["xprice"] = ref;
                      }}
                      maxLength = {11}
                      type={'numeric'}
                      style={{ paddingEnd: rW(15) }}
                      onSubmit={() => this.focusNextField("xcount")}
                      after={
                        <View
                          style={[
                            sf.br(0, 5, 0, 5),
                            sf.bgc("rgba(112,112,112,.30)"),
                            s.absRight,
                            s.h100,
                            s.center,
                            sf.padH(5)
                          ]}
                        >
                          <Label color="#333333">{t("curreny")}</Label>
                        </View>
                      }
                    />
                  </View>
                  <View style={[{width:'48%'}]}>
                    <Input
                      label={t("form.capacity")}
                      onChange={val => this.changeEvent("count", val)}
                      value={this.state.event.count}
                      onRef={ref => {
                        this.inputs["xcount"] = ref;
                      }}
                      maxLength = {4}
                      type={'numeric'}
                      onSubmit={() => this.focusNextField("xdescription")}
                    />
                  </View>
                </View>
               <Input
                label={t("form.description")}
                onChange={val => this.changeEvent("description", val)}
                value={this.state.event.description}
                onRef={ref => {
                  this.inputs["xdescription"] = ref;
                }}
                textarea={true}
                lines={2}
              />
            </View>
            <Button
              radius={1}
              style={[
                s.absBottom,
                s.w100,
                sf.h(rH(6)),
                sf.mar(0),
                sf.br(0, 0, 8, 8)
              ]}
              text={t(this.state.packageID === false ?"addPackage":"editPackage")}
              onPress={this.addPackage}
          />
        </Modal>
      </View>
    )
  }
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.header} />
        <TouchableOpacity style={[s.absR,sf.wh(40),sf.zx(9999),sf.marT(15),s.c]} activeOpacity={0.9} onPress={()=>{this.props.navigation.goBack();}}>
            <Awesome5  size={20} color={theme('headerColor')} name='chevron-left' />
        </TouchableOpacity>
        <KeyboardAwareScrollView>
          <View style={[sf.pad(10, 20),sf.marB(20), s.aliCenter]}>
            <Svg.Event size={rF(50)} color="#fff" />
            <Label size={rF(12)} isBold color={theme("pointSet")}>
              {t("event")}
            </Label>
            <Label color="rgba(255,255,255,.9)">{t("pleaseFillData")}</Label>
            <View style={[styles.card, sf.marTop(10), s.w100,sf.padB(rH(7))]}>
              <Input
                label={t("form.title")}
                onChange={val => this.changeValue("title", val)}
                value={this.state.form.title}
                onRef={ref => {
                  this.inputs["title"] = ref;
                }}
                onSubmit={() => this.focusNextField("capacity")}
              />
              <Input
                label={t("form.capacity")}
                onChange={val => this.changeValue("count", val)}
                value={this.state.form.count}
                onRef={ref => {
                  this.inputs["capacity"] = ref;
                }}
                maxLength = {4}
                type={'numeric'}
                onSubmit={() => this.focusNextField("price")}
              />
              <View style={[s.row,s.flex]}>
                <View
                  style={{
                    paddingEnd: rW(2),
                    flex: 0.75
                  }}
                >
                  <Input
                    label={t("form.price")}
                    onChange={val => this.changeValue("price", val)}
                    value={C.toMoney(this.state.form.price)}
                    onRef={ref => {
                      this.inputs["price"] = ref;
                    }}
                    editable={this.state.form.free_entry_fee == 0}
                    maxLength = {11}
                    type={'numeric'}
                    style={{ paddingEnd: rW(15) }}
                    after={
                      <View
                        style={[
                          sf.br(0, 5, 0, 5),
                          sf.bgc("#D8D8D8"),
                          s.absRight,
                          s.h100,
                          s.center,
                          sf.padH(5)
                        ]}
                      >
                        <Label color="#333333">{t("curreny")}</Label>
                      </View>
                    }
                  />
                </View>
                <View
                  style={{
                    flex: 0.25,
                    justifyContent: "flex-end"
                  }}
                >
                  <CheckBox
                    label={t("free")}
                    color="#333333" 
                    value = {this.state.form.free_entry_fee}
                    onPress={(val) => {
                      this.changeValue('free_entry_fee',val );
                    }}
                  />
                </View>
              </View>
              {this.renderPackage()}
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View
                  style={{
                    flex: 0.33333,
                    marginHorizontal: 5,
                    justifyContent: "flex-end"
                  }}
                >
                  <Calender
                      label = {t("form.beginDay")}
                      onChange={val => this.changeValue("start_date", val)}
                      value = {this.state.form.start_date}
                  />
                </View>
                <View
                  style={{
                    flex: 0.33333,
                    marginHorizontal: 5,
                    justifyContent: "flex-end"
                  }}
                >
                  <Dropdown
                    onChange={val=>this.changeTimeValue('start_hour',val)}
                    value={this.state.time.start_hour}
                    items={this.hour}
                    label={t('fromHour')}
                  />
                </View>
                <View
                  style={{
                    flex: 0.33333,
                    marginHorizontal: 5,
                    justifyContent: "flex-end"
                  }}
                >
                  <Dropdown
                    onChange={val=>this.changeTimeValue('start_minute',val)}
                    value={this.state.time.start_minute}
                    items={this.minute}
                    label= {t('minute')}
                  />
                </View>
              </View>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View
                  style={{
                    flex: 0.33333,
                    marginHorizontal: 5,
                    justifyContent: "flex-end"
                  }}
                >
                  <Calender
                      label = {t("form.endDay")}
                      onChange={val => this.changeValue("end_date", val)}
                      value = {this.state.form.end_date}
                  />
                </View>
                <View
                  style={{
                    flex: 0.33333,
                    marginHorizontal: 5,
                    justifyContent: "flex-end"
                  }}
                >
                  <Dropdown
                    onChange={val=>this.changeTimeValue('end_hour',val)}
                    value={this.state.time.end_hour}
                    items={this.hour}
                    label={t('toHour')}
                  />
                </View>
                <View
                  style={{
                    flex: 0.33333,
                    marginHorizontal: 5,
                    justifyContent: "flex-end"
                  }}
                >
                  <Dropdown
                    onChange={val=>this.changeTimeValue('end_minute',val)}
                    value = {this.state.time.end_minute}
                    items={this.minute}
                    label= {t('minute')}
                  />
                </View>
              </View>
              <Input
                label={t("form.description")}
                onChange={val => this.changeValue("description", val)}
                value={this.state.form.description}
                onRef={ref => {
                  this.inputs["description"] = ref;
                }}
                textarea={true}
                lines={2}
              />
              <View style={style.ImagePickerSec}>
                <View style={{ flex: 0.5 }}>
                  <Label style={style.ImagePickerView}>{t('form.productImg')}</Label>
                  <Label size={10} style={style.ImagePickerView}>{t('form.maxImgSize')} 500kb</Label>
                  <Button
                    text={t('pick')}
                    padding={rH(0.2)}
                    radius={rW(1)}
                    width={rW(20)}
                    background="#0E699D"
                    onPress={() => {
                      this.refs.ImagePicker.show();
                    }}
                    style={[
                      { marginHorizontal: 10 },
                      styles.shadow,
                      sf.marTop(20)
                    ]}
                  />
                </View>
                <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                  <TouchableOpacity onPress={() => {
                      this.refs.ImagePicker.show();
                    }}>
                  <View style={style.ImageHolder} >
                    <Image
                      style={[s.wh100,s.cover]}
                      source={{uri:this.state.avatar}}
                    />
                  </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Button
              radius={1}
              style={[
                s.absBottom,
                s.w100,
                sf.h(rH(6)),
                sf.mar(0),
                sf.br(0, 0, 8, 8)
              ]}
              text={this.state.EditMode ? t("edit"): t("add")}
              onPress={this.save}
            />
          </View>
        </KeyboardAwareScrollView>
        <ImagePicker onDone={this.imageTaked} ref="ImagePicker" />
      </View>
    );
  }
}

var style = StyleSheet.create({
  ImagePickerSec: {
    flexDirection: "row",
    marginVertical: rH(2)
  },
  ImagePickerView: {
    textAlign: "left",
    paddingHorizontal: rW(4)
  },
  ImageHolder: {
    backgroundColor: "#EAEAEA",
    borderRadius: 10,
    marginHorizontal: rW(3),
    height: rW(30),
    width: rW(30),
    borderWidth: 1,
    borderColor: "#ACACAC",
    borderStyle: "dashed",
    overflow: 'hidden',
    padding:1,
  },
});

module.exports = connect(state => state)(Screen);
