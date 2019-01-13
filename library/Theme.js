class Theme {
  constructor() {
    this.selected = "def";

    this.themes = {
      def: {
        point: "#EA2027",
        pointSet: "#fff",
        color: "#828387",
        background: "#F6F7F9",
        header: "#EA2027",
        headerColor: "#fff",
        secColor: "#0E699D"
      }
    };
  }
  set(theme) {
    this.selected = theme;
  }
  get(key) {
    return this.themes[this.selected][key] || null;
  }
}
const MyTheme = new Theme();

module.exports = function(key, val) {
  if(key == "default") {
    MyTheme.set(val);
  }
  else {
    return MyTheme.get(key);
  }
};
