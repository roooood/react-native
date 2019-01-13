

export function confirm(text,yesBack,noBack){
    popup.confirm({
        title: t('warning'),
        content: [text],
        ok: {
            text: t('yes'),
            style: {
                color: '#369'
            },
            callback: () => {
                yesBack();
            },
        },
        cancel: {
            text: t('no'),
            style: {
                color: 'tomato'
            },
            callback: () => {
                if(noBack != null)
                    noBack()
            },
        },
        
    });
}

export function toMoney(amount) {
    if(amount.length <3 )
        return amount
    return (""+amount).replace(/,/g,'').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  }
export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}
global.rH = (height)=>{
    return  DeviceHeight*(height/100);
}
  
global.rW = (width)=>{
    return  DeviceWidth*(width/100);
}

global.rF = (font)=>{
	let plus = DeviceHeight/100;
	font += Math.ceil(plus);
    return font;
}
global.dF = rF(5);

global.p = (ob)=> {alert(JSON.stringify(ob))}