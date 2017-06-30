import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <TouchableOpacity style={styles.container}
      onPress={this.props.onSelect}
    >
      <View style={styles.row}>
        <Image
          style={{
            alignItems: 'center',
            width:65,
            height:100
          }}
          source={{uri: this.props.data.images.small}}
        />
        <View style={styles.right_container}>
          {/*影片名*/}
          <View style={{
            flexDirection: 'row',
            alignItems:'center',
            padding:5,
            marginTop:5,
            marginLeft:18
          }}>
            <Text style={styles.title}>{this.props.data.title}</Text>
            <Text style={styles.year}>{this.props.data.year}</Text>
          </View>
          {/*标签*/}
          <View style={{
            flexDirection: 'row',
            alignItems:'center',
            padding:5,
            marginLeft:18
          }}>
            {this.props.data.genres.map((result,i,arr)=>{
              return <Text style={styles.genres_text} key={i}>{result}</Text>
            })}
          </View>
          {/*导演、评分*/}
          <View style={{
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:'center',
            padding:5,
            marginTop:5,
            marginLeft:18
          }}>
            <Text style={styles.director}>导演：{this.props.data.directors[0].name}</Text>
            { 
              // 即将上映 没有评分
              this.props.type!=="即将上映"?<Text style={styles.rate}>评分：{this.props.data.rating.average}</Text>:null
            }
          </View>
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
  },
  right_container:{
    flex:1,
    flexDirection:'column'
  },
  title:{
    fontSize:20,
    color:'#34352c'
  },
  year:{
    fontSize:12,
    color:'#34352c'
  },
  genres_text:{
    fontSize:12,
    marginRight:3,
    color:'grey'
  },
  director:{
    fontSize:15,
    color:'#373e40'
  },
  rate:{
  fontSize:12,
  marginRight:12,
  color:'#373e40'
  },
})