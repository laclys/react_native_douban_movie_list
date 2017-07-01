import {
  AsyncStorage
} from 'react-native';

export default class DataRepository{
  fetchRepository(url){
    return new Promise((resolve,reject)=>{
      // 获取本地的数据
      this.fetchLocalRepository(url)
          .then(result=>{
            if(result){
              resolve(result);
            }else{
              // 获取网络数据
              this.fetchNetRepository(url)
                  .then(result=>{
                    resolve(result);
                  })
                  .catch(e=>{
                    resolve(e);
                  })
            }
          })
          .catch(e=>{
              this.fetchNetRepository(url)
                  .then(result=>{
                    resolve(result);
                  })
                  .catch(e=>{
                    resolve(e);
                  })
          })
    })
  }
  /**
   * 获取本地缓存数据
   * @param {*} url 
   */
  fetchLocalRepository(url){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(url,(error,result)=>{
        if(!error){
          try{
            resolve(JSON.parse(result)); // json转化成对象再处理
          }catch(e){
            reject(e);
          }
        }else{
          reject(error);
        }
      })
    })
  }
  /**
   * 获取网络数据
   * @param {*} url 
   */
  // fetchNetRepository(url){
  //   return new Promise((resolve,reject)=>{
  //     fetch(url)
  //       .then(response=>response.json())
  //       .then(result=>{
  //         resolve(result);
  //       })
  //       .catch(error=>{
  //         reject(error);
  //       })
  //   })
  // }
  fetchNetRepository(url){
    return new Promise((resolve, reject)=> {
        fetch(url)
            .then((response)=>response.json())
            .catch((error)=> {
                reject(error);
            }).then((responseData)=> {
              if (!responseData || !responseData.subjects) {
                  reject(new Error('responseData is null'));
                  return;
              }
              resolve(responseData.subjects);
              console.log('请求了网路数据');
              // 存储网络数据
              this.saveRepository(url, responseData.subjects)
            }).done();
    })
  }

  /**
   * 存储网络获取到的数据
   * @param {*} url 
   * @param {*} items 
   * @param {*} callback 
   */
  saveRepository(url, items, callback) {
    if (!items || !url)return;
    let wrapData = {items: items, update_date: new Date().getTime()};
    AsyncStorage.setItem(url, JSON.stringify(wrapData), callback);
  }
  /**
   * 判断数据是否过时 传过来的是数据的时间戳
   * @param {*} longTime 数据的时间戳
   */

  checkDate(longTime){
    let currentDate = new Date();
    let targetDate = new Date();
    targetDate.setTime(longTime);
    if (currentDate.getMonth() !== targetDate.getMonth())return false;
    if (currentDate.getDate() !== targetDate.getDate())return false;
    if (currentDate.getHours() - targetDate.getHours() > 4)return false;
    return true;
  }
}