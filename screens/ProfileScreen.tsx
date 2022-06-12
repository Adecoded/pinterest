import { StyleSheet,Image,ScrollView   } from 'react-native';
import MasonryList from '../components/masonryList';
import { Text, View } from '../components/Themed';
import pins from '../assets/data/pins';
import { Entypo, Feather } from '@expo/vector-icons';


export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems:"center"}}>
        <View style={styles.icons}>
        <Feather name='share' size={24} color="black" style={styles.icon}/>
          <Entypo name='dots-three-horizontal' size={24} color="black" style={styles.icon}/>
        </View>
      <Image
          source={require('../assets/images/1.jpg')}  style={styles.image}/>
          <Text style={styles.title}>Drey Adebisi</Text>
      <Text style={styles.Subtitle}>12.9M followers | 245 followings</Text>
      </View>
      <MasonryList pins={pins}/>
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
width:"100%",

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin:10,
  },
  Subtitle:{
color:'#181818',
fontWeight:"600",
margin:10,
  },
 image:{
width:150,
height:150,
borderRadius:200,
marginVertical:10,
 },
  icons:{
flexDirection:"row",
alignSelf:"flex-end", 
padding:10,
  },
  icon:{
paddingHorizontal:10,
  }
});
