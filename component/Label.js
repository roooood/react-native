class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let color = this.props.color || theme("color");
    let fontSize = this.props.size || dF;
    let align = this.props.align || "center";

    return (
      <Text
        {...this.props}
        style={[
          {
            fontFamily: fontFamily,
            fontSize: fontSize,
            textAlign: align,
            color: color
          },
          this.props.style
        ]}
      >
        {this.props.isBold ? (
          <Text style={{ fontWeight: "bold" }}>{this.props.children}</Text>
        ) : (
          this.props.children
        )}
      </Text>
    );
  }
}

module.exports = Label;
