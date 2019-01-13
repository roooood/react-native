
class Background extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        return (
            <View style={{backgroundColor: Theme.background,position:'absolute',width: '100%', height: '100%',zIndex: -1}} /> 
        );
    }
}
 
module.exports =  Background;