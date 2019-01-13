import {createMaterialTopTabNavigator} from 'react-navigation';

const Transaction = require('./Transaction');

class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {

         }
    }
    componentDidMount() {

    }
    render() {
        const Tabs = createMaterialTopTabNavigator(
            {
              today : {
              screen: ()=><Transaction navigation={this.props.navigation} />,
                navigationOptions: {
                  title: t('transaction.today'),
                },
              },
              week : {
                screen: ()=><Transaction navigation={this.props.navigation} />,
                navigationOptions: {
                    title: t('transaction.week'),
                }
              },
              month : {
                screen: ()=><Transaction navigation={this.props.navigation} />,
                navigationOptions: {
                    title: t('transaction.month'),
                }
              },
              year : {
                screen: ()=><Transaction navigation={this.props.navigation} />,
                navigationOptions: {
                    title: t('transaction.year'),
                }
              },
            },
            {
              initialRouteName: 'today',
              animationEnabled: true,
              swipeEnabled: true,
              tabBarColor:'#fff',
              navigationOptions: ({ navigation }) => ({
              }),
              tabBarOptions: {
                indicatorStyle : {
                  backgroundColor:theme('point')
                },
                inactiveTintColor: theme('color'),
                activeTintColor: theme('point'),
                labelStyle: {
                  fontFamily: fontFamily
                },
                style: {
                  borderWidth:0,
                  backgroundColor: '#fff',
                },
              }
            }
          );
        return (
            <View style={styles.container}>
               <Header title={t('transaction.transactionManagement')} left='back' />
               <Tabs/>
            </View>
         );
    }
}

module.exports = connect((state)=>(state))(Screen);
