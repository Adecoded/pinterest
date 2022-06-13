import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform ,TextInput, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNhostClient } from '@nhost/react';
import { useNavigation } from '@react-navigation/native';

const CREATE_PIN_MUTATIION =`
mutation MyMutation($image: String!, $title: String) {
  insert_pins(objects: {image: $image, title: $title}) {
    returning {
      created_at
      id
      image
      title
      user_id
    }
  }
}
`;

export default function CreatePinScreen() {
  const [image, setImage] = useState(null);
const [title,setTitle] =useState("");
const nhost =useNhostClient();
const navigation =useNavigation();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const upload= async () =>{
    if (!image){
      return{
        error:{
          message:"No image selected"
        },
      }
    }
    const parts =image.split("/");
    const name =parts[parts.length -1];
    const nameparts = name.split('.')
    const extension =nameparts[nameparts.length -1] 
    const uri = Platform.OS === "ios" ? image.replace("file://", "") : image;
const result = await nhost.storage.upload({
  file:{
    name,
    type:`image/${extension}`, 
    uri,
  },
});
return result;
  }
  const onSubmit =async() =>{
const results = await upload();
if (results.error){
Alert.alert("Error uploading image");
}
    const result =await nhost.graphql.request(CREATE_PIN_MUTATIION,{
    title,
   image: results.fileMetadata.id,
  });
   console.log(result);
   if (result.error){
   Alert.alert("Error creating the post", result.error.message);
    }else{
navigation.goBack(); 
   }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',padding:10, }}>
      <Button title="Upload your Pin from media" onPress={pickImage} />
      {image &&(
        <>
         <Image 
      source={{ uri: image }}
       style={{ width: "100%", aspectRatio:1.4, marginVertical:10, borderRadius:5,}}
        />
        <TextInput placeholder='Title ...' value={title} onChangeText={setTitle} style={{borderWidth:1,borderColor:"gainsboro", padding:10, width:"100%"}} />
        <Button title="Submit" onPress={onSubmit} />
        </>
        )}
       
    </View>
  );
}