import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  RefreshControl,
} from 'react-native';
import ScrollableTabView ,{ScrollableTabBar} from 'react-native-scrollable-tab-view';

import NavigationBar from '../common/NavigationBar'
import DataRepository from '../common/DataRepository'
import ListItem from './ListItem'

const URL='https://api.douban.com/v2/movie/'

export default class ShowList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar 
          title={'List'}
          style={{backgroundColor:'#6495ED'}}
        />
        <ScrollableTabView
          tabBarBackgroundColor="#6495ED"
          tabBarInactiveTextColor="lightgrey"
          tabBarActiveTextColor="mintcream"
          tabBarUnderlineStyle={{backgroundColor:'mintcream',height:2}}
          renderTabBar={()=><ScrollableTabBar/>}
        > 
          <PopularTab url_name="in_theaters" tabLabel="正在上映">正在上映</PopularTab>
          <PopularTab url_name="coming_soon" tabLabel="即将上映">即将上映</PopularTab>
          <PopularTab url_name="top250" tabLabel="Top250">Top250</PopularTab>
        </ScrollableTabView>
    </View>
    );
  }
}
class PopularTab extends Component{
    constructor(props) {
    super(props);
    this.dataRepository=new DataRepository();
    this.state={
      result:'',
      isLoading:false,
      dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
    }
  }
  componentDidMount(){
    this.LoadData();
  }
  // 请求豆瓣api数据
  LoadData(){
    this.setState({
      isLoading:true
    })
    let url=this.genUrl(this.props.url_name);
    console.log('api:'+url);
    this.dataRepository.fetchNetRepository(url)
      .then(result=>{
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(result.subjects),
          isLoading:false,
        })
      })
      .catch(error=>{
        console.log(error);
      })
  }
  // 拼接url
  genUrl(key){
    return URL + key;
  }
  renderRow(data){
    return <ListItem data={data}/>
  }
  render() {
    return <View style={{flex:1}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(data)=>this.renderRow(data)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  // 下拉刷新
                  onRefresh={()=>this.LoadData()}
                  // android 刷新等待颜色（数组形式）
                  colors={['#6cf']}
                  // ios 刷新等待颜色
                  tintColor={'#6cf'}
                  title={'努力加载中~~~~'}
                  titleColor={'grey'}
                />
              }
            /> 
          </View> 
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F5FCFF'
  }
})