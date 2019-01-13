class ListItem extends Component {
  constructor(props) {
    super(props);
    (this.items = this.props.items),
      (this.state = {
        selected: this.props.selected || ""
      });
  }
  componentDidMount() {}
  setDefault(key) {
    this.setState({ selected: key });
    this.props.onChange(key);
  }
  render() {
    width = this.props.width ? this.props.width : rW(29);
    radius = this.props.radius ? this.props.radius : rH(4);
    return (
      <View style={[{ height: rH(6) }, this.props.style]}>
        <ScrollView horizontal={true}>
          {Object.keys(this.items).map((key, index) => {
            return (
              <TouchableWithoutFeedback
                key={key}
                onPress={() => this.setDefault(key)}
              >
                <View
                  style={[
                    style.item,
                    this.state.selected == key && {
                      backgroundColor: "#0E699D"
                    },
                    { width: width, borderRadius: radius }
                  ]}
                >
                  <Label
                    color={this.state.selected == key ? "#fff" : "#0E699D"}
                  >
                    {this.items[key]}
                  </Label>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: "#0E699D",
    margin: rW(1),
    alignItems: "center",
    justifyContent: "center"
  }
});
export default ListItem;
