import React, { Component } from 'react';
import {Text,View,ListView,FlatList,Dimensions,PanResponder,Animated,Easing,ActivityIndicator} from 'react-native';

let PageList = FlatList ;//||ListView;


const lang = {
    pullUpToLoad : 'برای بارگذاری بیشتر صفحه را بکشید',
    WaitLoading : 'در حال دریافت ، لطفا منتظر بمانید',
    noData : 'اطلاعاتی جهت نمایش وجود ندارد',
}
const pullStateTextArr={
    'noPull':'',
    'pulling':'pulling...',
    'pullOk':'pull Ok...',
    'pullRelease':'pullRelease ...',
};

const defaultDuration=400;


class PageListView extends Component{
    constructor(props){
        super(props);
        let {refreshEnable,pageLen}=this.props;
        this.refreshEnable=refreshEnable!==undefined?refreshEnable:!!pageLen;
        this.state={
            dataArr:[],
            dataSource: this.props.isListView?new ListView.DataSource({
                rowHasChanged: (r1, r2)=>r1 !== r2
            }):[],
            canLoad: true,
            isLoadding:true,
            ifShowRefresh:true,
            scrollEnabled:true,
            firstTime : true,
            page:2,
            width:0,
            height:0,
            pullState:'noPull',
            pullAni:new Animated.Value(-this.props.renderRefreshViewH),

            ifDataEmpty:false,
        };

        this.refreshEnable&&(this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
            onPanResponderMove: this.onPanResponderMove,
            onPanResponderRelease: this.onPanResponderRelease,
            onPanResponderTerminate: this.onPanResponderRelease,
            onShouldBlockNativeResponder: ()=>false
        }));

        this.pullOkH=parseInt(this.props.renderRefreshViewH*1.5);
        this.lastListY=0;
        autoBind(this)
    }
    static defaultProps={

        isListView:PageList===ListView,

        renderRow:null,

        refresh:null,

        loadMore:null,

        pageLen:0,

        allLen:0,

        //=z height:0,
        // width:0,

        dealWithDataArrCallBack:null,

        changeDataArr:null,
        
        ItemSeparatorComponent:null,

        renderLoadMore:null,

        renderNoMore:null,

        renderRefreshView:null,

        renderRefreshViewH:60,

        renderEmpty:null,

        inScrollView:false,

        refreshEnable:true,

        ifHide:false,
    };

    onLayout=(event)=>{
        if(this.state.width&&this.state.height){return}
        let {width, height} = event.nativeEvent.layout;
        this.setState({width,height});
    };

    render() {
        let {renderEmpty,renderRefreshViewH,renderRefreshView,inScrollView}=this.props;
        let {ifDataEmpty,width:WS,height:HS,pullState,pullAni}=this.state;
        if(inScrollView){return this.renderListView()}
        return(
            !!this.refreshEnable?
                <View style={[{flex:1},{zIndex:-99999}]} onLayout={this.onLayout}>
                    <Animated.View ref={aniView=>{this.aniView=aniView}} style={[{transform:[{translateY:pullAni}]},sf.wh(WS,HS+renderRefreshViewH)]}>
                        {renderRefreshView?renderRefreshView(pullState):this.renderRefreshView()}
                        <View style={[sf.wh(WS,HS)]} {...this.panResponder.panHandlers}>
                            {ifDataEmpty&&renderEmpty?renderEmpty():this.renderListView()}
                        </View>
                    </Animated.View>
                </View>:<View style={[s.f1]}>
                {ifDataEmpty&&renderEmpty?renderEmpty():this.renderListView()}
            </View>
        );
    }

    renderListView=()=>{
        let {dataSource,scrollEnabled}=this.state;
        let {isListView,pageLen}=this.props;
        let {renderFooter,renderRow,renderItem,renderItemS,onEndReached,onScroll}=this;
        let props={...this.props};
        if(!isListView){
            props={...props,renderItem,data:dataSource,ItemSeparatorComponent:renderItemS,keyExtractor:(item,index)=>index.toString(),scrollEnabled,onScroll,};
            if(pageLen){
                props={...props,onEndReached,onEndReachedThreshold:0.05,ListFooterComponent:renderFooter,ref:list=>{this.list=list}};
            }
        }else {
            props={...props,dataSource,renderRow,enableEmptySections:true,scrollEnabled,onScroll};
            if(pageLen){
                props={...props,onEndReached,onEndReachedThreshold:10,renderFooter,ref:list=>{this.list=list}};
            }
        }
        
        return <PageList {...props}/>
    };


    reLoad(){
        this.resetAni();
        this.setState({isLoadding: true});
        this.props.refresh((res)=>{
            this.setState({firstTime:false})
            if(!this.dealWithArr(res)){return}
            let len=res.length;
            this.updateData(res,len);
        });
    }
    componentDidMount(){
        this.resetAni();
        this.props.refresh((res)=>{
            this.setState({firstTime:false})
            if(!this.dealWithArr(res)){return}
            let len=res.length;
            this.updateData(res,len);
        });
    }

    onEndReached=()=> {
        if (this.state.canLoad /*&& !this.state.isLoadding*/) {
            this.loadMore();
        }
    };

    loadMore=()=>{
        this.setState({isLoadding: true});
        let page = this.state.page;
        this.props.loadMore(page,(res)=>{
            let len=res.length;
            this.setState({isLoadding:false,page:this.state.page+1});
            this.updateData(res,len,true);
        });
    };

    refreshCommon=(res)=>{
        this.setState({page:2,ifShowRefresh:false,pullState:'noPull'});
        this.resetAni();
        if(!this.dealWithArr(res)){return}
        let len=res.length;
        this.updateData(res,len);
    };

    refresh=()=>{
        this.props.refresh((res)=>{
            this.refreshCommon(res)
        });
    };

    manualRefresh=(res)=>{
        this.refreshCommon(res);
    };

    dealWithArr=(res)=>{
        let isArr=Array.isArray(res);
        if(!isArr){this.setState({ifDataEmpty:true});console.warn('PageListView The data source needs to be an array');return false;}
        let len=res.length;
        if(!len){this.setState({ifDataEmpty:true})}
        this.setState({ifDataEmpty:false});
        return true;
    };

    renderRow=(rowData,group,index)=>{
        let {renderRow,ItemSeparatorComponent,pageLen,allLen}=this.props;
        let notLast=parseInt(index)!==this.state.dataArr.length-1;
        let ifRenderItemS=false;
        if(ItemSeparatorComponent){
            if(allLen){
                ifRenderItemS=parseInt(index)!==allLen-1;
            }else {
                ifRenderItemS=(pageLen&&(this.state.canLoad||notLast))||(!pageLen&&notLast);
            }
        }
        return (<View>{renderRow(rowData,index)}{ifRenderItemS&&ItemSeparatorComponent()}</View>);
    };

    renderItem=({item,index})=>{
        return this.props.renderRow(item,index);
    };

    renderItemS=()=>{
        return this.props.ItemSeparatorComponent&&this.props.ItemSeparatorComponent();
    };

    renderFooter=()=>{
        if (!this.state.canLoad) {
            if(this.props.renderNoMore){
                return this.props.renderNoMore();
            }else {
                if(this.state.dataArr.length > 0)
                    return null;
                return (
                    <View style={[s.c,sf.bgc('#fff'),sf.pad(10),sf.br(8),s.row]}>
                        <Label style={[sf.color('#333'),sf.fontSize(12)]}>{lang.noData}</Label>
                    </View>
                );
            }
        } else {
            if(this.props.renderLoadMore){
                return this.props.renderLoadMore();
            }else {
                if(this.state.dataArr.length == 0 && this.state.firstTime == false)
                return ( <View style={[s.c,sf.bgc('#fff'),sf.pad(10),sf.br(8),s.row]}>
                        <Label style={[sf.color('#333'),sf.fontSize(12)]}>{lang.noData}</Label>
                    </View>
                    );
                else
                return (
                    <View style={[s.c,sf.bgc('#fff'),sf.pad(10),sf.br(8),s.row]}>
                        <Label style={[sf.color('#333'),sf.fontSize(12)]}>{this.state.isLoadding?lang.WaitLoading:lang.pullUpToLoad} ...</Label>
                        <ActivityIndicator animating={this.state.isLoadding} color='#333' size='small' style={[sf.marL(7)]}/>
                    </View>
                );
            }
        }
    };

    updateData=(res,len,loadMore=false)=>{
        let dataArr=[];
        let {pageLen,allLen}=this.props;
        if(loadMore){
            for(let i=0;i<len;i++){
                this.state.dataArr.push(res[i]);
            }
        }else {
            this.state.dataArr=res;
        }
        !!this.props.dealWithDataArrCallBack?(dataArr=this.props.dealWithDataArrCallBack(this.state.dataArr)):dataArr=this.state.dataArr;
        this.setState({
            dataArr:dataArr,
            dataSource:this.props.isListView?this.state.dataSource.cloneWithRows(dataArr):dataArr,
            canLoad:allLen?(allLen>this.state.dataArr):(pageLen?(len===pageLen):false),
        });
    };

    changeDataArr=(callBack)=>{
        let arr=JSON.parse(JSON.stringify(this.state.dataArr));
        let dataArr=callBack(arr);
        this.setState({
            dataArr:dataArr,
            dataSource:this.props.isListView?this.state.dataSource.cloneWithRows(dataArr):dataArr,
        });
    };

    onScroll=(e)=>{
        if(!this.refreshEnable){return}
        this.lastListY=e.nativeEvent.contentOffset.y;
        this.lastListY<=0&&this.setState({scrollEnabled:false})
    };

    onMoveShouldSetPanResponder=(e,gesture)=> {
        // if(!this.props.pageLen)return false;
        let {dy}=gesture;
        let bool;
        if(dy<0){
            if(this.state.pullState!=='noPull'){
                this.resetAni();
            }
            !this.state.scrollEnabled&&this.setState({scrollEnabled:true});
            bool=false;
        }else {
            if(this.state.pullState!=='noPull'){
                bool=true;
            }else {
                bool=!this.state.scrollEnabled||this.lastListY<1;
            }
        }
        return bool;
    };

    onPanResponderMove=(e,gesture)=>{
        this.dealWithPan(e,gesture);
    };
    dealWithPan=(e,gesture)=>{
        let {dy}=gesture;
        if(dy<0){
            if(this.state.pullState!=='noPull'){
                this.resetAni();
            }else {
                !this.state.scrollEnabled&&this.setState({scrollEnabled:true})
            }
        }else {
            let pullDis=gesture.dy/2;
            let pullOkH=this.pullOkH;
            let aniY=pullDis-this.props.renderRefreshViewH;
            this.state.pullAni.setValue(aniY);
            if(pullDis>pullOkH){
                this.setState({pullState:'pullOk'})
            }else if(pullDis>0){
                this.setState({pullState:'pulling'})
            }
        }
    };

    onPanResponderRelease=(e,gesture)=>{
        switch (this.state.pullState){
            case 'pulling':
                this.resetAni();
                this.setState({scrollEnabled:true});
                break;
            case 'pullOk':
                this.resetAniTop();
                this.setState({pullState:'pullRelease',scrollEnabled:true});
                this.refresh();
                break;
        }
    };

    resetAni=()=>{
        if(!this.refreshEnable){return}
        this.setState({pullState:'noPull'});
        // this.state.pullAni.setValue(this.defaultXY);
        this.resetList();
        Animated.timing(this.state.pullAni, {
            toValue: -this.props.renderRefreshViewH,
            // toValue: this.defaultXY,
            easing: Easing.linear,
            duration: defaultDuration/2
        }).start();
    };

    resetAniTop=()=>{
        this.resetList();
        Animated.timing(this.state.pullAni, {
            toValue: 0,
            // toValue: {x:0,y:0},
            easing: Easing.linear,
            duration: defaultDuration/2
        }).start();
    };

    resetList=()=>{
        this.list&&(this.props.isListView?this.list.scrollTo({y:0}):this.list.scrollToOffset({offset:0}));
    };

    scrollList=(y)=>{
        this.list&&(this.props.isListView?this.list.scrollTo({y:y}):this.list.scrollToOffset({offset:y}));
    };

    renderRefreshView=()=>{
        return(
            <View style={[sf.h(60),s.c,s.row]}>
                {this.state.pullState != 'noPull' &&
                    <ActivityIndicator animating={true} color='#333' size='small' style={[]}/>
                }
                {/* <Text allowFontScaling={false} style={{color:'#333',fontSize:15}}>{pullStateTextArr[this.state.pullState]}</Text> */}
            </View>
        );
    };

}


module.exports = PageListView;