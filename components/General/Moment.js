import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image,TouchableOpacity } from "react-native"


const DEVICE_WIDTH = Dimensions.get("window").width;

class Moment extends React.Component {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };
    this.scrollRef = React.createRef();
  }

   istouched=false
    myInterval=null
  componentDidMount = () => {
      if(this.props.images.length>0){
      this.myInterval= setInterval(() => {
        this.setState(
          prev => ({
            selectedIndex:
              prev.selectedIndex === this.props.images.length - 1
                ? 0
                : prev.selectedIndex + 1
          }),
          () => {
            this.scrollRef.current.scrollTo({
              animated: true,
              x: DEVICE_WIDTH * this.state.selectedIndex,
              y: 0
            });
          }
        );
      }, 3000);
      }
  };

  componentWillUnmount(){
    console.log(this.myInterval)
    clearInterval(this.myInterval);
    if(this.props.images.length>0){
     
    }
  }

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };

  imageTouchHandler=()=>{
    istouched=true
  }

  render() {
    const { images } = this.props;
    console.log(images.length)
    const { selectedIndex } = this.state;
    if(images.length>0){
    return (
      <View style={{ height:200, width: "100%",overflow:'hidden' }}>
        <ScrollView
          horizontal
          pagingEnabled
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
        >
          {images.map((image) => 
            (
            <TouchableOpacity
             key={image.id} onPress={this.props.VisiblityHandler}>
            <Image
              style={styles.backgroundImage}
              source={{ uri: image.url }}
            />
              </TouchableOpacity>
          ))
          }
        </ScrollView>
        <View style={styles.circleDiv}>
          {images.map((image,i) => (
            <View
              style={[
                styles.whiteCircle,
                { opacity: i === selectedIndex ? 0.5 : 1 }
              ]}
              key={image.id}
              active={i === selectedIndex}
              
            />
          ))}
        </View>
      </View>
    );
    }
    return null
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: Dimensions.get("window").width
  },
  circleDiv: {
    position: "absolute",
    bottom: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 10
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: "red"
  }
});

export default Moment ;