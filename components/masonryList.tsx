import { StyleSheet, Text, View ,ScrollView, useWindowDimensions, RefreshControl} from 'react-native'
import React,{useState} from 'react'

import { RootTabScreenProps } from '../types';
import Pin from './Pin';
interface IMasonryList {
  pins: {
    id:string;
    image:string;
    title:string;
  }[];
  refreshing?: boolean;
  onRefresh?: () => void;
}
const  masonryList = ({ pins,refreshing=false,onRefresh=() =>{}, }:IMasonryList) => {
const width = useWindowDimensions().width;
const numcols =Math.ceil(width / 350);
console.log(width);
  return (
    <ScrollView  contentContainerStyle={{width:"100%"}}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    >
    <View  style={styles.container}>
{Array.from(Array(numcols)).map((_,colindex )=>(
    <View style={styles.column} key={`column_${colindex}`}>
    {pins
    .filter((_, index) =>index % numcols ===colindex)
    .map(pin => <Pin pin ={pin}  key={pin.id}/>)}
        </View>
))}
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