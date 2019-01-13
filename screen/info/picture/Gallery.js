const { width, height } = Dimensions.get('window');
import ImagePicker from "../../../app/imagePicker";

class Screen extends Component {
  constructor(props) {
    super(props);
    this.actionId = 0;
    this.state = {
      imagesArray: [
        // {
        //   image: 'http://192.168.5.107:9090/offfood_new/public/images/business/1/gallery/55d6c8d1fb5ce89279679c689e4a03a103808ae9.jpg',
        //   id: 1,
        // },
      ],
      arrayIsFilled: false,

      file: null,
      avatar : null
    };
    autoBind(this);
  }

  componentDidMount() {
    this.imageList();
  }

  imageList() {
    Fetch('res_gallery_list',{token: this.props.user.token},(res)=>{
      if(res.status == 'success'){
        this.setState({arrayIsFilled: true})
        let temp=[], item;
        for(item of res.data){
          temp.push({
            image: item.file_name,
            id: item.id,
          })
        }
        this.setState({imagesArray: temp})
      } else {
        alert ('مشکلی در نمایش تصاویر به وجود آمده است')
      }
    })
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
    }, ()=>{
      this.save();
    });
  }

  save() {
    let data   = {};
    data.token = this.props.user.token;
    data.file  = this.state.file;
    data.multipart = true;
    Fetch('res_gallery_upload',data,(res)=>{
      if(res.status == 'success'){
        this.imageList();
        dropdown.alertWithType('success', '', t('info.successUploadGallery'))
      }
      else{
        dropdown.alertWithType('error', '', t('info.errorUploadGallery'))
      }
    })

  }

  showAction(id) {
    this.actionId = id;
    this.imgAction.show()
  }
  deleteImg(){
    let temp = this.state.imagesArray;
    let find = -1;
    for(let i=0;i<temp.length;i++){
      if(temp[i].id == this.actionId){
          find = i;
          break;
      }
    }
    if(find>-1){
      temp.splice(find,1);
      this.setState({imagesArray:temp})
    }
  }
  onImagePress(index) {
    if(index == 1){
      // cover
      let data   = {};
      data.token = this.props.user.token;
      data.gallery_id = this.actionId;
      Fetch('res_change_cover',data,(res)=>{
        if(res.status == 'success'){
            dropdown.alertWithType('success', '', 'انتخاب کاور با موفقیت انجام شد')
        }
        else{
          dropdown.alertWithType('error', '', 'انتخاب کاور با خطا مواجه شده است')
        }
      })
    }
    else if(index == 2){
      // delete
      let data   = {};
      data.token = this.props.user.token;
      data.gallery_id = this.actionId;
      Fetch('res_gallery_del',data,(res)=>{
        if(res.status == 'success'){
            this.deleteImg();
        }
        else{
          dropdown.alertWithType('error', '', 'حذف تصویر با خطا مواجه شده است')
        }
      })
    }
  }

  render() {
    return (
      <View style={s.flex}>
          <ScrollView style={style.scrollHolder}>
            {
              (this.state.arrayIsFilled == false)
              ? <ActivityIndicator size="small" color='red' style={{marginTop:20}}/>
              : <View style={style.insideContainer}>
                  {this.state.imagesArray.map((data, index) => {
                      return (
                        <TouchableOpacity key={index} style={style.eachItemHolder} onPress={() => {this.showAction(data.id)}}>
                          <Image
                            resizeMode="cover"
                            source={{uri:data.image}}
                            style={style.galleryImage}
                          />
                        </TouchableOpacity>
                      )
                  })}

                  <TouchableOpacity style={style.addHolder} onPress={() => {this.refs.ImagePicker.show()}}>
                    <Awesome5
                      style={style.icon}
                      name="plus"
                      size={rF(30)}
                      color="#bbb"
                    />
                  </TouchableOpacity>
                </View>
             }
          </ScrollView>
          <ImagePicker width={400} height={400} onDone={this.imageTaked} ref="ImagePicker" />
          <ActionSheet
            ref={(ref)=>this.imgAction = ref}
            title={null}
            options={[<Label color='tomato'>{t("return")}</Label>, t("info.selectAsCover"), t("delete")]}
            cancelButtonIndex={0}
            styles = {{buttonText:{fontFamily:fontFamily,fontSize:dF}}}
            onPress={(index) => { this.onImagePress(index) }}
          />
      </View>
    );
  }
}

var style = StyleSheet.create({
  ImagePickerSec: {
    marginVertical: rH(2)
  },

  scrollHolder: {
    flex: 1,
    // backgroundColor: '#eee',
  },
  insideContainer: {
    paddingLeft: 10,
    paddingTop: 10,
    // paddingRight: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eachItemHolder: {
    width: width/3-20,
    height: width/3-20,
    backgroundColor: '#EAEAEA',
    marginRight: 5,
    marginBottom: 5,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  addHolder: {
    width: width/3-20,
    height: width/3-20,
    backgroundColor: '#EAEAEA',
    marginRight: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
module.exports = connect(state => state)(Screen);
