import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform ,TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function CreatePinScreen() {
  const [image, setImage] = useState(null);
const [title,setTitle] =useState("");
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
  const onSubmit =() =>{};

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