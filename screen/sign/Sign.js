import Svg from "../../app/Svg";
const { width, height } = Dimensions.get('window');

import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

class Screen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        curveLeft: new Animated.Value(width*0.17),
        tabsArray: [
          {
            name: t('login.login'),
            isSelect: 1,
            left: width*0.15,
          },
          {
            name: t('login.register'),
            isSelect:0,
            left: width*0.65,
          },
        ],
        headerMarginTop: 0,
        reg : false ,
        mobile : '',
      }
      autoBind(this);
      this.res = {};
  }
  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    //this.onTabsPress(1)
  }
  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow () {
    this.changeHeader(true)
  }
  _keyboardDidHide () {
    this.changeHeader(false)
  }
  changeHeader(keyboardIsOpen) {
    if(keyboardIsOpen) {
      this.setState({ headerMarginTop: -(height*0.2) })
    } else {
      this.setState({ headerMarginTop: 0 })
    }
  }

  onTabsPress(index,register,mobile) {
    this.changeHeader(false);
    let a = this.state.tabsArray;
    for(let i=0; i<this.state.tabsArray.length; i++) {
      if (i != index) {
        a[i].isSelect = 0;
      } else {
        a[i].isSelect = 1;
        Animated.timing(this.state.curveLeft, {
          toValue : a[i].left,
          duration :500,
        }).start()
      }
    }
    this.setState({ tabsArray: a });
    if(register == true){
      this.setState({register,mobile})
    }
  }


  render() {
    return (
        <View style={[styles.container, style.loginContainer]}>
          <View style={[style.headerContainer, {marginTop: this.state.headerMarginTop}]}>
            <Image source={Images.RedBackground} style={style.headerBackgroundImage} resizeMode='cover'/>
            <View style={style.logoContainer}>
              <Image source={Images.logo} style={style.logoImage} resizeMode='contain'/>
              <Label style={style.titleText}>{t('login.ownerApp')}</Label>
              <Label style={style.titleText} isBold>{t('login.offfood')}</Label>
            </View>
            <View style={style.tabBarContainer}>
              {this.state.tabsArray.map((data, index) => {
                  return (
                    <TouchableWithoutFeedback key={index} onPress={() => this.onTabsPress(index)}>
                        <View style={style.tabButtons}>
                          <Label isBold style={[style.tabTexts, {color: (data.isSelect ? '#ffffff' : '#ffffff80')}]}>
                            {data.name}
                          </Label>
                        </View>
                    </TouchableWithoutFeedback>
                  )
              })}
            </View>

            <Animated.View style={[style.curveShapeHolder, {left: this.state.curveLeft}]}>
              <Svg.Curve />
            </Animated.View>
          </View>

          { this.state.tabsArray[0].isSelect == 1  &&
            <Animatable.View ref="login" style={s.flex} animation="fadeInLeft" duration={500}>
              <LoginComponent
                navigation={this.props.navigation}
                register = {this.state.register}
                mobile = {this.state.mobile}
                />
            </Animatable.View>
          }
          { this.state.tabsArray[1].isSelect == 1  &&
            <Animatable.View ref="register" style={s.flex} animation="fadeInRight" duration={500}>
              <RegisterComponent
                navigation={this.props.navigation}
                onTabsPress={this.onTabsPress}
                />
            </Animatable.View>
          }
          
        </View>
     );
  }
}

var style = StyleSheet.create({
  loginContainer: {
    // backgroundColor: 'red'
  },
  headerContainer: {
    width: '100%',
    height: height*0.3,
    backgroundColor: '#EA2027',
  },
  headerBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    width: '100%',
    height: height*0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: height*0.1,
    height: height*0.1,
  },
  titleText: {
    fontSize: 14,
    color: '#fff',
  },
  tabBarContainer: {
    width: '100%',
    height: height*0.1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabButtons: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTexts: {
    fontSize: 19,
    color: '#fff',
    // textAlign: 'center',
  },
  curveShapeHolder: {
    position: 'absolute',
    bottom: -7,
    width: 50,
    height: 20,
  },
  curveShapeImage: {
    width: '100%',
    height: '100%',
  }
});

module.exports = connect((state)=>(state))(Screen);
