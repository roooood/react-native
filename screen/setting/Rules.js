import ViewMoreText from './ViewMoreText';

const { width, height } = Dimensions.get('window');


class Rules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesArray: [],
    };
  }

  componentDidMount() {
    Fetch('rules',(data)=>{
      if(data.status == 'success'){
        let temp = [] , item;
        for(item of data.data){
          temp.push({
            title : item.title,
            description : item.content,
          });
        }
        this.setState({rulesArray:temp})
      }
    });
  }

  renderViewMore(onPress){
    return(
      <TouchableOpacity style={{marginTop:10}} onPress={onPress}  ><Label color='#369' isBold size={rF(5)} align='center'>بیشتر</Label></TouchableOpacity>
    )
  }
  renderViewLess(onPress){
    return(
      <TouchableOpacity style={{marginTop:10}} onPress={onPress}  ><Label color='tomato' isBold size={rF(5)} align='center'>کمتر</Label></TouchableOpacity>
    )
  }

  render() {
    const { rulesArray } = this.state;
    return (
      <View style={styles.container}>
        <Header {...this.props} title='قوانین و مقررات' left='back' />

        <ScrollView style={style.insideScrollViewContainer}>
          <KeyboardAvoidingView style={{flex:1}} >

            {rulesArray.map((data, index, rulesArray) => {
                return (
                  <View key={index} style={[style.insideContainer,
                                          {marginBottom: (rulesArray.length == index+1 ? 25 : 10)}]}>
                    <Label style={style.ruleTitleText}>{data.title}</Label>

                    <View style={[style.descriptionHolder]}>
                      <ViewMoreText
                        numberOfLines={2}
                        renderViewMore={this.renderViewMore}
                        renderViewLess={this.renderViewLess}>
                          <Label style={style.descriptionText}>{data.description}</Label>
                      </ViewMoreText>
                    </View>
                  </View>
                )
            })}

          </KeyboardAvoidingView>
        </ScrollView>

      </View>
    );
  }
}

const style = StyleSheet.create({

  insideScrollViewContainer: {
    flex: 1,
    paddingTop: 10
  },
  insideContainer: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 3,
    padding: 10,
  },

  ruleTitleText: {
    fontSize: rF(4),
    color: theme('point'),
    textAlign: 'left',
    lineHeight: 30,
  },
  descriptionHolder: {
    width: width-50,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: rF(3),
    color: '#7B7677',
    textAlign: 'left',
    lineHeight: 20,
  },


  moreButtonHolder: {
    width: '50%',
    height: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  moreButtonText: {
    fontSize: 11,
    color: '#212121',
  },
});

module.exports =  Rules;
