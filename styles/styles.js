import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

//获取屏幕宽高
const {width:w, height:h}=Dimensions.get('window');
//当前设备平台
let isios=Platform.OS==='ios';

//样式的固定对应属性
const styles=StyleSheet.create({
    //绝对定位
    flex:{flex:1}, f:{flex:1},
    grow: { flexGrow: 1},
    abs:{position:'absolute'},
    absTop: {position:'absolute',top:0},absT: {position:'absolute',top:0},
    absBottom: {position:'absolute',bottom:0},absB: {position:'absolute',bottom:0},
    absLeft: {position:'absolute',left:0},absL: {position:'absolute',left:0},
    absRight: {position:'absolute',right:0},absR: {position:'absolute',right:0},

    //相对定位
    rel:{position:'relative'},

    //对子组件的布局方式
    spaceB:{justifyContent:"space-between"},spaceBetween:{justifyContent:"space-between"},sB:{justifyContent:"space-between"},
    spaceA:{justifyContent:"space-around"},spaceAround:{justifyContent:"space-around"},sA:{justifyContent:"space-around"},
    row:{flexDirection:'row'},
    wrap:{flexWrap:'wrap'},
    //对子组件的对齐方式:开头对其,尾部对齐,居中对齐,等...
    center:{justifyContent:'center',alignItems:'center'},c:{justifyContent:'center',alignItems:'center'},
    aliCenter:{alignItems:'center'},aliC:{alignItems:'center'},
    aliEnd:{alignItems:"flex-end"},aliE:{alignItems:"flex-end"},
    justCenter:{justifyContent:'center'},justC:{justifyContent:'center'},
    justEnd:{justifyContent:"flex-end"},justE:{justifyContent:"flex-end"},

    //对自身组件相对父组件的对齐方式:对齐到开头,结尾,居中
    aliSelfStart:{alignSelf:'flex-start'},aliSS:{alignSelf:'flex-start'},
    aliSelfCenter:{alignSelf:'center'},aliSC:{alignSelf:'center'},
    aliSelfEnd:{alignSelf:'flex-end'},aliSE:{alignSelf:'flex-end'},

    //超出部分隐藏/显示
    hidden:{overflow:'hidden'},
    show:{overflow:'visible'},visible:{overflow:'visible'},

    // 图片
    cover:{resizeMode:'cover'},
    contain:{resizeMode:'contain'},

    //文字对齐方式
    textCenter:{textAlign:'center'},tC:{textAlign:'center'},
    textLeft:{textAlign:'left'},tL:{textAlign:'left'},
    textRight:{textAlign:'right'},tR:{textAlign:'right'},

    //透明度0
    opa0:{opacity:0},

    //宽高
    w:{width:w},width:{width:w},
    w100:{width:'100%'},
    w50:{width:'50%'},
    h:{height:h},height:{height:h},
    h100:{height:'100%'},
    wh100:{width:'100%',height:'100%'},
    wh0:{width:0,height:0},//没有尺寸的宽高
    whAll:{width:w,height:isios?h:h-25},//占满整屏的宽高

    //透明背景色
    bg0000:{backgroundColor:'#0000'},bg0:{backgroundColor:'#0000'},
});


//宽高
//宽
function szx(juli){
    return {zIndex:juli}
}
function sw(juli){
    return {width:juli}
}
//高
function sh(juli){
    return {height:juli}
}
//宽高相同时(或同时指定宽高时)
function swh(...juli){
    switch (juli.length){
        case 1:return {height:juli[0],width:juli[0]};
        case 2:return {width:juli[0],height:juli[1]};
    }
}

// 根据传进来的值设置透明度
function sop(opacity){
    return {opacity:opacity}
}

// 根据传进来的颜色设置背景色
function sbgc(colorStr){
    return {backgroundColor:colorStr}
}

