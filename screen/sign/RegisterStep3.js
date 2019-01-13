
const { Dropdown,Input } = Form;
const next = {province:'city',city:'region',region:'zone'};
class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      province: Data.province || [],
      city:  Data.city || [],
      region:  Data.region || [],
      zone:  Data.zone ||[],
    };
    autoBind(this);
    this.inputs = [];

  }

  componentDidMount() {
    if(!('province' in Data)){
      this.getPar();
    }
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }

  changeValue(key, val) {
    if (typeof val == "object") {
      val = val[0];
    }
    let data = {};
    data[key] = val;
    this.props.dispatch(setRegData(data));
    if(key in next && val > 0)
      this.getSub(key,val,next[key])
  }

  getPar(){
    Fetch('get_province',(res)=>{
      if(res.status == 'success'){
        let temp = [] , item;
        for(item of res.data){
          temp.push({
            id : item.id+"",
            name : item.title,
          });
        }
        Data.province = temp;
        this.setState({province:temp})
      }
    });
  }
  getSub(parent,id,n) {
    let send = {};
    send[parent +'_id'] = parseInt(id) ;
    Fetch(parent+'_'+n,send,(res)=>{
      if(res.status == 'success'){
        let temp = [] , item;
        for(item of res.data){
          temp.push({
            id : item.id+"",
            name : item.title,
          });
        }
        Data[n] = temp;
        this.setState(state=>(state[n] = temp,state))
      }
    });
  }

  render() {
      return (
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView style={{padding: 20, marginBottom: 10,}} behavior="padding">
            <Dropdown
              label={t("login.province")}
              items={this.state.province}
              onChange={val => this.changeValue("province", val)}
              value={this.props.reg.province}
              style={[style.inputBox, style.shadow]}
            />
            <Dropdown
              label={t("login.city")}
              items={this.state.city}
              onChange={val => this.changeValue("city", val)}
              value={this.props.reg.city}
              style={[style.inputBox, style.shadow]}
            />
            <Dropdown
              label={t("login.region")}
              items={this.state.region}
              onChange={val => this.changeValue("region", val)}
              value={this.props.reg.region}
              style={[style.inputBox, style.shadow]}
            />
            <Dropdown
              label={t("login.zone")}
              items={this.state.zone}
              onChange={val => this.changeValue("zone", val)}
              value={this.props.reg.zone}
              style={[style.inputBox, style.shadow]}
            />
            <Input
              label={t("login.address")}
              textarea = {true}
              lines = {2}
              onChange={val => this.changeValue("address", val)}
              value={this.props.reg.address}
              style={[style.inputBox, style.shadow]}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      );
  }
}

var style = StyleSheet.create({
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
});

module.exports = connect((state)=>(state))(Screen);
