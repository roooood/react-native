import Modal from "react-native-modal";
class MyModal extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            modalVisible: this.props.visible || false  , 
        };
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
    }
    hide(){
        this.setState({modalVisible: false});
    }
    show(){
        this.setState({modalVisible: true});
    }
    render()
    {
        let style = {};
        if('fromBottom' in this.props){
            style = styles.bottomModal;
        }
        return (
            <Modal 
                onBackdropPress={() => this.hide()}
                onSwipe={() => this.hide()}
                swipeDirection="down"
                transpaVrent={true}
                isVisible={this.state.modalVisible}
                style = {style}
            >
                <View style={[styles.modalContent,this.props.style]}>
                    {this.props.children}
                </View>
            </Modal>
        );
    }
}
const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
      },
      bottomModal: {
        justifyContent: "flex-end",
        margin: 0
      },
      scrollableModal: {
        height: 300
      },
      scrollableModalContent1: {
        height: 200,
        backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "center"
      },
      scrollableModalContent2: {
        height: 200,
        backgroundColor: "lightgreen",
        alignItems: "center",
        justifyContent: "center"
    }
});
module.exports = MyModal;