// 根据传进来的颜色设置文字颜色
function scolor(colorStr){
    return {color:colorStr}
}
//设置根据设备宽高自适应的字体大小
function sfontSize(fontSize){
    return {fontSize:fontSize}
}
//设置根据设备宽高自适应的字体行高大小
function slineH(lineHeight){
    return {lineHeight:lineHeight}
}
//设置文字字体
function sfontF(fontFamily) {
    return {fontFamily:fontFamily};
}
//统一设置文字所有属性
function stext(fontSize=null,color=null,lineHeight=null,fontFamily=null,transparent=true) {
    let o={};
    fontSize&&(o={...o,fontSize});color&&(o={...o,color});lineHeight&&(o={...o,lineHeight});fontFamily&&(o={...o,fontFamily});transparent&&(o={...o,backgroundColor:'#0000'});
    return o;
}


//绝对定位
//上
function sabsTop(juli){
    return {position:'absolute',top:juli}
}
//下
function sabsBottom(juli){
    return {position:'absolute',bottom:juli}
}
//左
function sabsLeft(juli){
    return {position:'absolute',left:juli}
}
//右
function sabsRight(juli){
    return {position:'absolute',right:juli}
}
//占满整个父组件
function sabsAll(...juliArr){
    switch (juliArr.length){
        case 0:return {position:'absolute',top:0,right:0,bottom:0,left:0};
        case 1:return {position:'absolute',top:juliArr[0],right:0,bottom:0,left:0};
        case 2:return {position:'absolute',top:juliArr[0],right:juliArr[1],bottom:0,left:0};
        case 3:return {position:'absolute',top:juliArr[0],right:juliArr[1],bottom:juliArr[2],left:0};
        case 4:return {position:'absolute',top:juliArr[0],right:juliArr[1],bottom:juliArr[2],left:juliArr[3]};
    }
}

//相对定位
//上
function srelTop(juli){
    return {position:'relative',top:juli}
}
//下
function srelBottom(juli){
    return {position:'relative',bottom:juli}
}
//左
function srelLeft(juli){
    return {position:'relative',left:juli}
}
//右
function srelRight(juli){
    return {position:'relative',right:juli}
}

//绝对定位或相对定位时设置上下左右的距离
//上下左右
function spos(juli) {
// global.spos=function (juli) {
    let pos={};
    let d={t:'top',b:'bottom',l:'left',r:'right'};
    for (let i in juli){
        if(d[i]){pos[d[i]]=juli[i]}
    }
    return pos;
}
//上
function sTop(juli){
    return {top:juli}
}
//下
function sBottom(juli){
    return {bottom:juli}
}
//左
function sLeft(juli){
    return {left:juli}
}
//右
function sRight(juli){
    return {right:juli}
}

//外间距
//全部
function smar(...juli){
    switch(juli.length){
        case 1:return {margin:juli[0]};
        case 2:return {marginVertical:juli[0],marginHorizontal:juli[1]};
        case 3:return {marginTop:juli[0],marginHorizontal:juli[1],marginBottom:juli[2]};
        case 4:return {marginTop:juli[0],marginRight:juli[1],marginBottom:juli[2],marginLeft:juli[3]};
    }
}
//上
function smarTop(juli){
    return {marginTop:juli}
}
function smarS(juli){
    return {marginStart:juli}
}
function smarE(juli){
    return {marginEnd:juli}
}
//下
function smarBottom(juli){
    return {marginBottom:juli}
}
//上下
function smarV(juli){
    return {marginVertical:juli}
}
//左
function smarLeft(juli){
    return {marginLeft:juli}
}
//右
function smarRight(juli){
    return {marginRight:juli}
}
//左右
function smarH(juli){
    return {marginHorizontal:juli}
}

//内间距
//全部
function spad(...juli){
    switch(juli.length){
        case 1:return {padding:juli[0]};
        case 2:return {paddingVertical:juli[0],paddingHorizontal:juli[1]};
        case 3:return {paddingTop:juli[0],paddingHorizontal:juli[1],paddingBottom:juli[2]};
        case 4:return {paddingTop:juli[0],paddingRight:juli[1],paddingBottom:juli[2],paddingLeft:juli[3]};
    }
}
//水平间距
function spadH(juli){
    return {paddingHorizontal:juli}
}
//竖直间距
function spadV(juli){
    return {paddingVertical:juli}
}
//上
function spadTop(juli){
    return {paddingTop:juli}
}
function spadS(juli){
    return {paddingStart:juli}
}
function spadE(juli){
    return {paddingEnd:juli}
}
//下
function spadBottom(juli){
    return {paddingBottom:juli}
}
//左
function spadLeft(juli){
    return {paddingLeft:juli}
}
//右
function spadRight(juli){
    return {paddingRight:juli}
}

