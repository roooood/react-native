class Button extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          loading : false,
          haveLoading : this.props.loading || false
      }
  }
  onPress(){
      if(this.state.haveLoading)
          this.setState({loading:true})
      this.props.onPress(this)
  }
  hide(){
      this.setState({loading:false})
  }
  render(){
      let text  = this.props.text || this.props.children ;
      let size  = this.props.size || rF(6);
      let icon  = this.props.icon;
      let color = this.props.color || theme('pointSet');
      let width = this.props.width;
      let iconP = this.props.iconAlign || 'left';
      let backgroundColor    = this.props.background || theme('point');
      let padding  =  this.props.padding || {paddingVertical:rH(.1)};
      let borderRadius  =  this.props.radius || rW(3);
      let border = this.props.border ? {borderWidth: 1,borderColor: this.props.border}:{};

      if(this.props.icon){
          if(typeof this.props.icon == 'string')
          icon =  <Awesome5  color={color} size={size} name={this.props.icon} style={(iconP == 'right' ? {marginStart : 8} : {marginEnd : 8})} />
      }
      return(
          <TouchableOpacity activeOpacity={0.9} style={[styles.btn,{width: width ,backgroundColor,borderRadius},padding,border,this.props.style]} onPress={()=>this.onPress()}>
              {this.state.loading == true
              ?<ActivityIndicator size="small" style={{padding:rH(.9)}} color={color} />
              :<View style={styles.btnRow}>
                  {iconP == 'left' && icon}
                  <Label style={this.props.textStyle} size={size} color={color}>{text}</Label>
                  {iconP == 'right' && icon}
              </View>
              }
          </TouchableOpacity>
      )
}
}

const styles = StyleSheet.create({
  btnRow:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

  },
  btn:{
      margin:2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  btnInside:{
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
  },
});

module.exports = Button;
