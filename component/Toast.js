

class Toast extends React.Component{
   constructor(){
      super();
      this.animateOpacityValue = new Animated.Value(0);
      this.state = { 
        ShowToast: false 
      }
      this.ToastMessage = '';
   }
 
   componentWillUnmount(){
      this.timerID && clearTimeout(this.timerID);
   }
 
   Show( message = "Happy", duration = 4000){
         this.ToastMessage = message;
         this.setState({ ShowToast: true }, () =>
         {
               Animated.timing
               (
                  this.animateOpacityValue,
                  { 
                    toValue: 1,
                    duration: 500
                  }
               ).start(this.Hide(duration))
         });
 
   }
 
   Hide = (duration) =>{
      this.timerID = setTimeout(() =>
      {
            Animated.timing
            (
               this.animateOpacityValue,
               { 
                 toValue: 0,
                 duration: 500
               }
            ).start(() =>
            {
               this.setState({ ShowToast: false });
               clearTimeout(this.timerID);
            })
      }, duration);      
   }
 
   render(){
      if(this.state.ShowToast) {
         return(
            <Animated.View style = {[ styles.animatedToastView, { opacity: this.animateOpacityValue, backgroundColor: this.props.backgroundColor },this.props.position]}>
               <Label numberOfLines = { 1 } style = {[ styles.ToastBoxInsideText, { color: this.props.textColor }]}>{ this.ToastMessage }</Label>
            </Animated.View>
         
        );
      }
      else{
         return null;
      }
   }
}
const styles = StyleSheet.create({ 
    animatedToastView: {
       marginHorizontal: 30,
       paddingHorizontal: 25,
       paddingVertical: 10,
       borderRadius: 25,
       zIndex: 9999,
       position: 'absolute',
       justifyContent: 'center',
       alignSelf: 'center',
    },
     
    ToastBoxInsideText:{
       fontSize: rF(10),
       alignSelf: 'stretch',
       textAlign: 'center'
    }
     
    });
module.exports = Toast;