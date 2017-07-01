import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter,
} from 'react-native';
import Toast,{DURATION} from 'react-native-easy-toast';
import ShowList from './ShowList'

export default class Home extends Component {
  constructor(props){
    super(props);
  }
componentDidMount() {
  // 创建toast监听
  this.listener=DeviceEventEmitter.addListener('showToast',(text)=>{
    this.toast.show(text,DURATION.LENGTH_LONG);
  })
}
componentWillUnmount(){
  // 移除监听
  this.listener&&this.listener.remove();
}
  render() {
    return (
      <View style={styles.container}>
        <ShowList {...this.props}/>
        <Toast ref={toast=>this.toast=toast} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5FCFF'
  }
})