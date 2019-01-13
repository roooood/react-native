const { Input, Dropdown } = Form;

const regex = /(<([^>]+)>)/gi;
class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resTypes: Data.regCat || []
    };
    this.inputs = [];
    autoBind(this);
  }
  componentDidMount() {
    if (!("baseCat" in Data)) {
      Fetch("base_cat", res => {
        if (res.status == "success") {
          let tmp = {},
            item;
          for (item of res.data) {
            tmp[item.id] = item.title;
          }
          Data.baseCat = tmp;
          this.setState({ resTypes: tmp });
        }
      });
    }
  }

  focusNextField(id) {
    this.inputs[id].focus();
  }
  changeValue(key, val) {
    let data = {};
    data[key] = val;
    this.props.dispatch(setInfoProfileData(data));
  }
  render() {
    return (
      <View style={[s.flex]}>
        <View style={sf.pad(15)}>
          <KeyboardAwareScrollView>
          <Input
            label={t("info.resName")}
            onChange={val => this.changeValue("res_name", val)}
            value={this.props.infoProfile.res_name}
            onRef={ref => {
              this.inputs["title"] = ref;
            }}
            onSubmit={() => this.focusNextField("siteName")}
          />
          <Input
            label={t("info.siteName")}
            onChange={val => this.changeValue("domain", val)}
            value={this.props.infoProfile.domain}
            onRef={ref => {
              this.inputs["siteName"] = ref;
            }}
            onSubmit={() => this.focusNextField("addres")}
          />
          <Input
            label={t("info.addres")}
            onChange={val => this.changeValue("addres", val)}
            value={this.props.infoProfile.address}
            onRef={ref => {
              this.inputs["addres"] = ref;
            }}
            textarea={true}
            lines={1.5}
          />
          <Input
            editable={false}
            label={t("info.resType")}
            onChange={val => this.changeValue("base_cat", val)}
            value={this.state.resTypes[this.props.infoProfile.base_cat]}
            onRef={ref => {
              this.inputs["resType"] = ref;
            }}
            onSubmit={() => this.focusNextField("noeRes")}
          />
          {/* <Input
              label={t("info.noeRes")}
              onChange={val => this.changeValue("noeRes", val)}
              value={this.state.form.resType}
              onRef={ref => {
                this.inputs["noeRes"] = ref;
              }}
              onSubmit={() => this.focusNextField("addres")}
            /> */}
          
          <Dropdown
            label={t("info.noeRes")}
            items={this.props.infoProfile.res_type || []}
            onChange={val => this.changeValue("res_types", val)}
            value={this.props.infoProfile.res_types}
            isMulti
            haveSearch
          />
         
          <Input
            label={t("info.des")}
            onChange={val => this.changeValue("description", val)}
            value={(this.props.infoProfile.description || "").replace( regex, "")}
            onRef={ref => {
              this.inputs["des"] = ref;
            }}
            textarea={true}
            lines={2}
          />
          </KeyboardAwareScrollView>
        </View>

        <Button
          radius={1}
          style={[
            s.absBottom,
            s.w100,
            sf.h(rH(6)),
            sf.mar(0),
            sf.br(0, 0, 8, 8)
          ]}
          text={t("info.save")}
          onPress={this.props.save}
        />
      
      </View>
    );
  }
}

module.exports = connect(state => state)(Screen);
