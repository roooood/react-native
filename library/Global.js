global.React = require("react");
global.Component = React.Component;
global.ReactNative = require("react-native");

global.Platform = ReactNative.Platform;
global.isIOS = Platform.OS === "ios";

// APIS
//global.AccessibilityInfo = ReactNative.AccessibilityInfo;
global.Animated = ReactNative.Animated;
//global.AppRegistry = ReactNative.AppRegistry;
// global.AppState = ReactNative.AppState;
global.AsyncStorage = ReactNative.AsyncStorage;
// global.BackHandler = ReactNative.BackHandler;
// global.CameraRoll = ReactNative.CameraRoll;
// global.Clipboard = ReactNative.Clipboard;
// global.DeviceEventEmitter = ReactNative.DeviceEventEmitter;
global.Dimensions = ReactNative.Dimensions;
global.Easing = ReactNative.Easing;
// global.ImageEditor = ReactNative.ImageEditor;
// global.ImageStore = ReactNative.ImageStore;
// global.InteractionManager = ReactNative.InteractionManager;
global.Keyboard = ReactNative.Keyboard;
// global.LayoutAnimation = ReactNative.LayoutAnimation;
// global.Linking = ReactNative.Linking;
// global.NativeAppEventEmitter = ReactNative.NativeAppEventEmitter;
// global.NativeMethodsMixin = ReactNative.NativeMethodsMixin;
// global.NativeModules = ReactNative.NativeModules;
// global.NetInfo = ReactNative.NetInfo;
// global.PanResponder = ReactNative.PanResponder;
// global.PixelRatio = ReactNative.PixelRatio;
// global.Settings = ReactNative.Settings;
// global.Share = ReactNative.Share;
// global.Systrace = ReactNative.Systrace;
// global.Vibration = ReactNative.Vibration;
// global.WebView = ReactNative.WebView;

//React native components
global.ActivityIndicator = ReactNative.ActivityIndicator;
//global.Button = ReactNative.Button;
global.SafeAreaView = ReactNative.SafeAreaView;
//global.DataSource = ReactNative.ListView.DataSource;

global.KeyboardAvoidingView = ReactNative.KeyboardAvoidingView;
//global.ListView = ReactNative.ListView;
//global.Modal = ReactNative.Modal;
global.Alert = ReactNative.Alert;
global.FlatList = ReactNative.FlatList;

//global.Picker = ReactNative.Picker;
//global.RefreshControl = ReactNative.RefreshControl;
global.ScrollView = ReactNative.ScrollView;
//global.SectionList = ReactNative.SectionList;
//global.Slider = ReactNative.Slider;
global.I18nManager = ReactNative.I18nManager;
global.StatusBar = ReactNative.StatusBar;
global.StyleSheet = ReactNative.StyleSheet;
global.Switch = ReactNative.Switch;
global.Text = ReactNative.Text;
global.TextInput = ReactNative.TextInput;
global.TouchableHighlight = ReactNative.TouchableHighlight;
//global.TouchableNativeFeedback = ReactNative.TouchableNativeFeedback;
global.TouchableOpacity = ReactNative.TouchableOpacity;
global.TouchableWithoutFeedback = ReactNative.TouchableWithoutFeedback;
global.View = ReactNative.View;
global.Image = ReactNative.Image;
global.ImageBackground = ReactNative.ImageBackground;

//Device info

global.connect = require("react-redux").connect;

global.DeviceHeight = Dimensions.get("window").height;
global.DeviceWidth = Dimensions.get("window").width;

//Custom
// global.Url = "http://192.168.5.107:9090/offfood_new/api/";
global.Url = "http://offfood.com/api/";

import ActionSheet from "react-native-actionsheet";
global.ActionSheet = ActionSheet;

import * as Animatable from "react-native-animatable";
global.Animatable = Animatable;

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
global.KeyboardAwareScrollView = KeyboardAwareScrollView;

import ShadowView from "react-native-shadow-view";
global.ShadowView = ShadowView;

import LinearGradient from "react-native-linear-gradient";
global.LinearGradient = LinearGradient;

import Awesome from "react-native-vector-icons/FontAwesome";
global.Awesome = Awesome;
import Awesome5 from "react-native-vector-icons/FontAwesome5";
global.Awesome5 = Awesome5;

import Styles from "../styles/styles";
let styles = new Styles(0);
global.s = styles.s;
global.sf = styles.sf;

global.Validate = require("./Validate");
global.autoBind = require("./autoBind");
global.C = require("./Common");
global.Local = require("./localData");
global.Fetch = require("./Fetch");
global.Images = require("./Images");
global.theme = require("./Theme");
global.I18n = require("./Lang");
global.t = I18n.strings;

global.Loading = require("../component/Loading");
global.Form = require("../component/Form");
global.Fade = require("../component/Fade");
global.Label = require("../component/Label");
global.Modal = require("../component/Modal");
global.Button = require("../component/Button");
global.Header = require("../component/Header");
global.PageList = require("../component/PageListView");

global.styles = require("../styles");
global.Data = {};
global.fontFamily = "IRANSansMobile";
