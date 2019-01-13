import ImagePicker from "../../../app/imagePicker";

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [null,null,null],
      avatar : [null,null,null]
    };
    autoBind(this);
  }

  componentDidMount() {
    let data   = {};
    data.token = this.props.user.token;
    Fetch('res_slider',data,(res)=>{
        if(res.status == 'success'){
          let temp = [];
          for (var i = 0; i < res.data.length; i++) {
            temp[i] = res.data[i].file_name;
          }
          this.setState({avatar: temp}, ()=>{
            // p(this.state.file)
          })
        }
        else{
          dropdown.alertWithType('error', '', t('info.sliderFetchError'))
        }
    })
  }

  imageTaked(res,id){
    var photo = {
      uri: res.path,
      type: 'multipart/form-data',
      name: 'photo.jpg',
    };
    let temp = this.state.avatar;
    let fileTemp = this.state.file;
    temp[id] = res.path;
    fileTemp[id] = photo;
    this.setState({
      avatar : temp ,
      file : fileTemp
    });
  }

  save() {
    for (var i = 0; i < 3; i++) {
      let data   = {};
      data.token = this.props.user.token;
      data.file  = this.state.file[i];
      if(data.file == null)
      continue;
      data.multipart = true;
      Fetch('res_slider_upload',data,(res)=>{ p(res)
          if(res.status == 'success'){
            dropdown.alertWithType('success', '', t('successSubmit'))
          }
          else{
            dropdown.alertWithType('error', '', t('errorSubmit'))
          }
      })
    }
  }

  render() {
    return (
      <ScrollView style={[s.flex, sf.padB(rH(7))]}>
        <View style={[sf.pad(15), sf.padB(50)]}>
          <Label aliCenter style={{ lineHeight: 20 }}>
            {t("info.galleryDec")}
          </Label>
          <View style={style.ImagePickerSec}>
            <View style={{ flex: 0.5 }}>
              <Label style={style.ImagePickerView}>{t("info.pic1")}</Label>
              <Label size={10} style={style.ImagePickerView}>{t('form.maxImgSize')} 500kb</Label>
              <Button
                text={t('pick')}
                padding={rH(0.2)}
                radius={rW(1)}
                width={rW(20)}
                background="#0E699D"
                onPress={() => {
                  this.refs.ImagePicker1.show();
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
                this.refs.ImagePicker1.show();
              }}>
              <View style={style.ImageHolder} >
                <Image
                  style={[s.wh100,s.cover, {borderRadius: 10}]}
                  source={{uri: (this.state.avatar[0] || null)}}
                />
              </View>
              </TouchableOpacity>
            </View>
            <ImagePicker width={800} height={400} onDone={(res)=>this.imageTaked(res,0)} ref="ImagePicker1" />
          </View>
          <View style={style.ImagePickerSec}>
            <View style={{ flex: 0.5 }}>
              <Label style={style.ImagePickerView}>{t("info.pic2")}</Label>
              <Label size={10} style={style.ImagePickerView}>{t('form.maxImgSize')} 500kb</Label>
              <Button
                text={t('pick')}
                padding={rH(0.2)}
                radius={rW(1)}
                width={rW(20)}
                background="#0E699D"
                onPress={() => {
                  this.refs.ImagePicker2.show();
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
                this.refs.ImagePicker2.show();
              }}>
              <View style={style.ImageHolder} >
                <Image
                  style={[s.wh100,s.cover, {borderRadius: 10}]}
                  source={{uri: (this.state.avatar[1] || null)}}
                />
              </View>
              </TouchableOpacity>
            </View>
            <ImagePicker width={800} height={400} onDone={(res)=>this.imageTaked(res,1)} ref="ImagePicker2" />
          </View>
          <View style={style.ImagePickerSec}>
            <View style={{ flex: 0.5 }}>
              <Label style={style.ImagePickerView}>{t("info.pic3")}</Label>
              <Label size={10} style={style.ImagePickerView}>{t('form.maxImgSize')} 500kb</Label>
              <Button
                text={t('pick')}
                padding={rH(0.2)}
                radius={rW(1)}
                width={rW(20)}
                background="#0E699D"
                onPress={() => {
                  this.refs.ImagePicker3.show();
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
            <ImagePicker width={800} height={400} onDone={(res)=>this.imageTaked(res,2)} ref="ImagePicker3" />
            <View style={{ flex: 0.5, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={() => {
                this.refs.ImagePicker3.show();
              }}>
              <View style={style.ImageHolder} >
                <Image
                  style={[s.wh100,s.cover, {borderRadius: 10}]}
                  source={{uri: (this.state.avatar[2] || null)}}
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
            sf.marT(30),
            sf.br(0, 0, 8, 8)
          ]}
          text={t("info.save")}
          onPress={this.save}
        />
      </ScrollView>
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
    width: rW(50),
    borderWidth: 1,
    borderColor: "#ACACAC",
    borderStyle: "dashed"
  }
});
module.exports = connect(state => state)(Screen);