//边框
//全部属性
function sb(color,radius,width=1){
    return {borderColor:color,borderWidth:width,borderRadius:radius}
}
//边框宽
function sbw(width){
    return {borderWidth:width}
}
//边框颜色
function sbc(color){
    return {borderColor:color,}
}

//圆角
//全部
function sbr(...juli){
    switch(juli.length){
        case 1:return {borderRadius:juli[0]};
        case 2:return {borderTopLeftRadius:juli[0],borderTopRightRadius:juli[0],borderBottomLeftRadius:juli[1],borderBottomRightRadius:juli[1]};
        case 3:return {borderTopLeftRadius:juli[0],borderTopRightRadius:juli[1],borderBottomLeftRadius:juli[2],borderBottomRightRadius:juli[1]};
        case 4:return {borderTopLeftRadius:juli[0],borderTopRightRadius:juli[1],borderBottomLeftRadius:juli[2],borderBottomRightRadius:juli[3]};
    }
    // return {borderRadius:juli}
}


//设置样式的方法
const styleFunctions={
    //宽高相关
    zx:szx,zIndex:szx,//宽度
    w:sw,width:sw,//宽度
    h:sh,height:sh,//高度
    wh:swh,//同时指定宽高
    //透明度,背景色
    op:sop,opacity:sop,//设置opacity透明度
    bgc:sbgc,//根据传进来的颜色设置背景色
    //文字相关属性
    c:scolor,color:scolor,//根据传进来的颜色设置文字颜色
    fz:sfontSize,fontSize:sfontSize,//设置根据设备宽高自适应的字体大小
    lh:slineH,lineHeight:slineH,//设置根据设备宽高自适应的字体行高大小
    ff:sfontF,fontFamily:sfontF,//设置文字字体
    text:stext,//统一设置文字所有属性
    //绝对定位相关
    absT:sabsTop,absTop:sabsTop,//上
    absB:sabsBottom,absBottom:sabsBottom,//下
    absL:sabsLeft,absLeft:sabsLeft,//左
    absR:sabsRight,absRight:sabsRight,//上
    absAll:sabsAll,//占满整个父组件
    //相对定位相关
    relT:srelTop,relTop:srelTop,//上
    relB:srelBottom,relBottom:srelBottom,//下
    relL:srelLeft,relLeft:srelLeft,//左
    relR:srelRight,relRight:srelRight,//上
    //绝对定位或相对定位时设置上下左右的距离(单独设置上下左右的距离)
    T:sTop,top:sTop,//上
    B:sBottom,Bottom:sBottom,//下
    L:sLeft,Left:sLeft,//左
    R:sRight,Right:sRight,//右
    pos:spos,position:spos,//上下左右一起设置
    //外间距相关
    marT:smarTop,marTop:smarTop,//上
    marS:smarS,//上
    marE:smarE,//上
    marB:smarBottom,marBottom:smarBottom,//下
    marV:smarV,marVertical:smarV, //上下(竖直方向)
    marL:smarLeft,marLeft:smarLeft,//左
    marR:smarRight,marRight:smarRight,//右
    marH:smarH,marHorizontal:smarH,//左右(水平方向)
    marAll:smar,mar:smar,//上下左右一起设置
    //内间距相关
    padT:spadTop,padTop:spadTop,//上
    padS:spadS,//上
    padE:spadE,//上
    padB:spadBottom,padBottom:spadBottom,//下
    padV:spadV,padVertical:spadV, //上下(竖直方向)
    padL:spadLeft,padLeft:spadLeft,//左
    padR:spadRight,padRight:spadRight,//右
    padH:spadH,padHorizontal:spadH,//左右(水平方向)
    padAll:spad,pad:spad,//上下左右一起设置
    //边框相关
    bw:sbw,borderWidth:sbw,//设置边框宽
    bc:sbc,borderColor:sbc,//设置边框颜色
    br:sbr,borderRadius:sbr,//设置边框圆角(可分别设置每个角的圆角)
    b:sb,border:sb,//边框的(颜色,圆角,宽度)属性一起设置
};

