class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <View style={[s.flex,s.c,sf.marT(10)]}>
                <ActivityIndicator size="small" color={theme('point')} /> 
            </View>
        );
    }
}
 
module.exports = Loading;