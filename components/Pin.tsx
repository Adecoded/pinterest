import { StyleSheet, Text, View ,Image,Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Pin = (props) => {

  const {id,image,title} =props.pin;
const [ratio, setRatio] = useState(1);
const navigation = useNavigation();

  const onLike =() => {};
const goToPinPage=() => {
  navigation.navigate("Pin", {id});
};
  useEffect(() => {
    if (image) {
      Image.getSize(image,(width,height) =>setRatio(width/height ));
    }

  }, [image]);
  if  ( !Pin) { 
    return<Text>Pin Not Found</Text>;
  }
  return (
    
    <Pressable  onPress={goToPinPage} style={styles.pin}>
      <View>

      <Image source={{uri:image}}
    style={[styles.image, {aspectRatio:ratio}]}
    />
   <Pressable style={{backgroundColor:"#D3CFD4", position:'absolute',bottom:10,right:10,padding:5,borderRadius:50,}}>
   <AntDesign name="hearto" size={16} color="black" />
   </Pressable>
      </View>
   
   
    <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </Pressable>
  )
}

export default Pin

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight:22,
    margin:5,
    color:"#181818",
  },
  
  image:{
    width:'100%',
    borderRadius:20,
  },
  pin:{
width:'100%',
padding:4,

  }
})