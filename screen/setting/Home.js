import SettingsList from './Setting';
class Screen extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  goto(route) {
    this.props.navigation.navigate(route);
  }
  logOut(){
    this.props.dispatch(clearUserData());
    this.props.parent.navigate('Sign');
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title={t('setting.title')} left='back' onBack={()=> this.props.parent.goBack()} />
        <View style={[s.f]}>
            <SettingsList backgroundColor='#fff' defaultTitleStyle={{backgroundColor: 'transparent'}} defaultItemSize={50}>
           
              <SettingsList.Item
                  icon={<Awesome5 name="unlock" size={18} color='#454545' />}
                  title={t('setting.changePass')}
                  titleInfo=''
                  onPress={() => this.goto('ChangePass')}
              />
              <SettingsList.Item
                  icon={<Awesome5 name="envelope" size={18} color='#454545' />}
                  title={t('setting.contactUs')}
                  titleInfo=''
                  onPress={() => this.goto('ContactUs')}
              />
              <SettingsList.Item
                  icon={<Awesome5 name="question-circle" size={18} color='#454545' />}
                  title={t('setting.faq')}
                  titleInfo=''
                  onPress={() => this.goto('SettingFaq')}
              />
              <SettingsList.Item
                  icon={<Awesome5 name="file-alt" size={18} color='#454545' />}
                  title={t('setting.rules')}
                  titleInfo=''
                  onPress={() => this.goto('SettingRules')}
              />
              <SettingsList.Item
                  icon={<Awesome5 name="sign-out-alt" size={18} color='#EA2027' />}
                  hasNavArrow = {false}
                  title= {t('setting.logOut')}
                  titleInfo=''
                  titleStyle={{color: '#EA2027'}}
                  onPress={() => this.logOut()}
              />
            </SettingsList>
        </View>
      </View>
    );
  }
}

var style = StyleSheet.create({
  
});

module.exports = connect(state => state)(Screen);
