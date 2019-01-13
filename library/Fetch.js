import axios from 'axios';
const Api = axios.create({
  baseURL : Url ,
  timeout : 5000
});


checkInfo = (res)=>{
  if(
      (res.data.status == 'error' && res.data.message == 'user not found')
    ||
      (res.data.status == 'error_validation' && ('token' in res.data.message))
    ){
      dropdown.alertWithType('error', '', t('sign.doLogin'))
      navigation.navigate('Sign')
    }
}
checkErr= (err)=>{
  if(err._timeOut == true){
    dropdown.alertWithType('error', '', t('timeOutErr'))
  }
}
function Http(page,data,callBack) {
  if(typeof callBack == 'undefined'){
    callBack = data;
    Api.get(page)
    .then((response)=>{
      callBack(response.data);
    })
    .catch((error)=>{
      checkErr(error);
      callBack(error);
    });
  }
  else{
    let config = {};

    if(data.multipart)
    {
      delete data.multipart;
      let temp = new FormData();
      for(i in data){
        temp.append(i,data[i])
      }
      config = {
        headers: { 'content-type': 'multipart/form-data'}
      };
      data = temp;
    }
    
    Api.post(page, data ,config)
    .then((response)=> {
      checkInfo(response);
      callBack(response.data);
    })
    .catch((error)=> {
      checkErr(error);
      callBack(error);
    });
  
  }
}

module.exports = Http;
