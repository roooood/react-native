import ImagePicker from "../../../app/imagePicker";
class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      avatar : null
    };
    autoBind(this);
  }

  imageTaked(res){
    var photo = {
      uri: res.path,
      type: 'multipart/form-data',
      name: 'photo.jpg',
    };
    this.setState({
      avatar : res.path ,
      file : photo
    });

  }

  save (loading){

    let msg = [];
    if(this.state.file == null){
      msg.push(t('info.resLogo') + t('form.empty'))
    }
    if(msg.length > 0){
      loading.hide();
      dropdown.alertWithType('warn', '', msg.join('\n'))
      return;
    }

    let data   = {};
    data.token = this.props.user.token;
    data.file  = this.state.file;
    data.multipart = true;
    Fetch('res_logo_upload',data,(res)=>{
        loading.hide();
        if(res.status == 'success'){
          dropdown.alertWithType('success', '', t('successSubmit'))
        }
        else{
          dropdown.alertWithType('error', '', t('errorSubmit'))
        }
    })
  }
  render() {
    return (
      <View style={[s.flex, sf.padB(rH(7))]}>
        <View style={sf.pad(15)}>
          <Label aliCenter style={{ lineHeight: 20 }}>
            {t("info.logoDec")}
          </Label>
          <View style={style.ImagePickerSec}>
            <View style={{ flex: 0.5 }}>
              <Label style={style.ImagePickerView}>{t("info.resLogo")}</Label>
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
              <Button
                text={t("info.delet")}
                color="#3A3B3F"
                padding={rH(0.2)}
                radius={rW(1)}
                width={rW(20)}
                background="white"
                onPress={() => {
                  null
                }}
                style={[
                  { marginHorizontal: 10 },
                  styles.shadow,
                  sf.marTop(10)
                ]}
              />
            </View>
            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={() => {
                this.refs.ImagePicker.show();
              }}>
              <View style={style.ImageHolder} >
                <Image
                  style={[s.wh100,s.cover, {borderRadius: 10}]}
                  source={{uri: (this.state.avatar || this.props.infoProfile.logo)}}
                />
              </View>
              </TouchableOpacity>
            </View>
            <ImagePicker onDone={this.imageTaked} ref="ImagePicker" />
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
          text={t("info.save")}
          onPress={this.save}
        />
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
    borderStyle: "dashed"
  }
});

module.exports = connect(state => state)(Screen);
