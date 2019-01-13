const { Input } = Form;
class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPass: '',
      newPass: '',
      repeatNewPass: '',
    };
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
  onPressSend(loading) {
    let msg = [];
    if(this.state.currentPass.length == 0){
    msg.push('رمز عبور فعلی را وارد نمایید')
    }
    if(this.state.newPass.length == 0){
    msg.push('رمز عبور جدید را وارد نمایید')
    }
    if(this.state.repeatNewPass.length == 0){
    msg.push('تکرار رمز عبور جدید را وارد نمایید')
    }

    if(msg.length > 0){
        loading.hide();
        dropdown.alertWithType('warn', '', msg.join('\n'))
        return;
    }
    let data =  
    {
        token: this.props.user.token,
        password: this.state.currentPass,
        newpassword: this.state.newPass,
        newpassword2: this.state.repeatNewPass,
    }
    Fetch('change_password',data,(res)=>{
        loading.hide();
        if(res.status == 'success') {
          dropdown.alertWithType('success', '', 'رمز عبور با موفقیت تغییر کرد')
          this.setState({
            currentPass: '',
            newPass: '',
            repeatNewPass: '',
          })
        }else if (res.message == 'رمز عبور فعلی نا معتبر است') {
            dropdown.alertWithType('error', '', res.message)
        }
         else {
          dropdown.alertWithType('error', '', 'مشکلی در ارسال پیام بوجود امده ، لطفا بعدا امتحان کنید')
        }
    })
      
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={'تغییر پسورد'} right={null} left='back' />
        <ScrollView style={{flex:1, marginBottom:height/14}} keyboardShouldPersistTaps='handled' ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{
              this.scrollView.scrollTo({y:contentHeight/2, x:0, animated:true});
          }}>
          <KeyboardAvoidingView style={{flex:1}} behavior="padding">
            <View style={style.insideContainer}>
              <View style={[style.infoHolder, {marginTop: 0}]}>
                <Input
                    label={
                        <View style={[style.infoTitleHolder, {marginTop: 0}]}>
                            <Awesome5 name="unlock" size={12} color='#8C8586' style={{alignSelf:'center'}}/>
                            <Label style={style.infoTitle}>رمز عبور فعلی</Label>
                        </View>
                    }
                    secure = {true}
                    onChange={val => this.changeValue("currentPass", val)}
                    value={this.state.currentPass}
                    onRef={ref => {
                        this.inputs["currentPass"] = ref;
                    }}
                    onSubmit={() => this.focusNextField("newPass")}
                />
                <Input
                    label={
                        <View style={style.infoTitleHolder}>
                            <Awesome5 name="unlock-alt" size={12} color='#8C8586' style={{alignSelf:'center'}}/>
                            <Label style={style.infoTitle}>رمز عبور جدید</Label>
                        </View>
                    }
                    secure = {true}
                    onChange={val => this.changeValue("newPass", val)}
                    value={this.state.newPass}
                    onRef={ref => {
                        this.inputs["newPass"] = ref;
                    }}
                    onSubmit={() => this.focusNextField("repeatNewPass")}
                />
                <Input
                    label={
                        <View style={style.infoTitleHolder}>
                            <Awesome5 name="unlock-alt" size={12} color='#8C8586' style={{alignSelf:'center'}}/>
                            <Label style={style.infoTitle}>تکرار رمز عبور جدید</Label>
                        </View>
                    }
                    secure = {true}
                    onChange={val => this.changeValue("repeatNewPass", val)}
                    value={this.state.repeatNewPass}
                    onRef={ref => {
                        this.inputs["repeatNewPass"] = ref;
                    }}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
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
            text={t('edit')}
            onPress={this.onPressSend}
        />
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
  insideContainer: {
    flex: 1,
    margin: 15,
    marginBottom: height/14+10,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 3,
    padding: 10,
  },
  infoContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 2,
  },
  infoHolder: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  infoTitleHolder: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 12,
    color: '#8C8586',
    marginLeft: 5,
    marginBottom: 5,
  },
  textBoxHolder: {
    width: '100%',
    backgroundColor: '#EEF0F3',
  },
  infoResponse: {
    fontFamily: 'IRANSans',
    height: rH(4.5),
    color: '#302c31',
    padding:0,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#80808020',
    borderRadius: 3,
  },
  finalButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height/14,
    backgroundColor: '#BC0F10',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    marginVertical:0,
  },
  finalButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginEnd: 10,
  },
});

module.exports =  connect(state => state)(Screen);
