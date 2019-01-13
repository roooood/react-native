import {LineChart} from 'react-native-charts-wrapper';
const { width, height } = Dimensions.get('window');

const {processColor} = ReactNative;

class Screen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        data: {},
        marker: {
          enabled: true,
          digits: 2,
          backgroundTint: processColor('#fff'),
          markerColor: processColor('#000'),
          textColor: processColor('#fff'),
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          granularityEnabled: false,
          granularity: 10,
          position: 'TOP',
          axisLineColor: processColor('white'),
          gridColor: processColor('white')
        },
        yAxis: {
          granularityEnabled: true,
          granularity: 100,
          axisLineColor: processColor('white'),
          gridColor: processColor('white')
        },
        visibleRange: {x: {min: 1, max: 10}}
      }
        this.dataSets = [];
      autoBind(this);
  }

  componentDidMount() {
    this.dataSets =  {
      food : {
        values: [{x: 0, y: 200}, {x: 1, y: 50}, {x: 2, y: 300}, {x: 3, y: 150}, {x: 4, y: 200}, {x: 5, y: 50}, {x: 6, y: 200}, {x: 7, y: 150}],
        label: 'food',
        config: {
          colors: [processColor('#E74C3C')],
          lineWidth: 1,
          drawValues: false,
          drawCircles: false,
        }
      },
      table : {
        values: [{x: 0, y: 100}, {x: 1, y: 100}, {x: 2, y: 200}, {x: 3, y: 300}, {x: 4, y: 300}, {x: 5, y: 200}, {x: 6, y: 300}, {x: 7, y: 100}],
        label: 'table',
        config: {
          colors: [processColor('#1BBC9B')],
          lineWidth: 1,
          drawValues: false,
          drawCircles: false,
        }
      },
      event : {
        values: [{x: 0, y: 300}, {x: 1, y: 150}, {x: 2, y: 200}, {x: 3, y: 250}, {x: 4, y: 200}, {x: 5, y: 150}, {x: 6, y: 350}, {x: 7, y: 200}],
        label: 'event',
        config: {
          colors: [processColor('#3597FF')],
          lineWidth: 1,
          drawValues: false,
          drawCircles: false,
        }
      }
    };

    this.setState({
      data: {dataSets: Object.values(this.dataSets)},
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.resType != 'all'){
      this.setState({
        data: {dataSets:[this.dataSets[nextProps.resType]]},
      })
    }
    else{
      this.setState({
        data: {dataSets: Object.values(this.dataSets)},
      })
    }
  }

  render() {
    return (
        <View style={style.container}>
          <LineChart
            style={style.chart}
            data={this.props.resType ? this.state.data : {}}
            chartDescription={{text: ''}}
            legend={this.state.legend}
            drawValueAboveBar={false}
            marker={this.state.marker}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            drawGridBackground={false}
            borderColor={processColor('transparent')}
            borderWidth={0}
            drawBorders={false}
            autoScaleMinMaxEnabled={true}
            touchEnabled={true}
            dragEnabled={true}
            scaleEnabled={true}
            scaleXEnabled={true}
            scaleYEnabled={true}
            pinchZoom={true}
            doubleTapToZoomEnabled={true}
            highlightPerTapEnabled={true}
            highlightPerDragEnabled={true}
            visibleRange={this.state.visibleRange}
            dragDecelerationEnabled={true}
            dragDecelerationFrictionCoef={0.99}
            ref="chart"
            keepPositionOnRotation={true}
            // onSelect={this.handleSelect.bind(this)}
            // onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
     );
  }
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: width*0.4,
    // backgroundColor: '#fff',
  },
  chart: {
    flex: 1,
    marginLeft: -40,
    marginTop: -20,
    zIndex: -1,
  },
});
module.exports = connect((state)=>(state))(Screen);
