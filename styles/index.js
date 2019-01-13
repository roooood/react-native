const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme("background")
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  header: {
    height: rH(25),
    width: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: theme("point")
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10
  },
  hr: {
    width: "100%",
    height: 1,
    borderTopWidth: 1,
    borderTopColor: "#eee"
  }
});

module.exports = styles;
