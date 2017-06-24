import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';
import Welcome from './pages/Welcome'

function setup() {
  // 进行初始化配置
  class Root extends Component{
    renderScene(route,navigator){
      let Component = route.component;
      return <Component {...route.params} navigator={navigator}/>
    }
    render(){
      return <Navigator
        initialRoute={{component:Welcome}}
        renderScene={(route,navigator)=>this.renderScene(route,navigator)}
      />
    }
  }
  return <Root/>
}

module.exports=setup;