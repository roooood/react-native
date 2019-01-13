
class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    autoBind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.onLoginPress();
    }, 1000);
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  onLoginPress() {
    this.props.goToLogin(0,true,this.props.reg.mobile);
  }

  render() {
      return (
        <View style={styles.container}>
          <View style={style.checkIconHolder}>
            <Awesome5 name="check" size={30} color='#1BBC9B' />
          </View>
          <Label style={style.successText}>{t('login.dearOwner')}</Label>
          <Label style={style.successText}>{t('login.registerSuccess')}</Label>
          <Button
            text={t('login.login')}
            onPress={() => this.onLoginPress()}
            style={style.loginButtonHolder}
            icon={'chevron-left'}
            iconAlign='right'
          />
        </View>
      );
  }
}

var style = StyleSheet.create({
  checkIconHolder: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#1BBC9B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 14,
    color: '#1BBC9B',
    marginTop: 10,
    textAlign: 'center',
  },
  loginButtonHolder: {
    height: rH(5),
    width: rW(40),
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#EA2027',
    marginTop: 50,
  },
});

module.exports = connect((state)=>(state))(Screen);
