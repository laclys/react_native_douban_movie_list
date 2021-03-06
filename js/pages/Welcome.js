import React, {Component} from 'react';
import {View, Text, StyleSheet, Navigator,Image} from 'react-native';

import Home from './Home'

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  this.timer = setTimeout(() => {
    this
      .props
      .navigator
      .resetTo({component: Home})
  }, 1000)
}
componentWilllUnmount() {
  this.timer && clearTimeout(this.timer);
}
  render() {
    return <View style={styles.container}>
      <Image 
        style={styles.pic}
        source={require('../../res/pic/welcomePic.png')} 
        resizeMode={'contain'}
      />
      <Text style={styles.text}>遇见你，真美好~</Text>
    </View>
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  text:{
    fontSize:20,
    marginTop:20,
    color:'grey'
  },
  pic:{
    width:200,
    height:200,
    borderRadius:100
  }
});