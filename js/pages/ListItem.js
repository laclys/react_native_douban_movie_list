import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <TouchableOpacity style={styles.container}>
      <View style={styles.row}>
        <Image
          style={{
            alignItems: 'center',
            width:65,
            height:100
          }}
          source={{uri: this.props.data.images.small}}
        />
        <View>
          <Text>123</Text>
        </View>
      </View>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:'white',
    padding:10,
    marginLeft:5,
    marginRight:5,
    marginVertical:3,
    borderWidth:0.5,
    borderColor:'#ddd',
    //ios:
    shadowOffset:{
      width:0.5,
      height:0.5
    },
    shadowOpacity:0.4,
    shadowRadius:1,
    // android:
    elevation:2
  }
})