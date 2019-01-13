import {createMaterialTopTabNavigator} from 'react-navigation';

const AddProduct = require('./addProduct');
const ListProduct = require('./listProduct');

class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info : {

            }
         }
    }
    componentDidMount() {

    }
    render() {
        const Tabs = createMaterialTopTabNavigator(
            {
              add : {
              screen: ()=><AddProduct navigation={this.props.navigation} />,
                navigationOptions: {
                  title: t('product.addProduct'),
                },
              },
              list : {
                screen: ()=><ListProduct navigation={this.props.navigation} />,
                navigationOptions: {
                    title: t('product.listProduct'),
                }
              },
            },
            {
              initialRouteName: 'list',
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
                  fontFamily:fontFamily
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
               <Header title={t('product.productManagment')} left='back' />
               <Tabs/>
            </View>
         );
    }
}

module.exports = connect((state)=>(state))(Screen);
