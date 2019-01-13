import Svg from '../../app/Svg'
class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    navigate(route){
        this.props.navigation.navigate(route)
    }
    componentDidMount() {
        
    }
    render() { 
        return (
            <View style={styles.container}>
                <Label style={sf.mar(10)} >{t('product.selectProduct')}</Label>
                <View style={[s.row,sf.mar(10),s.spaceA]} >
                    <TouchableOpacity onPress={()=>this.navigate('AddFood')} >
                        <ShadowView style={[styles.card,s.c,{width: rW(25),height: rW(25),shadowColor: '#EA2027',shadowOffset: { width: -15, height: 2,},shadowOpacity: 0.2,shadowRadius: 4}]}>
                            <Svg.Food size={rF(35)} color={theme('point')} />
                            <Label color={theme('point')} style={sf.marTop(10)} >{t('food')}</Label>
                        </ShadowView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navigate('AddTable')} >
                        <ShadowView style={[styles.card,s.c,{width: rW(25),height: rW(25),shadowColor: '#EA2027',shadowOffset: { width: -15, height: 2,},shadowOpacity: 0.2,shadowRadius: 4}]}>
                            <Svg.Table size={rF(35)} color={theme('point')} />
                            <Label color={theme('point')} style={sf.marTop(10)} >{t('table')}</Label>
                        </ShadowView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.navigate('AddEvent')} >
                        <ShadowView style={[styles.card,s.c,{width: rW(25),height: rW(25),shadowColor: '#EA2027',shadowOffset: { width: -15, height: 2,},shadowOpacity: 0.2,shadowRadius: 4}]}>
                            <Svg.Event size={rF(35)} color={theme('point')} />
                            <Label color={theme('point')} style={sf.marTop(10)} >{t('event')}</Label>
                        </ShadowView>
                    </TouchableOpacity>
                </View>
            </View>
         );
    }
}
 
module.exports = connect((state)=>(state))(Screen);