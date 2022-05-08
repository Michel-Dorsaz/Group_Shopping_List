import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Alert } from'react-native';
import { Avatar, Input, Button } from'react-native-elements';
import { database, ref, get, set } from '../utils/Database';
import { styles }  from '../utils/Styles'
import { UserStateContext } from '../utils/UserContext';

export default function NewItemScreen({ route, navigation }) {

    const [name, setName] = useState('');
    const {groupId, listId} = route.params;

    return (
 
        <ScrollView contentContainerStyle={styles.centeredView}>   

            <Text style={styles.title}>Item's name</Text>
            <Input
                value={name}
                placeholder='Type in name of item'
                textAlign='center'
                onChangeText={(text) => setName(text)}
            />

            <View style={styles.bottomView}>

                <Button
                    buttonStyle={styles.buttonValidate}
                    title="Continue"
                    onPress={() => {
                        navigation.navigate('Item params', {name: name, groupId: groupId, listId: listId})
                    }}
                />

            </View>

        </ScrollView> 
        

    );
};