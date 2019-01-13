class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      tell: "",
      avand: "",
      point: "",
      logo: ""
    };
    autoBind(this);
    global.navigation = this.props.navigation;
  }
  goto(route) {
    this.props.navigation.navigate(route);
  }
  componentDidMount() {
    Fetch("res_profile", { token: this.props.user.token }, res => {
      if (res.status == "success") {
        this.setState({
          name: res.data.res_name,
          tell: res.data.mobile,
          avand: res.data.credit,
          point: res.data.point,
          logo: res.data.logo
        });
      }
    });
  }
  render() {
    const info = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[s.absL,sf.wh(40),sf.zx(9999),s.c,sf.marS(20)]} activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Setting');}}>
          <Awesome5  size={20} color={theme('headerColor')} name='cog' />
        </TouchableOpacity>
        <View style={style.header}>
          <Image source={Images.logo} style={style.headerLogo} />
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#EA2027", "#E74C3C"]}
            style={style.linearGradient}
          />
        </View>
        <ScrollView contentContainerStyle={[style.body, s.grow]}>
        <View style={[sf.marH(30)]}>
          <Label color="rgba(255,255,255,.8)" isBold>
            {t("offfodRestaurantManager")}
          </Label>
          <View style={[s.row, sf.marT(15)]}>
            <View style={[style.logo]}>
              {info.logo != "" && (
                <Image
                  source={{ uri: info.logo }}
                  style={[s.wh100,s.cover,sf.br(25)]}
                />
              )}
            </View>
            <View style={{ alignItems: "flex-start", marginStart: 10 }}>
              <Label color="#fff">
                {t("restaurant") + " " + info.name + " " + t("welcome")}
              </Label>
              <Label color="#fff">{info.tell}</Label>
            </View>
          </View>
        </View>
          <View style={[s.c, { widtth: "100%", marginTop: rH(3) }]}>
            <ShadowView
              style={[
                styles.card,
                sf.wh(rW(85), 125),
                {
                  shadowColor: "#E74C3C",
                  shadowOffset: { width: -15, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8
                }
              ]}
            >
              <View style={[s.row, s.sB, s.aliC, sf.padB(5), sf.padH(8)]}>
                <Label size={rF(4)} style={s.aliSS}>
                  {t("credit")}
                </Label>
                <Label size={rF(4)} style={s.aliSE}>
                  {C.toMoney(info.avand) + " " + t("avand")}
                </Label>
              </View>
              <View style={styles.hr} />
              <View style={[s.row, s.spaceA, sf.pad(5)]}>
                <TouchableWithoutFeedback onPress={() => this.goto("Orders")}>
                  <View style={[style.items, s.c]}>
                    <View style={[style.itemsBack, s.c]}>
                      <Image source={Images.invoice} style={style.image} />
                    </View>
                    <Label style={style.itemLabel}>{t("incomeOrder")}</Label>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => this.goto("Transaction")}
                >
                  <View style={[style.items, s.c]}>
                    <View style={[style.itemsBack, s.c]}>
                      <Image source={Images.transaction} style={style.image} />
                    </View>
                    <Label style={style.itemLabel}>
                      {t("transactionManagement")}
                    </Label>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.goto("Ads")}>
                  <View style={[style.items, s.c]}>
                    <View style={[style.itemsBack, s.c]}>
                      <Image source={Images.ads} style={style.image} />
                    </View>
                    <Label style={style.itemLabel}>{t("adsManagement")}</Label>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </ShadowView>
          </View>
          <View style={[s.row, s.wrap, sf.marT(15),sf.marH(25)]}>
            <TouchableWithoutFeedback onPress={() => this.goto("Product")}>
              <View style={[s.row, s.w50, s.aliC, sf.marV(8)]}>
                <View style={[s.c, style.iconHolder]}>
                  <Awesome5
                    style={style.icon}
                    name="plus"
                    size={rF(10)}
                    color="#0E699D"
                  />
                </View>
                <Label color="#0E699D">{t("product.productManagment")}</Label>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.goto("DiscountManage")}>
              <View style={[s.row, s.w50, s.aliC, sf.marV(8)]}>
                <View style={[s.c, style.iconHolder]}>
                  <Awesome5
                    style={style.icon}
                    name="receipt"
                    size={rF(10)}
                    color="#F24D48"
                  />
                </View>
                <Label color="#F24D48">{t("discounts")}</Label>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.goto("Category")}>
              <View style={[s.row, s.w50, s.aliC, sf.marV(8)]}>
                <View style={[s.c, style.iconHolder]}>
                  <Awesome5
                    style={style.icon}
                    name="th-large"
                    size={rF(10)}
                    color="#F39C12"
                  />
                </View>
                <Label color="#F39C12">{t("categories")}</Label>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.goto("Info")}>
              <View style={[s.row, s.w50, s.aliC, sf.marV(8)]}>
                <View style={[s.c, style.iconHolder]}>
                  <Awesome5
                    style={style.icon}
                    name="user"
                    solid
                    size={rF(10)}
                    color="#8E44AD"
                  />
                </View>
                <Label color="#8E44AD">{t("resInfo")}</Label>
              </View>
            </TouchableWithoutFeedback>
            {/* <TouchableWithoutFeedback onPress={() => this.goto("Orders")}>
              <View style={[s.row, s.w50, s.aliC, sf.marV(8)]}>
                <View style={[s.c, style.iconHolder]}>
                  <Awesome5
                    style={style.icon}
                    name="file-invoice"
                    size={rF(10)}
                    color="#16A085"
                  />
                </View>
                <Label color="#16A085">{t("orderManagment")}</Label>
              </View>
            </TouchableWithoutFeedback> */}
            <TouchableWithoutFeedback onPress={() => this.goto("Comments")}>
              <View style={[s.row, s.w50, s.aliC, sf.marV(8)]}>
                <View style={[s.c, style.iconHolder]}>
                  <Awesome5
                    style={style.icon}
                    name="comment"
                    solid
                    size={rF(10)}
                    color="#DB0A5B"
                  />
                </View>
                <Label color="#DB0A5B">{t("comments")}</Label>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={sf.marT(30)}>
            <Label style={sf.marS(25)} color="#2D2A2A" align="left">
              {t("notifications")}
            </Label>
            <ScrollView
              horizontal={true}
              contentContainerStyle={[style.grow, { height: 120 }]}
            >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#E74C3C", "#D2527F"]}
                style={[s.c, style.notificationItem,sf.marS(25)]}
              >
                <Label color="#fff" align="left">
                  تبلیغات در صفحه اول آف فود
                </Label>
                <Label color="#fff" align="left">
                  256 آوند
                </Label>
              </LinearGradient>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#3498DB", "#BF55EC"]}
                style={[s.c, style.notificationItem, { marginEnd: 0 }]}
              >
                <Label color="#fff" align="left">
                  تبلیغات در صفحه اول آف فود
                </Label>
                <Label color="#fff" align="left">
                  256 آوند
                </Label>
              </LinearGradient>
            </ScrollView>
          </View>
        </ScrollView>
        <View style={[s.row, s.sA, style.bottom]}>
          <View style={s.c}>
            
          </View>
          <View style={[s.c, style.tabCenter]}>
            <Image source={Images.logo} style={style.image} />
          </View>
          <View style={s.c}>
            <Awesome5
              style={style.icon}
              name="wallet"
              solid
              size={rF(10)}
              color="#808080"
            />
            <Label size={rF(3)} color="#808080">
              {t("wallet")}
            </Label>
          </View>
        </View>
      
      </View>
    );
  }
}

