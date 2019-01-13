
const { SwitchForm } = Form;

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {}};
    
    this.option = t('resOption');
    autoBind(this);

  }
  componentDidMount() {
    Fetch("res_options", { token: this.props.user.token }, res => {
      if (res.status == "success") {
        let item;
        let data = {};
        for (item in res.data.options) {
          data[item] = res.data.options[item];
        }
  
        data.baby_seat = data.babt_seat;
       // delete data.babt_seat,data.id;
        this.setState({form:data})
      } else {
      }
    });
  }
  changeValue(key, value) {
    this.setState(state => {
      state.form[key] = value;
      return state;
    });
  }
  save(loading) {
    let temp   = this.state.form;
    let data   = {} ;
    data.token = this.props.user.token;
    data.data  = JSON.stringify(temp);

    Fetch('res_options_update',data,(res)=>{console.log(data)
      loading.hide();
      if(res.status == 'success') {
        dropdown.alertWithType('success', '', t('product.successSave'))
      } else {
        dropdown.alertWithType('error', '', t('product.errorSave'))
      }
    })
  }
  render() {
    return (
      <View style={[styles.container, sf.pad(10, 15), sf.marTop(10)]}>
        <View
          style={[
            sf.h(rH(75)),
            styles.card,
            sf.pad(0),
            s.hidden,
            styles.shadow,
            s.w100,
            sf.padB(50)
          ]}
        >
          <ScrollView style={[s.flex,sf.mar(10)]} >
            {Object.keys(this.option).map((key)=>{
              return(
                <SwitchForm
                  key= {key}
                  isRow
                  label={this.option[key]}
                  onChange={val => this.changeValue(key, val)}
                  value={this.state.form[key]}
                />
              )
            })
          }
          </ScrollView>
          <Button
            radius={1}
            style={[
              s.absB,
              s.w100,
              sf.h(rH(6)),
              sf.mar(0),
              sf.marT(30),
              sf.br(0, 0, 8, 8)
            ]}
            text={t("info.save")}
            onPress={this.save}
          />
        </View>
      </View>
    );
  }
}

module.exports = connect(state => state)(Screen);
