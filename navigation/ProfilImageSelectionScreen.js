import React, { useContext, useEffect } from'react';
import { ScrollView, View, Text } from 'react-native';
import { Avatar, Button, Icon } from'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { styles }  from '../utils/Styles';

export default function ProfilImageSelectionScreen({ route, navigation }) {
    
  const {img64, onBack, header} = route.params;
  const [selectedImage, setSelectedImage] = React.useState({ localUri: img64 });

  /// Header config
  useEffect(() => {

    navigation.setOptions({ 
        headerTitle: () => <Text style={styles.header}>{
          header == '' ? 
          "Choose a picture" : 
          header + "'s picture"}</Text>
    });
  });


  const openImagePickerAsync = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true});

    if (pickerResult.cancelled === true) {
      return;
    }
      
      setSelectedImage({ localUri: "data:image/png;base64," + pickerResult.base64});
  }

  const openCameraAsync = async () => {
    
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required to take pictures!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({base64: true});

    if (result.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: "data:image/png;base64," + result.base64});
    
  }

  if (selectedImage !== null) {

    return (
      <ScrollView contentContainerStyle={styles.container}>
  
        <Avatar      
          rounded               
          size={300}
          containerStyle={styles.adjustedTop}
          source={
            selectedImage.localUri == '' ? 
            require("../utils/images/Unknown.png") : 
            { uri: selectedImage.localUri }
          }
        />  
        <View> 
          <Button
            buttonStyle={styles.adjustedTop}
            icon={
              <Icon
                name="camera"
                size={30}
                color="white"
              />
            }
            title="Take picture"
            onPress={openCameraAsync}
          />
          <Button
            buttonStyle={styles.adjustedTop}
            icon={
              <Icon
                name="photo"
                size={30}
                color="white"
              />
            }
            title="Load from gallery"
            onPress={openImagePickerAsync}
          />
        </View>
        <View style={styles.bottomView}>
          <Button
            buttonStyle={styles.buttonValidate}
            title="Save"
            onPress={() => {
              navigation.goBack();
              onBack(selectedImage.localUri);
            }}
          />
        </View>
      </ScrollView>
    );
  }
};
