import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Modal, Image, Alert, TouchableHighlight } from'react-native';
import { Avatar, Button, ListItem} from'react-native-elements';
import { database, ref, onValue, get, set, off } from '../utils/Database';
import { styles }  from '../utils/Styles';
import { UserStateContext } from '../utils/UserContext';

export default function FullImageScreen({ route, navigation }) {
    
    const {user, setUser} = useContext(UserStateContext);
    const {img64, name} = route.params;

    /// Header config
    useEffect(() => {

        navigation.setOptions({ 
            headerTitle: () => <Text style={styles.header}>{
                name == '' ? 
                "Image" : 
                name + "'s picture"}</Text>
          });
      });

   
    return(

        <View style={styles.centeredView}>

            <Image
                style={styles.image}
                source={
                    img64 == '' ? 
                    require("../utils/images/Unknown.png") : 
                    { uri: img64 }
                }
            />
                

        </View> 
    );
};

