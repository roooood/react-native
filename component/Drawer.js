import {NavigationActions} from 'react-navigation';

const Guest = [
    {icon:'sign-in-alt',title:L.drawer.signin,link:'signin'},
    {icon:'user-plus',title:L.drawer.signup,link:'signup'},
    'hr',
    {icon:'utensils',title:L.drawer.discountFood},
    {icon:'columns',title:L.drawer.discountTable},
    {icon:'calendar-alt',title:L.drawer.discountEvent},
    'hr',
    {icon:'question-circle',title:L.drawer.question},
    {icon:'info-circle',title:L.drawer.aboutus},
    {icon:'file',title:L.drawer.policy},
];

export default class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.gotoScreen = this.gotoScreen.bind(this);
    };
    gotoScreen(route,data={}){
        this.props.navigation.closeDrawer();
        const navigateAction = NavigationActions.navigate({
           routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.navigate(route)
    }
    menuItem(i,icon,name,link,leftIcon='angle-left'){
        return (
        <View key={i} style={styles.row}>
        <TouchableOpacity style={styles.row} activeOpacity={0.9} onPress={()=>{this.gotoScreen(link);}}>
            <View style={styles.right}> 
                <Icon size={15} color='#999' name={icon} />
                <Label style={{marginHorizontal:10}}color='#999'>{name}</Label>
            </View>
            <View style={styles.left}>
                <Icon size={15} color='#999' name={leftIcon} />
            </View>
            </TouchableOpacity>
        </View>
        );
    }
    render() {
        return (
            <View style={styles.container}> 
                <View style={styles.empty} >
                </View>
                <ScrollView continerStyle={{flexGrow:1}}>
                {
                    Guest.map((item,i) =>{
                        return item == 'hr' ? <View key={i} style={styles.hr} />:this.menuItem(i,item.icon,item.title,item.link);
                    })
                }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex:1,
    },
    empty:{
        backgroundColor:'#ddd',
        height:rH(20),
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        justifyContent: 'space-between',
        marginVertical:5,
    },
    right:{
        alignSelf: 'flex-start',
        marginStart:10,
        flexDirection: 'row',
        alignItems:  'center',
        justifyContent: 'center',
        height:'100%'
    },
    left:{
        alignSelf: 'flex-end',
        flexDirection: 'row',
        marginEnd:10,
        alignItems:  'center',
        justifyContent: 'center',
        height:'100%'
    },
    hr:{
        width:'100%',
        height:1,
        borderTopWidth:1,
        borderTopColor:'#999',
        marginVertical:10,
    }
});