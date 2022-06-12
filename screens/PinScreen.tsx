import { StyleSheet, Text, View,Image,SafeAreaView, Pressable,ScrollView, Alert  } from 'react-native'
import React, {useEffect,useState} from 'react'

import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { useNhostClient } from '@nhost/react';
const GET_PINS_QUERY=`query MyQuery ($id:uuid!) {
  pins_by_pk(id:$id) {
    created_at
    id
    image
    title
    user {
      avatarUrl
      displayName
      id
    }
  }
}
`
const PinScreen = () => {
  const [ratio, setRatio] = useState(1);
  const [pin,setPin] =useState<any>([]);
  const nhost =useNhostClient();
  const navigation =useNavigation();
  const route =useRoute();
const pinId = route.params?.id;


const fetchpin =async (pinId) =>{
  const response = await nhost.graphql.request(
    GET_PINS_QUERY, {id:pinId}
  );
  if (response.error){
    Alert.alert("Error Fetching data")
  }else{
    setPin(response.data.pins_by_pk);
  }
};
useEffect(() => { fetchpin(pinId); }, [pinId ]);

  const insets =useSafeAreaInsets();
  useEffect(() => {
    if (pin?.image) {
      Image.getSize(pin.image,(width,height) =>setRatio(width/height ));
    }

  }, [pin]);
  const goBack =() => {
    navigation.goBack();
  };

  return (
    <SafeAreaView>
    <ScrollView>
    <StatusBar style='light'/>
   <View style={styles.root}>
    <Image source={{uri:pin.image}} style={[styles.image, {aspectRatio:ratio}]}/>
    <Text style={styles.title}>{pin.title}</Text>
   </View>
   <Pressable onPress={goBack} style={[styles.btn,{top:insets.top + 20}]}>
   <Ionicons name={"chevron-back"} size={35} color={"white"} />
   </Pressable>
   </ScrollView>
   </SafeAreaView>
  )
}

export default PinScreen

const styles = StyleSheet.create({
  root:{
    height:"100%",
    backgroundColor:'white',
    borderTopLeftRadius:50,
borderTopRightRadius:50,
  },
  image:{
width:"100%",
borderTopLeftRadius:50,
borderTopRightRadius:50,
  },
  title:{
margin:10,
fontSize:24,
fontWeight:'500',
textAlign:"center",
lineHeight:35,
  },
  btn:{
    position:'absolute',
    left:10,
  }

})