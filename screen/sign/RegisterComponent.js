
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';

class Screen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        step: Data.step || 1,
      }
      autoBind(this);
  }

  onChangeStepPress(change,loading) {
    let step = this.state.step; 
    let go = false;
    if(change == 'next') {
      if(this.state.step != 4){
        if(step == 1){
          if(typeof this.props.reg.res_type == 'undefined')
            dropdown.alertWithType('warn', '', t('sign.selectTypeErr'))
          else
            go = true;
        }
        else if (step == 2){
          let check = ['first_name','name','mobile'];
          for(i of check){
            if(typeof this.props.reg[i] == 'undefined' || this.props.reg[i] == ''){
              dropdown.alertWithType('warn', '', t('sign.fillEmptyData'))
              return;
            }
          }
          if(!Validate.mobile(this.props.reg.mobile)){
            dropdown.alertWithType('warn', '', t('sign.invalidNumber'))
              return;
          }
          C.confirm(t('sign.confirmMobile'),()=>{
            this.changeStep(step+1)
          })
        
        }
        else if (step == 3){
          let check = ['zone','address'];
          for(i of check){
            if(typeof this.props.reg[i] == 'undefined' || this.props.reg[i] == ''){
              dropdown.alertWithType('warn', '', t('sign.fillEmptyData'))
              loading.hide();
              return;
            }
          }
          if(this.props.reg.zone == '0'){
            dropdown.alertWithType('warn', '', t('sign.invalidZone'))
            loading.hide();
            return;
          }
          this.submitData(loading);
        }


        if(go)
          this.changeStep(step+1)
      }
    }
    else if (change == 'prev' && this.state.step != 1) {
        this.changeStep(this.state.step-1)
    }
  }
  submitData(loading){
    let data = {};
    let want = ['first_name','name','mobile','zone','address','res_type'];
    for(let i of want){
      data[i] = this.props.reg[i];
    }
    Fetch('res_register',data,(res)=>{
      loading.hide();
      if(res.status == 'success'){
        this.props.dispatch(setUserData(res.data.token));
        dropdown.alertWithType('success', '', t('sign.successRegister'))
        this.changeStep(4);
      }
      else if(res.message == 'user exist'){
        dropdown.alertWithType('warn', '', t('sign.userExist'))
      }
      else{
        dropdown.alertWithType('error', '', t('sign.errorRegister'))
      }
    })
  }
  changeStep(step){
    Data.step = step;
    this.setState({step});
  }
  render() {
    return (
        <View style={styles.container}>
          { this.state.step == 1  &&
            <Animatable.View style={s.flex} animation="zoomIn" duration={500}>
              <RegisterStep1 />
            </Animatable.View>
          }
          { this.state.step == 2  &&
            <Animatable.View style={s.flex} animation="zoomIn" duration={500}>
              <RegisterStep2 />
            </Animatable.View>
          }
          { this.state.step == 3  &&
            <Animatable.View style={s.flex} animation="zoomIn" duration={500}>
              <RegisterStep3 />
            </Animatable.View>
          }
          { this.state.step == 4  &&
            <Animatable.View style={s.flex} animation="zoomIn" duration={500}>
              <RegisterStep4 goToLogin={this.props.onTabsPress} />
            </Animatable.View>
          }

          <View style={style.finalButtonsHolder}>
            { this.state.step != 4  &&
              <Button
                loading={this.state.step == 3 ? true:false}
                text={this.state.step == 3 ? t('login.submitSign'):t('login.nextStep')}
                onPress={(loading) => this.onChangeStepPress('next',loading)}
                style={style.nextButtonHolder}
                icon={'chevron-left'}
                iconAlign='right'
              />
            }
            { this.state.step != 1  && this.state.step != 4  &&
              <Button
                text={t('login.prevStep')}
                onPress={(loading) => this.onChangeStepPress('prev',loading)}
                style={style.prevButtonHolder}
                icon={'chevron-right'}
                iconAlign='left'
                background={theme('background')}
                border='#EA2027'
                color='#EA2027'
              />
            }
          </View>
        </View>
     );
  }
}

var style = StyleSheet.create({
  finalButtonsHolder: {
    paddingHorizontal: 20,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  prevButtonHolder: {
    height: rH(5),
    width: rW(40),
    borderRadius: 5,
    alignSelf: 'center',
  },
  nextButtonHolder: {
    height: rH(5),
    width: rW(40),
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#EA2027',
  },
});

module.exports = connect((state)=>(state))(Screen);
