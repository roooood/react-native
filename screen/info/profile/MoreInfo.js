const { Input, Dropdown, SwitchForm } = Form;

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        percent: null,
        name: "",
        siteName: "",
        addres: "",
        resType: "",
        noeRes: []
      }
    };
    this.inputs = [];
    autoBind(this);
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
        <View style={[sf.pad(15)]}>
          <KeyboardAwareScrollView>
          <Input
            label={t("info.sendType")}
            onChange={val => this.changeValue("delivery_type", val)}
            value={this.props.infoProfile.delivery_type}
            onRef={ref => {
              this.inputs["delivery_type"] = ref;
            }}
            onSubmit={() => this.focusNextField("phone")}
          />
          <Input
            label={t("info.phone")}
            onChange={val => this.changeValue("mobile", val)}
            value={this.props.infoProfile.mobile}
            onRef={ref => {
              this.inputs["phone"] = ref;
            }}
            onSubmit={() => this.focusNextField("workTime")}
          />
          <Input
            label={t("info.workTime")}
            onChange={val => this.changeValue("working_time", val)}
            value={this.props.infoProfile.working_time}
            onRef={ref => {
              this.inputs["workTime"] = ref;
            }}
            textarea={true}
            onSubmit={() => this.focusNextField("perDis")}
          />
          <Input
            label={
              <View style={[s.row]}>
                <Label>{t("info.perDis")}</Label>
                <Label size={rF(3)}> {t("info.perDisDec")}</Label>
              </View>
            }
            onChange={val => this.changeValue("percent", val)}
            value={this.props.infoProfile.percent+""}
            onRef={ref => {
              this.inputs["perDis"] = ref;
            }}
            type = 'phone-pad'
            maxLength = {2}
            onSubmit={() => this.focusNextField("delTime")}
          />

          <Input
            label={t("info.delTime")}
            onChange={val => this.changeValue("send_time", val)}
            value={this.props.infoProfile.send_time}
            onRef={ref => {
              this.inputs["delTime"] = ref;
            }}
            textarea={true}
            lines={2}
          />
          <SwitchForm
            isRow
            label={t("info.isFood")}
            onChange={val => this.changeValue("food_status", val)}
            value={parseInt(this.props.infoProfile.food_status)}
          />
          <SwitchForm
            isRow
            label={t("info.isSit")}
            onChange={val => this.changeValue("site", val)}
            value={parseInt(this.props.infoProfile.site)}
          />
          <SwitchForm
            isRow
            label={t("info.isSendFood")}
            onChange={val => this.changeValue("delivery", val)}
            value={parseInt(this.props.infoProfile.delivery)}
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
