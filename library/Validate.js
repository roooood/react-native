class Validate{    
    persian(str){
        var test = /^[\u0600-\u06FF\s]+$/;
        if(!str.match(test)) 
            return false; 
        return true;
    }
    min(str,len){
        var ret = str.length >= len;
        return ret ;
    }
    len(str,len){
        var ret = str.length == len;
        return ret ;
    }
    numberic(str){
        var ret = Number(parseInt(str)) == str;
        return ret ;
    }
    date(str) {
        var regex = /\d{4}\/\d{2}\/\d{2}/;
        var ret = regex.test(str);
        return ret ;
    }
    email(str){
        var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        var ret = emailPattern.test(str);
        return ret ;
    }
    mobile(str){
        if(!this.numberic(str) || str.length != 11 || str[0]!= '0' || str[1]!='9' ){
            return false;
        }
        return true;
    }

    
}
module.exports = new Validate;
