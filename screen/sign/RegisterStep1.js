const { width, height } = Dimensions.get('window');

class Screen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        resTypes: [],
        isLoading: true,
      }
      autoBind(this);

  }
  changeValue(key,val){
    let data = {};
    data[key] = val;
    this.props.dispatch(setRegData(data))
  }
  componentDidMount() {
    if(!('regCat' in Data)){
      Fetch('base_cat',(res)=>{
        if(res.status == 'success'){
          let tmp = [] , item;
          for(item of res.data){
            tmp.push({
              id : item.id ,
              title : item.title ,
              img : item.img ,
            })
          }
          Data.regCat = tmp;
          this.setState({isLoading:false,resTypes:tmp})
        }
      })
    }
    else{
      this.setState({isLoading:false,resTypes:Data.regCat})
    }
  }
  onResTypePress(id) {
    this.changeValue('res_type',id)
  }

  render() {

      return (
          <View style={styles.container}>
            <Label style={style.completeRegisterFormText}>{t('login.completeRegisterForm')}</Label>
            <Label style={style.selectTypeText}>{t('login.selectType')}</Label>

            <View style={style.resTypesHolder}>
              {
                 this.state.isLoading
                 ?<Loading />
                 :this.state.resTypes.map((data, index) => {
                      return (
                        <TouchableWithoutFeedback key={index} onPress={() => this.onResTypePress(data.id)}>
                          <View style={[style.eachResTypeHolder, {backgroundColor: (this.props.reg.res_type == data.id ? '#EA2027' : '#fff')}]}>
                            <View style={style.typeImageHolder}>
                              <Image
                                  resizeMode="cover"
                                  source={{uri:data.img}}
                                  style={style.typeImage}
                                />
                            </View>
                            <Label style={[style.typeNameText, {color: (this.props.reg.res_type == data.id ? '#fff' : '#EA2027')}]}>{data.title}</Label>
                          </View>
                        </TouchableWithoutFeedback>
                      )
                  })
               }
            </View>
          </View>
       );
  }
}

var style = StyleSheet.create({
  completeRegisterFormText: {
    fontSize: 14,
    color: '#676767',
    marginTop: 10,
    textAlign: 'center',
  },
  selectTypeText: {
    fontSize: 12,
    color: '#676767',
    marginTop: 15,
    textAlign: 'center',
  },
  resTypesHolder: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 20,
    marginBottom: 20,
  },
  eachResTypeHolder: {
    width: (width-55)/4,
    height: (width-55)/4,
    backgroundColor: '#fff',
    marginRight: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  typeNameText: {
    fontSize: rF(2.2),
    color: '#EA2027',
    marginTop: 2,
    textAlign: 'center',
  },
  typeImageHolder: {
    width: (width-55)/4-6,
    height: (width-55)/4-30,
    alignSelf: 'center',
    marginTop: 3,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  typeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },

});

module.exports = connect((state)=>(state))(Screen);
