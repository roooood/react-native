import Svg from "../../../app/Svg";
import ImagePicker from "../../../app/imagePicker";
const regex = /(<([^>]+)>)/ig;
const { Input, Dropdown } = Form;

class Screen extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.navigation.getParam('id',0);
    this.state = {
      form: {
        title: "",
        price: "",
        product_cat: "",
        description: "",
      },
      EditMode : false,
      avatar : null,
      cats : [],
    };
    this.inputs = [];
    autoBind(this);
  }

  componentDidMount() {
    if(this.id > 0){
      Fetch('res_food_data',{token:this.props.user.token,id:this.id},(res)=>{
        if(res.status == 'success'){
          let temp = {
            title: res.data.title,
            price: res.data.price+'',
            product_cat: res.data.cat_id+'',
            description: res.data.description.replace(regex, ''),
          }
            this.setState({
              form:temp,
              EditMode:true,
              avatar:res.data.file_name
            })
        }else{
          this.props.navigation.goBack();
        }
      });
    }
    Fetch('res_cats',{token:this.props.user.token},(res)=>{
      if(res.status == 'success'){
          let tmp=[] , i ;
          for(i of res.data)
            tmp.push({
              id : i.id +'',
              name : i.title,
            })
          this.setState({cats:tmp})
      }
      else{
          
      }
    })
  }
  focusNextField(id) {
    this.inputs[id].focus();
  }
  changeValue(key, value) {
    if (typeof value == "object") {
      value = value[0];
    }
    this.setState(state => {
      state.form[key] = value;
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
    if(this.state.form.price.length < 1){
      msg.push(t('form.price') + t('form.empty'))
    }
    if(this.state.form.product_cat == ''){
      msg.push(t('category.title') + t('form.notSelected'))
    }

    if(msg.length > 0){
      loading.hide();
      dropdown.alertWithType('warn', '', msg.join('\n'))
      return;
    }

    let data   = this.state.form;
    data.token = this.props.user.token;
    
    data.price = data.price.replace(/,/g,'');
    data.multipart = true;
    if(this.state.EditMode)
      data.food_id = this.id;
    Fetch('res_food_'+(this.state.EditMode?'edit':'add'),data,(res)=>{
        loading.hide();
        if(res.status == 'success'){
          dropdown.alertWithType('success', '', this.state.EditMode?t('successEdit'):t('successSubmit'))
        }
        else{
          dropdown.alertWithType('error', '', t('errorSubmit'))
        }
    })
  }
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.header} />
        <TouchableOpacity style={[s.absR,sf.wh(40),sf.zx(9999),sf.marT(15),s.c]}activeOpacity={0.9} onPress={()=>{this.props.navigation.goBack();}}>
            <Awesome5  size={20} color={theme('headerColor')} name='chevron-left' />
        </TouchableOpacity>
        <KeyboardAwareScrollView>
          <View style={[sf.pad(10, 20),sf.marB(20), s.aliCenter]}>
            <Svg.Food size={rF(50)} color="#fff" />
            <Label size={rF(12)} isBold color={theme("pointSet")}>
              {t("food")}
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
                onSubmit={() => this.focusNextField("price")}
              />
              <Input
                label={t("form.price")}
                onChange={val => this.changeValue("price", val)}
                value={C.toMoney(this.state.form.price)}
                onRef={ref => {
                  this.inputs["price"] = ref;
                }}
                maxLength = {11}
                type={'numeric'}
                style={{ paddingEnd: rW(15) }}
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
              <View>
                <Dropdown
                  label={t("category.title")}
                  items={this.state.cats}
                  onChange={val => this.changeValue("product_cat", val)}
                  value={this.state.form.product_cat}
                />
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
  }
});

module.exports = connect(state => state)(Screen);
