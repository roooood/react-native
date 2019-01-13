
class Fade extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: props.visible,
        isMounted: false
      };
    };
    componentDidMount() {
      this.setState({isMounted: true})
    }
    componentWillUnmount(){
      this.setState({isMounted: false})
    }
    componentWillMount() {
      this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
    }
  

    hide(){
        Animated.timing(this._visibility, {
            toValue: 0,
            duration: 300,
        }).start(() => {
          if (this.state.isMounted) 
            this.setState({ visible: false });
        });
    }
    show(){
        Animated.timing(this._visibility, {
            toValue: 1,
            duration: 300,
        }).start(() => {
          if (this.state.isMounted) 
            this.setState({ visible: true });
        });
    }
    render() {
      const { visible, style, children, ...rest } = this.props;
  
      const containerStyle = {
        opacity: this._visibility.interpolate({
          inputRange: [0, 1],
          outputRange:[0,1] ,
        }),
        transform: [
          {
            scale: this._visibility.interpolate({
              inputRange: [0, 1],
              outputRange: [1.1, 1],
            }),
          },
        ],
      };
  
      const combinedStyle = [containerStyle, style];
      return (
        <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
          {this.state.visible ? children : null}
        </Animated.View>
      );
    }
  }

  module.exports = Fade;