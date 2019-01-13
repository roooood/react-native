
import Svg from '../../app/Svg'
import ListItem from '../../app/ListItem'

const listButtons = {
    food: t('food') ,
    desk: t('table'),
    event: t('event'),
} ;

const list = {food:'AddFood',desk:'AddTable',event:'AddEvent'}
class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discountType: 'food',
            listItems : []
        }
        autoBind(this);
    }
    gotoEdit(id){
        this.props.navigation.push(list[this.state.discountType],{id})
    }
    tabChange(key){
      this.setState({discountType: key}, ()=>{
        this.pageList.reLoad();
      })
    }
    refresh(callBack){
      this.getData((data)=>{
          callBack(data)
      })
    }
    loadMore(page,callBack){
      this.getData((data)=>{
          callBack(data)
      },page)
    }
    getData(callBack,page = 1){
        let data = {};
        data.token = this.props.user.token;
        data.page = page;
        let api = 'res_'+ this.state.discountType ;
        Fetch(api, data, (res)=>{
          if(res.status == 'success'){
              let temp=[], item;
              for(item of res.data){
                temp.push({
                  id: item.id,
                  name: item.title,
                  price: C.toMoney(item.price+"") + ' ' + t('category.rial'),
                  category: (this.state.discountType == "food") ? item.cat_title : '',
                  number: (this.state.discountType == "desk") ? item.count : '',
                  capacity: (this.state.discountType == "event") ? item.count : '',
                  image: item.file_name,
                });
              }
              callBack(temp)
            }
         })
    }

    renderRow(item){
        let Icon, title, value;
        switch(this.state.discountType){
          case 'food':
            Icon = Svg.Food;
            title = t('category.title');
            value = item.category;
            break;
          case 'desk':
            Icon = Svg.Table;
            title = t('category.count');
            value = item.number;
            break;
          case 'event':
            Icon = Svg.Event;
            title = t('category.capacity');
            value = item.capacity;
            break;
        }
        return(
        <View style={[styles.card,styles.shadow,sf.pad(5),sf.marV(5),sf.marH(5)]} >
            <View style={[s.row]} >
               <View style={style.image}>
                 <Image
                   resizeMode="cover"
                   source={{uri: item.image}}
                   style={{width: '100%', height: '100%', borderRadius: 8}}
                   />
               </View>
               <View style={style.info}>
                <View style={[s.row,sf.mar(5,5)]} >
                    <Icon size={rF(10)} color='#828387' />
                    <Label style={[sf.marLeft(5)]} color='#3A3B3F'>{item.name}</Label>
                </View>
                <View style={[s.row,sf.mar(5,5)]} >
                  <Label size={rF(3)} >{title}: </Label>
                  <Label size={rF(3.5)} color='#3A3B3F'>{value}</Label>
                </View>
                <View style={[s.row,sf.mar(5,5)]} >
                    <Label size={rF(4)} >{t('price')} : </Label>
                    <Label size={rF(5)} color='#3A3B3F'>{item.price} </Label>
                </View>
               </View>
            </View>
            <View style={[s.row,sf.marV(5),s.c]} >
                <Button style={{width:'45%'}} radius={20} text={t('discount.addDiscount')}  onPress={()=>this.goto('DiscountAdd',{name:item.name, id:item.id, discountType: this.state.discountType, image: item.image})}  />
                <Button style={{width:'45%'}} radius={20} background='#0E699D' text={t('edit')}  onPress={()=>this.gotoEdit(item.id)}  />
            </View>
        </View>
        );
    }

    goto(route,data){
        this.props.navigation.navigate(route,data)
    }

    render() {
        return (
            <View style={[styles.container,sf.pad(10)]}>
                <ListItem items={listButtons} onChange={this.tabChange} selected="food" />
                <View style={{flex:1,marginTop:5}}>
                    <PageList
                        ref = {(ref)=>this.pageList = ref}
                        pageLen={10}
                        renderRow={this.renderRow}
                        refresh={this.refresh}
                        loadMore={this.loadMore}
                    />
                </View>
            </View>
         );
    }
}

const style = StyleSheet.create({
    image:{
        flex:.25 ,
        backgroundColor: '#eee' ,
        height:rH(12),
        borderRadius: 8,
    },
    info:{
        flex:.75 ,
        paddingStart:rW(1)
    },

});
module.exports = connect((state)=>(state))(Screen);
