import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'

import { RootTabScreenProps } from '../types';
import Pin from './Pin';
interface IMasonryList {
  pins: {
    id:string;
    image:string;
    title:string;
  }
}
const masonryList = ({ pins  }:IMasonryList) => {
  return (
    <ScrollView >
    <View  style={styles.container}>
    <View style={styles.column}>
      
{pins
.filter((_, index) =>index % 2 ===0)
.map(pin => <Pin pin ={pin}  key={pin.id}/>)}
    </View>
    <View style={styles.column}>
   
    {pins
.filter((_, index) =>index % 2 ===1)
.map(pin => <Pin pin ={pin}  key={pin.id} />)}
    </View>
    </View>
  </ScrollView>
  )
}

export default masonryList

const styles = StyleSheet.create({ 
  container: {
  flexDirection:'row',
    padding:10,
  },
  column:{
    flex:1,
  }
});