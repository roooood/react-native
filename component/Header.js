import { withNavigation } from 'react-navigation';
class Header extends Component {
    constructor(props){
        super(props);
    }
    goBack(){
        if(this.props.onBack)
            this.props.onBack();
        else
            this.props.navigation.goBack();
    }
    renderRight(){
        if(this.props.right == 'menu'){
            return (
                <TouchableOpacity style={{padding:5}} activeOpacity={0.9} onPress={()=>{this.props.navigation.openDrawer();}}>
                    <Awesome5 size={25} color={theme('headerColor')} name='bars' />
                </TouchableOpacity>
            )
        }
        else if(this.props.right){
            return(this.props.right)
        }
        else
            return null;
    }
    renderLeft(){
        if(this.props.left == 'back'){
            return (
                <TouchableOpacity style={{padding:5}} activeOpacity={0.9} onPress={()=>this.goBack()}>
                    <Awesome5  size={20} color={theme('headerColor')} name='chevron-left' />
                </TouchableOpacity>
            )
        }
        else if(this.props.left){
            return(this.props.left)
        }
        else
            return null;
    }
    renderCenter(){
        if(this.props.center == 'logo'){
            return (
                null
            )
        }
        else if(this.props.center){
            return(this.props.center)
        }
        else
            return null;
    }
    renderTitle(){
        return this.props.title ? <Label isBold color={theme('headerColor')}>{this.props.title}</Label>:null;
    }
    render() {
      const height = this.props.height != null ? this.props.height: rH(8);
      return (
        <View style={[styles.header,{height:height,backgroundColor:theme('header'),width:'100%'},this.props.style]}>
            <View style={{flex:2,flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start' }}>
                {this.renderRight()}
            </View>
            <View style={{flex:6,flexDirection: 'row',alignItems: 'center',justifyContent: 'center' }}>
                {this.renderCenter()}
                {this.renderTitle()}
            </View>
            <View style={{flex:2,flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end' }}>
                {this.renderLeft()}
            </View>
        </View>
      );
    }
}

module.exports = withNavigation(Header);

const styles = StyleSheet.create({
    header:{
    paddingHorizontal:10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
});