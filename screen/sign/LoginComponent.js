
const { Input } = Form;

class Screen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        form: {
          phone_number: this.props.mobile || '09211629979' ,
          pass: '123',
        },
        forget: {
          code: '' ,
          password: '',
          rePassword: '',
        },
        forgetStep : 1
      }
      autoBind(this);
      this.inputs = [];
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  changeValue(key, value) {
    this.setState(state => {
      state.form[key] = value.toString();
      return state;
    });
  }
  changePassValue(key, value) {
    this.setState(state => {
      state.forget[key] = value.toString();
      return state;
    });
  }
  onRecoverPress(loading){
    let go = true , msg=[];
    if(this.state.forgetStep == 1)
    { 
      if(!Validate.mobile(this.state.form.phone_number)){
        msg.push(t('sign.invalidNumber'))
        go = false;
      }
      if(!go){
        dropdown.alertWithType('warn', '',msg.join('\n') );
        loading.hide();
        return;
      }
      Fetch('forget_password',{mobile:this.state.form.phone_number},(res)=>{
        loading.hide();
        this.forget.hide()
        if(res.status == 'success'){
          this.setState({forgetStep:2})
        }
        else if(res.status == 'error'){
          dropdown.alertWithType('error', '', t('sign.errorRecover'))
        }
      })
    }
    else
    {
      if(this.state.forget.code.length != 6){
        msg.push(t("login.active")+ t('form.emptyOrShort')) 
        go = false;
      }
      if(this.state.forget.password.length < 3){
        msg.push(t("login.password")+ t('form.emptyOrShort')) 
        go = false;
      }
      if(this.state.forget.password != this.state.forget.rePassword){
        msg.push(t("login.notEqualPass"))
        go = false;
      }
      if(!go){
        dropdown.alertWithType('warn', '',msg.join('\n') );
        loading.hide();
        return;
      }
      Fetch('forget_password_change',{code:this.state.forget.code,password:this.state.forget.password},(res)=>{
        loading.hide();
        if(res.status == 'success'){
          this.props.dispatch(setUserData({token:res.data.token}));
          dropdown.alertWithType('success', '', t('sign.successLogin'))
          this.props.navigation.navigate('Home')
        }
        else if(res.status == 'error'){
          dropdown.alertWithType('error', '', t('sign.errorLogin'))
        }
      })
    }
  }
  onLoginPress(loading) {
    let go = true , msg=[];
    if(!Validate.mobile(this.state.form.phone_number)){
      msg.push(t('sign.invalidNumber'))
      go = false;
    }
    if(this.state.form.pass.length < 3){
      msg.push(t('sign.invalidPass'))
      go = false;
    }
    if(!go){
      dropdown.alertWithType('warn', '',msg.join('\n') );
      loading.hide();
      return;
    }
    Fetch('res_login',this.state.form,(res)=>{
      loading.hide();
      if(res.status == 'success'){
        this.props.dispatch(setUserData({token:res.data.token}));
        dropdown.alertWithType('success', '', t('sign.successLogin'))
        this.props.navigation.navigate('Home')
      }
      else if(res.status == 'error'){
        dropdown.alertWithType('error', '', t('sign.errorLogin'))
      }
    })
  }

  renderForget(){
    return (
      <Modal ref={ref => (this.forget = ref)} fromBottom style={[sf.bgc(theme('background'))]}>
       { this.state.forgetStep == 1  &&
          <View style={s.f,s.w100}>
            <Input
              height={rH(5)}
              label={t("login.phoneNumber")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changeValue("phone_number", val)}
              value={this.state.form.phone_number}
              style={[style.inputBox, style.shadow]}
              type={'numeric'}
              maxLength = {11}
            />
          </View>
       } 
       { this.state.forgetStep == 2  &&
          <View style={s.f,s.w100}>
            <Input
              height={rH(5)}
              label={t("login.active")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changePassValue("code", val)}
              value={this.state.forget.code}
              onRef={ref => {
                this.inputs["pass"] = ref;
              }}
              type={'numeric'}
              secure = {true}
              style={[style.inputBox, style.shadow]}
              onSubmit={() => this.focusNextField("password")}
            />
            <Input
              height={rH(5)}
              label={t("login.password")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changePassValue("password", val)}
              value={this.state.forget.password}
              onRef={ref => {
                this.inputs["password"] = ref;
              }}
              secure = {true}
              style={[style.inputBox, style.shadow]}
              onSubmit={() => this.focusNextField("rePassword")}
            />
            <Input
              height={rH(5)}
              label={t("login.rePassword")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changePassValue("rePassword", val)}
              value={this.state.forget.rePassword}
              onRef={ref => {
                this.inputs["rePassword"] = ref;
              }}
              secure = {true}
              style={[style.inputBox, style.shadow]}
            />

          </View>
       }
        <Button
          loading
          text={t(this.state.forgetStep == 2 ?'login.login':'sign.recover')}
          onPress={this.onRecoverPress}
          style={style.loginButtonHolder}
        />

      </Modal>
    ) 
  }

  componentDidMount() {
    if(this.props.register == true)
      this.focusNextField('pass')
  }
  render() {
      return (
        <View style={[style.container]}>
          <View style={{margin:20}}>
            <Input
              height={rH(5)}
              label={t("login.phoneNumber")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changeValue("phone_number", val)}
              value={this.state.form.phone_number}
              onRef={ref => {
                this.inputs["phone"] = ref;
              }}
              onSubmit={() => this.focusNextField("pass")}
              style={[style.inputBox, style.shadow]}
              type={'numeric'}
              maxLength = {11}
            />
            <Input
              height={rH(5)}
              label={t(this.props.register == true ? "login.active":"login.password")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changeValue("pass", val)}
              value={this.state.form.pass}
              onRef={ref => {
                this.inputs["pass"] = ref;
              }}
              secure = {true}
              style={[style.inputBox, style.shadow]}
            />

            <TouchableWithoutFeedback onPress={() => this.forget.show()}>
              <View >
                <Label style={style.forgetPassText}>{t('login.forgetPassText')}</Label>
              </View>
            </TouchableWithoutFeedback>

            <Button
              loading
              text={t('login.login')}
              onPress={this.onLoginPress}
              style={style.loginButtonHolder}
            />
          </View>
          {this.renderForget()}
        </View>
       );
  }
}

var style = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  inputBox: {
    backgroundColor: '#fff',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  foregtButtonHolder: {
    marginTop: 5,
  },
  forgetPassText: {
    fontSize: 12,
    color: '#67676762',
    textAlign: 'left',
  },
  loginButtonHolder: {
      height: rH(5),
      width: rW(40),
      borderRadius: 5,
      backgroundColor: '#EA2027',
      elevation: 1,
      alignSelf: 'center',
      marginTop: 30,
      marginBottom: 10,
    },
});

module.exports = connect((state)=>(state))(Screen);
