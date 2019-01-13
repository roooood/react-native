import SectionedMultiSelect from "./multiSelect";
import JalaliCalendarPicker from "react-native-jalali-calendar-picker";

let height = rH(4.5);

class Input extends Component {
  constructor(props) {
    super(props);
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  onSubmitEditing() {
    if (this.props.onSubmit) this.props.onSubmit();
  }
  focus() {
    this.textInput.focus();
  }
  render() {
    height = this.props.height || height;
    return (
      <View style={style.inputContiner}>
        {this.props.label && typeof this.props.label == "string" ? (
          <Label style={style.label} align="left">
            {this.props.label}
          </Label>
        ) : (
          this.props.label
        )}
        <View style={style.row}>
          <TextInput
            {...this.props}
            ref={input => (this.textInput = input)}
            style={[
              style.input,
              this.props.style,
              {
                height: this.props.textarea
                  ? this.props.lines * height
                  : height,
                fontFamily: fontFamily
              },
              this.props.textarea && { textAlignVertical: "top", paddingTop: 5 }
            ]}
            placeholder={this.props.placeholder || ""}
            placeholderTextColor={this.props.pColor || "#999"}
            keyboardType={this.props.type || "default"}
            value={this.props.value ? this.props.value : ""}
            maxLength={this.props.maxLength || 1000}
            multiline={this.props.textarea || false}
            numberOfLines={this.props.lines || 1}
            clearButtonMode={"while-editing"}
            autoCapitalize={"none"}
            underlineColorAndroid="transparent"
            returnKeyType={this.props.return || "next"}
            onSubmitEditing={() => {
              this.onSubmitEditing();
            }}
            onChangeText={val => this.props.onChange(val)}
            onKeyPress={e => {}}
            onFocus={this.props.onFocus}
            onEndEditing={() => null}
            secureTextEntry={this.props.secure || false}
          />
          {this.props.after && this.props.after}
        </View>
      </View>
    );
  }
}

class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.value || ""
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(date) {
    let newDate = date.format("jYYYY/jM/jD");
    this.setState({date: newDate});
    this.props.onChange(newDate);
    this.mcal.hide();
  }
  render() {
    value =  this.state.date || this.props.value ;
    return (
      <View style={style.inputContiner}>
        {this.props.label && (
          <Label style={style.label} align="left">
            {this.props.label}
          </Label>
        )}
        <View style={style.row}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.mcal.show();
            }}
          >
            <View style={[style.row, style.calendar]}>
              <Text style={{ fontSize: rF(5) }}> {value}</Text>
              <Awesome5 name="calendar-alt" size={rF(8)} color="#666" />
            </View>
          </TouchableWithoutFeedback>
          <Modal ref={ref => (this.mcal = ref)}>
            <JalaliCalendarPicker
              nextTitle="   بعدی   "
              previousTitle="   قبلی   "
              textStyle={{fontFamily: fontFamily }}
              onDateChange={this.onChange}
            />
          </Modal>
        </View>
      </View>
    );
  }
}

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let value = this.props.value;
    if (typeof value == "string" ) {
      value = [value];
    }

    let single = !this.props.isMulti;
    let search = !this.props.haveSearch;

    let items = this.props.items;
    if (!("items" in items)) {
      items = [{ items: items }];
    }

    return (
      <View style={style.inputContiner}>
        {this.props.label && (
          <Label style={style.label} align="left">
            {this.props.label}
          </Label>
        )}
        <View style={[style.inputDropDown,this.props.style]}>
          <SectionedMultiSelect
            {...this.props}
            items={items}
            single={single}
            hideSearch={search}
            colors={{ primary: theme("secColor") }}
            itemFontFamily={{ fontFamily: fontFamily }}
            subItemFontFamily={{ fontFamily: fontFamily }}
            searchTextFontFamily={{ fontFamily: fontFamily }}
            confirmFontFamily={{ fontFamily: fontFamily }}
            styles={[
              {
                selectToggle: { paddingStart: 5 },
                selectToggleText: {
                  fontSize: rF(4.4),
                  fontFamily: fontFamily,
                  color: "#333",
                  textAlign: "left"
                },
                chipsWrapper: {
                  marginTop: 15
                },
                chipText: {
                  fontSize: rF(3),
                  fontFamily: fontFamily
                },
                chipContainer: {
                  height: 20
                },
                chipIcon: {
                  color: "tomato"
                }
              }
            ]}
            searchPlaceholderText="جستجو ..."
            uniqueKey="id"
            subKey="items"
            selectText="انتخاب ..."
            selectedText="انتخاب شده "
            noResultsComponent={
              <View style={style.dropdownRender}>
                <Label>نتیجه ای یافت نشد</Label>
              </View>
            }
            noItemsComponent={
              <View style={style.dropdownRender}>
                <Label>موردی یافت نشد</Label>
              </View>
            }
            showDropDowns={false}
            readOnlyHeadings={true}
            onSelectedItemsChange={this.props.onChange}
            selectedItems={value}
            confirmText="تایید"
          />
          {this.props.after && this.props.after}
        </View>
      </View>
    );
  }
}

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rule: this.props.value || 0
    };
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    let val = this.state.rule == 1 ? 0 : 1;
    this.setState({ rule: val });
    this.props.onPress(val);
  }
  render() {
    let color = this.props.color || theme("color");
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={style.inputCheckBox}>
          {this.props.label && (
            <Label align="left" style={{ paddingStart: 5, color: color }}>
              {this.props.label}
            </Label>
          )}
          <View>
            <TouchableWithoutFeedback onPress={this.onPress}>
              <Awesome5
                name={this.state.rule ? "check-square" : "square"}
                //color={Theme.red}
                size={rF(10)}
              />
            </TouchableWithoutFeedback>
            {this.props.after && this.props.after}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
class SwitchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // val: this.props.value || false
    };
    this.changeVal = this.changeVal.bind(this);
  }
  changeVal(val) {
    val = val == true ? 1 : 0;
    this.setState({ val: val }, this.props.onChange(val));
  }
  render() {
    let row = this.props.isRow || false;
    let val = this.props.value || 0;
    return (
      <View style={[style.switch, row && style.switchRow]}>
        {this.props.label && (
          <TouchableWithoutFeedback
            onPress={() => {
              this.changeVal(!this.state.val);
            }}
          >
            <Label align="left">{this.props.label}</Label>
          </TouchableWithoutFeedback>
        )}
        <View>
          <Switch onValueChange={val => this.changeVal(val)} value={val == 1} />
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  inputContiner: {
    marginVertical: 5
  },
  label: {
    marginBottom: 2
  },
  dropdownStyle: {
    width: "80%"
  },
  input: {
    backgroundColor: "rgba(112,112,112,.15)",
    padding: 0,
    borderRadius: 5,
    paddingHorizontal: rW(2),
    margin: 0,
    flex: 1 ,
    fontSize: rF(4)
  },
  calendar: {
    backgroundColor: "rgba(112,112,112,.15)",
    padding: 0,
    borderRadius: 5,
    margin: 0,
    flex: 1,
    paddingHorizontal: rW(2),
    height: rH(4.5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputCheckBox: {
    backgroundColor: "#D8D8D8",
    flexDirection: "row",
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    height: rH(4.5) ,
  },
  inputDropDown: {
    backgroundColor: "rgba(112,112,112,.15)",
    borderRadius: 5,
    padding:5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  dropdownRender: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between" ,
    height:rH(4.5)
  }
});
module.exports = {
  Input,
  Dropdown,
  CheckBox,
  Calender,
  SwitchForm
};
