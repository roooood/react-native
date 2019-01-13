const {Input} = Form;
class Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            edit : 0
        }
        autoBind(this);
    }
    confirmDelete(id){
        C.confirm(t('confirmDelete'),()=>{this.delete(id)})
    }
    add(){
       this.setState({
            title: '',
            edit : 0
        })
       this.addModal.show()
    }
    reload(){
        this.pageList.reLoad();
    }
    addCategory(loading){
        if(this.state.title.length < 3){
            loading.hide();
            dropdown.alertWithType('warn', '', t('category.invalidTitle'))
            return;
        }
        Fetch('res_cat_add',{token:this.props.user.token,name:this.state.title},(res)=>{
            loading.hide();
            if(res.status == 'success'){
              dropdown.alertWithType('success', '', t('successSubmit'))
              this.setState({title:''});
              this.addModal.hide()
              this.reload();
            }
            else{
              dropdown.alertWithType('error', '', t('errorSubmit'))
            }
        })
    }
    edit(id,title){
        this.setState({edit:id,title:title})
        this.editModal.show()
    }
    editCategory(loading){
        if(this.state.title.length < 3){
            loading.hide();
            dropdown.alertWithType('warn', '', t('category.invalidTitle'))
            return;
        }
        Fetch('res_cat_update',{token:this.props.user.token,cat_id:this.state.edit,name:this.state.title},(res)=>{
            loading.hide();
            if(res.status == 'success'){
              dropdown.alertWithType('success', '', t('successEdit'))
              this.editModal.hide()
              this.reload();
            }
            else{
              dropdown.alertWithType('error', '', t('errorSubmit'))
            }
          })
    }
    delete(id){
        Fetch('res_cat_delete',{token:this.props.user.token,cat_id:id},(res)=>{
            if(res.status == 'success'){
                this.reload();
            }
        });

    }
    componentDidMount() {

    }
    renderRow(item){
        return(
        <View style={[styles.card,styles.shadow,sf.pad(5),sf.mar(2),sf.marV(5)]} >
            <View style={[s.row]} >
               <View style={style.info}>
                <Label size={rF(8)} color='#3A3B3F' align='left'>{item.title}</Label>
                <Label size={rF(3)} color='#616265' align='left'>{item.info || ''}</Label>
               </View>
               <View style={style.action}>
                <Button style={{}} size={rF(4)} color='#0E699D' border='#0E699D' radius={3} background='#fff' text={t('edit')}  onPress={()=>this.edit(item.id,item.title)}  />
                <Button style={{}} size={rF(4)} color='#EA2027' border='#EA2027' radius={3} background='#fff' text={t('delete')}  onPress={()=>this.confirmDelete(item.id)}  />
               </View>
            </View>
        </View>
        );
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

        Fetch('res_cats',data,(res)=>{
            if(res.status == 'success'){
                callBack(res.data)
            }
            else{

            }
        })
    }
    changeValue(key,value){
        this.setState(state => {
            state[key] = value.toString();
            return state
        })
    }

    render() {
        return (
            <View style={styles.container}>
              <Header title={t('category.categoryManagement')} left='back' />
              <Modal ref={(ref)=>this.addModal=ref} >
                <Label size={rF(8)} color='#0E699D' >{t('category.addCategory')}</Label>
                <Label style={sf.marT(15)} size={rF(3)} color='#616265' >{t('category.insertCategoryInput')}</Label>
                <Input
                    onChange = {(val)=>this.changeValue('title',val)}
                    value    = {this.state.title}
                    style    = {{flex:1}}
                />
                <Button loading style={[s.w100,sf.h(40),sf.marT(50)]} radius={5} text={t('add')}  onPress={this.addCategory}  />
              </Modal>
              <Modal ref={(ref)=>this.editModal=ref} >
                <Label size={rF(8)} color='#0E699D' >{t('category.editCategory')}</Label>
                <Label style={sf.marT(15)} size={rF(3)} color='#616265' >{t('category.insertCategoryInput')}</Label>
                <Input
                    onChange = {(val)=>this.changeValue('title',val)}
                    value    = {this.state.title}
                    style    = {{flex:1}}
                />
                <Button loading style={[s.w100,sf.h(40),sf.marT(50)]} radius={5} text={t('editDone')}  onPress={this.editCategory}  />
              </Modal>
              <View style={[s.flex,sf.marT(10),sf.padH(10)]}>
                <PageList
                    ref = {(ref)=>this.pageList = ref}
                    pageLen={10}
                    renderRow={this.renderRow}
                    refresh={this.refresh}
                    loadMore={this.loadMore}
                />
              </View>
              <Button radius={1} style={{height:rH(8),margin:0}} icon='plus' text={t('category.addNewCategory')}  onPress={this.add}  />
            </View>
         );
    }
}
const style = StyleSheet.create({
    action:{
        flex:.25 ,
    },
    info:{
        paddingHorizontal:5,
        flex:.75 ,
        justifyContent: 'space-between',
    },

});
module.exports = connect((state)=>(state))(Screen);
