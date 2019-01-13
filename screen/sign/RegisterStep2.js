const { width, height } = Dimensions.get('window');
const { Input } = Form;

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
    this.inputs = [];
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }
  changeValue(key, val) {
    let data = {};
    data[key] = val;
    this.props.dispatch(setRegData(data))
  }

  render() {
      return (
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView style={{padding: 20, marginBottom: 10,}} behavior="padding">
            <Input
              height={rH(5)}
              label={t("login.firstAndLastName")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changeValue("first_name", val)}
              value={this.props.reg.first_name}
              onRef={ref => {
                this.inputs["firstAndLastName"] = ref;
              }}
              onSubmit={() => this.focusNextField("restaurantName")}
              style={[style.inputBox, style.shadow]}
            />
            <Input
              height={rH(5)}
              label={t("login.restaurantName")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changeValue("name", val)}
              value={this.props.reg.name}
              onRef={ref => {
                this.inputs["restaurantName"] = ref;
              }}
              onSubmit={() => this.focusNextField("phoneNumber")}
              style={[style.inputBox, style.shadow]}
            />
            <Input
              height={rH(5)}
              label={t("login.phoneNumber")}
              labelStyle={{fontSize: 16}}
              onChange={val => this.changeValue("mobile", val)}
              value={this.props.reg.mobile}
              onRef={ref => {
                this.inputs["phoneNumber"] = ref;
              }}
              type={'numeric'}
              maxLength = {11}
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
