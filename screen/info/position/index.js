import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from "react-native-maps";

const { width, height } = Dimensions.get('window');

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      initialPosition: {
        latitude: 35.773231,
        longitude: 51.419210,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      markerRegion: null,
    };
    autoBind(this);
  }

  componentDidMount() {
    this.currentLocation();
  }

  changeValue(key, value) {
    this.setState(state => {
      state.form[key] = value;
      return state;
    });
  }

  save() {
    if(this.state.markerRegion == null) {
      dropdown.alertWithType('error', '', t("info.locationSaveError"))
    } else {
      p(this.state.markerRegion)
      dropdown.alertWithType('success', '', t("info.locationSaveSuccess"))
    }
  }

  currentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          initialPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
        });
      },
      error => {},
      { enableHighAccuracy: true, timeout: 1000, maximumAge: 1000 },
    );
  }

  setMarker = (e) => {
    this.setState({
      markerRegion: e.nativeEvent.coordinate
    });
  }

  renderMarker() {
    if (this.state.markerRegion){
      return (
        <Marker
          coordinate={{
            latitude: this.state.markerRegion.latitude,
            longitude: this.state.markerRegion.longitude
          }}
        />
      );
    }
  }

  render() {
    return (
      <View style={[styles.container, sf.pad(10, 15)]}>
        <View
          style={[
            sf.h(rH(75)),
            styles.card,
            sf.marTop(10),
            sf.pad(0),
            s.hidden,
            styles.shadow,
            s.w100,
            sf.padB(50)
          ]}
        >
          <View style={[s.flex, sf.pad(15)]}>
            <Label aliCenter isBold style={{ lineHeight: 20 }}>
              {t("info.resPosTitle")}
            </Label>
            <Label aliCenter style={{ lineHeight: 20 }}>
              {t("info.PosDec")}
            </Label>
          </View>

          <View style={style.mapContainer}>
            <MapView
              ref="mapRef"
              provider={PROVIDER_GOOGLE}
              loadingEnabled
              onPress={this.setMarker}
              style={style.mapStyle}
              initialRegion={this.state.initialPosition}
              >
              {this.renderMarker()}
            </MapView>
          </View>

          <Button
            radius={1}
            style={[
              s.absB,
              // s.w100,
              { width: "100%" },
              sf.h(rH(6)),
              sf.mar(0),
              sf.marT(30),
              sf.br(0, 0, 8, 8)
            ]}
            text={t("info.save")}
            onPress={this.save}
          />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: height/3,
    left: 20,
    right: 20,
    alignSelf: 'center',
    backgroundColor: '#eee',
    marginTop: 90,
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
});

module.exports = connect(state => state)(Screen);
