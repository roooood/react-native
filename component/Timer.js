
export default class Timer extends React.Component{
    constructor(props) {
        super(props);
        this.timer = null;
        this.counter = null;
        this.state = {
           timer : null , 
           isMounted: false
        };
        this.start = this.start.bind(this);
        this.restart = this.restart.bind(this);
    }
    componentDidMount() {
        this.setState({isMounted: true})
    }
    componentWillUnmount(){
        this.setState({isMounted: false})
    }
    componentWillMount(){
        clearInterval(this.timer);
        this.setState({timer:this.props.timer});
        if(this.props.timer != null)
        {
            this.start(this.props.timer);
        }
       
    }
    restart(value){
        this.start(value);
    }
    start(value){
        this.counter = value;
        this.timer = setInterval(()=>{
            if(this.state.isMounted){
                this.setState({timer:--this.counter});
                if(this.counter == 0){
                    clearInterval(this.timer);
                    this.setState({timer:null});
                    if('onFinish' in this.props){
                        this.props.onFinish();
                    }
                }
            }
        },1000);
    }
     
    render(){
        return (
               <Text style={this.props.style}>{this.state.timer}</Text>
        );
    }


}

    