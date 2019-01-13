import Accordion from 'react-native-collapsible/Accordion';

class Screen extends Component {
    constructor(props){
      super(props);
      this.state = {
        activeSections: [0],
        collapsed: true,
        multipleSelect: false,
        data : [],
      }

    }

    componentDidMount() {
      Fetch('rules',(data)=>{
        if(data.status == 'success'){
          let temp = [] , item;
          for(item of data.data){
            temp.push({
              title : item.title,
              content : item.content,
            });
          }
          this.setState({data:temp})
        }
      });
    }

    toggleExpanded = () => {
      this.setState({ collapsed: !this.state.collapsed });
    };

    setSections = sections => {
      this.setState({
        activeSections: sections.includes(undefined) ? [] : sections,
      });
    };

    renderHeader = (section, _, isActive) => {
      return (
        <View style={[style.header]}>
          <Label style={[style.headerText]}>{section.title}</Label>
          <Awesome5 style={[style.icon, {width: '10%'}]} name={'chevron-'+ (isActive?'down':'up')} size={rF(4)} color={theme('point')} />
        </View>
      );
    };

    renderContent(section, _, isActive) {
      return (
        <View style={[style.content, isActive ? style.active : style.inactive]}>
          <Label style={{lineHeight: 25}} align='left' size={rF(3.5)} >
            {section.content}
          </Label>
        </View>
      );
    }

    render() {
      const { multipleSelect, activeSections } = this.state;
      const center = <Label color='#fff' >{}</Label>;
      return (
        <View style={styles.container}>
          <Header title={t('setting.faq')} right={null} left='back' />
          <ScrollView contentContainerStyle={{ padding:10 }}>
            <Accordion
              activeSections={activeSections}
              sections={this.state.data}
              touchableComponent={TouchableOpacity}
              expandMultiple={multipleSelect}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={400}
              onChange={this.setSections}
              sectionContainerStyle = {style.body}
            />
          </ScrollView>
        </View>
      );
    }
  }

  const style = StyleSheet.create({
    body:{
      backgroundColor: '#fff',
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.00,
      elevation: 1,
      borderRadius: 3,
    },
    header: {
      padding: 5,
      justifyContent:'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      width: '90%',
      color:theme('point'),
      textAlign: 'left',
      fontSize: rF(4),
      paddingVertical:5,
      paddingRight:5
    },
    content: {
      padding: 10,
    },
    active: {

    },
    inactive: {

    },
    selectors: {
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    selector: {
      backgroundColor: '#fff',
      padding: 10,
    },
    activeSelector: {
      fontWeight: 'bold',
    },
    selectTitle: {
      fontSize: 14,
      fontWeight: '500',
      padding: 10,
    },
    multipleToggle: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 30,
      alignItems: 'center',
    },
    multipleToggle__title: {
      fontSize: 16,
      marginRight: 8,
  },
});

  module.exports = Screen;