var style = StyleSheet.create({
  header: {
    height: rH(27),
    width: "100%",
    overflow: "hidden",
    position: "absolute"
  },
  headerLogo: {
    position: "absolute",
    width: 80,
    height: 80,
    resizeMode: "contain",
    top: rH(7),
    right: 0,
    zIndex: 99999,
    opacity: 0.1
  },
  linearGradient: {
    width: rW(100),
    height: rW(100),
    marginTop: -rW(55),
    borderRadius: rW(50),
    transform: [{ scaleX: 2.2 }]
  },
  body: {
    paddingTop: rH(2),
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "white"
  },
  itemsBack: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#F7F6FB"
  },
  itemLabel: {
    color: "#2D2A2A",
    fontSize: rF(3)
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain"
  },
  iconHolder: {
    marginEnd: rW(1),
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EBEAEF"
  },
  notificationItem: {
    width: rW(70),
    height: rH(12),
    marginEnd: rW(3),
    borderRadius: 15,
    marginVertical: rH(2)
  },
  bottom: {
    backgroundColor: "#fff",
    height: rH(8),
    width: rW(100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10
  },
  tabCenter: {
    padding: 5,
    backgroundColor: "#EA2027",
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: -15,
    borderWidth: 5,
    borderColor: theme("background")
  }
});

module.exports = connect(state => state)(Screen);
