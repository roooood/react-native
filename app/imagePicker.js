
import ImagePicker from "react-native-image-crop-picker";
const { width, height } = Dimensions.get("window");

class Screen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {}

  show() {
    this.imgPicker.show();
  }

  onPress(i){
    if(i == 1){
      this.fromCamera()
    }
    else if(i == 2){
      this.fromGallary()
    }
  }

  fromGallary() {
    ImagePicker.openPicker({
      width: this.props.width || 300,
      height: this.props.height || 400,
      cropping: true
    }).then(image => {
      this.props.onDone(image);
    });
  }

  fromCamera() {
    ImagePicker.openCamera({
      width: this.props.width || 400,
      height: this.props.height || 400,
      cropping: true
    }).then(image => {
      this.props.onDone(image);
    });
  }

  render() {
    return (
      <ActionSheet
        ref={(ref)=>this.imgPicker = ref}
        title={<Label style={{color: '#454545'}}>انتخاب عکس از:</Label>}
        options={[<Label color='tomato'>بازگشت</Label>,'دوربین','گالری']}
        cancelButtonIndex={0}
        styles = {{buttonText:{fontFamily:fontFamily,fontSize:dF}}}
        onPress={(index) => { this.onPress(index) }}
      />
    );
  }
}

const styles = StyleSheet.create({
  modalButtonContainer: {
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  modalButton: {
    width: "80%",
    height: 35,
    backgroundColor: "#01965F",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    flexDirection: "row"
  },
  modalButtonText: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
    marginStart: 10
  }
});
module.exports = Screen;
