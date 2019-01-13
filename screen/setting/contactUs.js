
const { width, height } = Dimensions.get('window');
const { Input } = Form;
class Screen extends Component {
    constructor(props){
      super(props);
      this.state = {
       contentText: '',
       contactInfoArray: {},

       nameText: '',
       emailText: '',
       websiteText: '',
       messageText: '',

       display: true,
      }
      autoBind(this);
      this.inputs = {};
    }
    focusNextField(id) {
      this.inputs[id].focus();
    }
    changeValue(key, value) {
      this.setState(state => {
        state[key] = value;
        return state;
      });
    }
    componentDidMount() {
      Fetch('contact_us_info',(data)=>{
        if(data.status == 'success'){
          this.setState({contactInfoArray:data.data})
        }
      });
    }

    componentWillMount () {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount () {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow () {
      this.setState({display: false})
    }
    _keyboardDidHide () {
      this.setState({display: true})
    }

    onPressSend(loading) {
      let msg = [];
      if(this.state.nameText.length == 0){
        msg.push('لطفا نام خود را وارد نمایید')
      } else if(this.state.nameText.length < 3){
        msg.push('نام نباید کمتر از 3 حرف باشد')
      }
      if(this.state.emailText.length == 0){
        msg.push('لطفا ایمیل خود را وارد نمایید')
      } else if(!Validate.email(this.state.emailText)){
        msg.push('لطفا ایمیل را به درستی وارد نمایید')
      }
      if(this.state.messageText.length == 0){
        msg.push('لطفا پیام خود را وارد نمایید')
      } else if(this.state.messageText.length < 5){
        msg.push('پیام شما نباید کمتر از 5 حرف باشد')
      }

      if(msg.length > 0){
        loading.hide();
        dropdown.alertWithType('warn', '', msg.join('\n'))
        return;
      }
      let data = 
      {
        name: this.state.nameText,
        email: this.state.emailText,
        message: this.state.messageText,
        website: this.state.websiteText,
      };
      Fetch('contact_us_send',data,(res)=>{
        loading.hide();
        if(res.status == 'success') {
          dropdown.alertWithType('success', '', 'با تشکر پیام شما با موفقیت ارسال شد')
        } else {
          dropdown.alertWithType('error', '', 'مشکلی در ارسال پیام بوجود امده ، لطفا بعدا امتحان کنید')
        }
      })
    }

    render() {
      const center = <Label color='#fff' >تماس با ما</Label>;
      return (
        <View style={styles.container}>
          <Header center={center} right={null} left='back' />
          {
            this.state.display &&
            <View style={styles.over}>
               <Image style={styles.img} source={Images.aboutLogo} />
               {/*
                 <View style={styles.contactInfoHolder}>
                   <View style={styles.addressHolder}>
                      <Icon name='map-marker-alt' size={13} color='#fff' />
                      <Label style={styles.contactInfoText}>
                        آدرس: {this.state.contactInfoArray.address}
                      </Label>
                   </View>

                   <View style={{flexDirection:'row'}}>
                     <View style={styles.phoneHolder}>
                        <Icon name='phone' size={13} color='#fff' />
                        <Label style={styles.contactInfoText}>
                          تلفن: {this.state.contactInfoArray.phone}
                        </Label>
                     </View>
                     <View style={styles.faxHolder}>
                        <Icon name='fax' size={13} color='#fff' />
                        <Label style={styles.contactInfoText}>
                          فکس: {this.state.contactInfoArray.fax}
                        </Label>
                     </View>
                   </View>
                 </View>
               */}
            </View>
          }

          <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.formContainer}>
            <Label style={styles.contentTitleText}>
              کارشناسان ما منتظر پاسخگویی به شما هستند.
            </Label>
              <Input
                label={'نام و نام خانوادگی'}
                onChange={val => this.changeValue("nameText", val)}
                value={this.state.nameText}
                onRef={ref => {
                  this.inputs["nameText"] = ref;
                }}
                onSubmit={() => this.focusNextField("emailText")}
              />
              <Input
                label={'پست الکترونیکی'}
                onChange={val => this.changeValue("emailText", val)}
                value={this.state.emailText}
                onRef={ref => {
                  this.inputs["emailText"] = ref;
                }}
                onSubmit={() => this.focusNextField("websiteText")}
              />
              <Input
                label={'وب سایت'}
                onChange={val => this.changeValue("websiteText", val)}
                value={this.state.websiteText}
                onRef={ref => {
                  this.inputs["websiteText"] = ref;
                }}
                onSubmit={() => this.focusNextField("messageText")}
              />
              <Input
                label={'متن پیام'}
                onChange={val => this.changeValue("messageText", val)}
                value={this.state.messageText}
                onRef={ref => {
                  this.inputs["messageText"] = ref;
                }}
                textarea={true}
                lines={2}
              />
          </View>
          </ScrollView>
          <Button
              radius={1}
              style={[
                s.absBottom,
                s.w100,
                sf.h(rH(6)),
                sf.mar(0),
                sf.br(0)
              ]}
              text={'ارسال پیام'}
              onPress={this.onPressSend}
            />
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex: 1 ,
      backgroundColor:'#F6F7F9',
    },
    over:{
      zIndex: -1,
      marginTop:-DeviceWidth/1.5,
      height:DeviceWidth,
      backgroundColor: theme('header'),
      width:DeviceWidth,
      borderRadius:DeviceWidth/2,
      transform: [
        {scaleX:1.5}
      ],
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    img:{
      height:rH(12),
      resizeMode:'contain',
      transform: [
        {scaleX:.6}
      ],
      marginBottom: rH(3)
    },
    contactInfoHolder:{
      width: '100%',
      height:rH(10),
      resizeMode:'contain',
      transform: [
        {scaleX:.6}
      ],
      marginBottom: rH(6),
    },
    addressHolder: {
      height:rH(5),
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    phoneHolder: {
      flex: 1,
      height:rH(5),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    faxHolder: {
      flex: 1,
      height:rH(5),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    contactInfoText: {
      textAlign: 'left',
      fontSize: 14,
      color: '#fff',
      marginStart: 5,
    },

    scrollViewContainer: {
      flex: 1,
      marginTop: -50,
      zIndex: -2,
    },
    formContainer: {
      width: width-30,
      alignSelf: 'center',
      // marginTop: -50,
      // paddingTop: 60,
      backgroundColor: '#fff',
      // zIndex: -2,
      // elevation: 2,
      borderWidth: 1,
      borderColor: '#ddd',
      marginBottom: height/14+15,
      padding: 10,
    },
    contentTitleText: {
      textAlign: 'center',
      fontSize: 14,
      color: '#333',
      marginBottom: 10,
      marginTop: 60,
    },
    eachTitleText: {
      fontSize: 13,
      color: '#8C8586',
      textAlign: 'left',
    },
    textBoxHolder: {
      width: '100%',
      backgroundColor: '#EEF0F3',
      marginTop: 2,
      marginBottom: 10,
    },
    textBoxText: {
      fontSize: 12,
      height: rH(4.5),
      color: '#302c31',
      padding: 0,
      borderWidth: 1,
      borderColor: '#80808020',
      borderRadius: 3,

      paddingLeft: 10,
      paddingRight: 10,
    },
    textArea: {
      fontSize: 12,
      height: rH(10),
      color: '#302c31',
      padding: 0,
      borderWidth: 1,
      borderColor: '#80808020',
      borderRadius: 3,

      width: '100%',
      backgroundColor: '#EEF0F3',
      marginTop: 2,
      marginBottom: 10,

      paddingLeft: 10,
      paddingRight: 10,

      textAlignVertical: 'top',
    },

    finalButtonHolder: {
      width: '100%',
      height: height/14,
      backgroundColor: '#BC0F10',
      position: 'absolute',
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    finalButtonText: {
      textAlign: 'center',
      fontSize: 15,
      color: '#fff',
    },
});

  module.exports = Screen;