function setProperty(invadeScale) {
    //flex布局1-12
    for (let i=1;i<=12;i++){
        let name='f'+i;
        invadeScale<2?(styles[name]={flex:i}):(global[name]={flex:i});
    }

    //白到黑的灰色颜色
    let blackWhiteBgArr=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'],bgArr=blackWhiteBgArr;
    for (let i=0;i<bgArr.length;i++){
        let c=bgArr[i],a=''+c+c+c,name1='bg'+a,name2='c'+a;
        // 白到黑的灰色背景颜色
        invadeScale<2?(styles[name1]={backgroundColor:'#'+a}):(global[name1]={backgroundColor:'#'+a});
        //白到黑的灰色文字颜色
        invadeScale<2?(styles[name2]={color:'#'+a}):(global[name2]={color:'#'+a});
    }

    //按屏幕宽高比例计算出的宽高
    let whArr=[1,2,3,4,5,6,7,8,9,10,11,12,16,32,64,128];
    // if(invadeScale<2){styles.w=w;styles.h=h}else{global.h=h;global.w=w;}
    for (let i=0;i<whArr.length;i++){
        let name1='w'+whArr[i],name2='h'+whArr[i];
        //宽度
        invadeScale<2?(styles[name1]=w/whArr[i]):(global[name1]=w/whArr[i]);
        //高度
        invadeScale<2?(styles[name2]=h/whArr[i]):(global[name2]=h/whArr[i]);
    }
}

//定义类
class Styles {
    /**
     * 构造函数
     * @param invadeScale invadeScale:表示是否为侵入式导入,侵入式导入等级/范围,分为3级(0:非侵入式导入,1:部分侵入式导入,2:完全侵入式导入)(推荐使用1->部分侵入式导入)
     0->非侵入式导入:let {s,sf}=new Styles(0);或取别名let {s:styles,sf:styleFunctions}=new Styles(0);
     优点:不占用任何一个全局变量,不会造成全局变量污染.IDE中可以通过s.,sf.来获得属性名,方法名,方法参数的提示
     缺点:每个需要用到的文件中都要import,new一次.每个属性名和方法名前面都要写s.,sf.比较麻烦.如果你自己取更长的别名的话可能使代码变长
     1->部分侵入式导入:new Styles(1);或取别名new Styles(1,'styles','styleFunctions');
     优点:只用在主入口文件(可能是index.js,index.ios.js,index.android.js,Main.js等等,具体看自己的情况)中import,new一次,以后就可以在项目中的所有文件使用.IDE中可以通过s.,sf.来获得属性名,方法名,方法参数的提示
     缺点:会占用s,sf(或者你取的别名)的两个全局变量.每个属性名和方法名前面都要写s.,sf.比较麻烦.
     2->完全侵入式导入:new Styles(2);或取别名new Styles(2,'styles');
     优点:调用设置样式的方法时不用再sf.spad(15),直接spad(15).获得屏幕的宽高直接w,h,而不用s.w,s.h简单方便.
     缺点:会占用s,以及一系列s开头的方法的全局变量,以及一系列颜色,flex布局,宽高的全局变量,造成全局变量污染.IDE中不能用sf.来获得方法名,方法参数的提示,对方法名不熟悉的话也会造成一定的困扰.
     * @param stylesName 给存放样式固定属性的对象取的名称,默认为's'.
     * @param styleFunctionsName 给存放样式方法的对象取的名称,默认为'sf'.
     */
    constructor(invadeScale,stylesName='s',styleFunctionsName='sf') {
        setProperty(invadeScale);
        if(!invadeScale){this[stylesName]=styles;this[styleFunctionsName]=styleFunctions;return}
        invadeScale>=1&&(global[stylesName]=styles);
        invadeScale===1&&(global[styleFunctionsName]=styleFunctions);
        if(invadeScale===2){
            for (let k in styleFunctions){
                global[k]=styleFunctions[k];
            }
        }
    }
}
export default Styles