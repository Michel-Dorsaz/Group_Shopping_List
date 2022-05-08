import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Alert } from'react-native';
import { Avatar, Input, Button } from'react-native-elements';
import { database, ref, set, push, get } from '../utils/Database';
import { styles }  from '../utils/Styles'
import { UserStateContext } from '../utils/UserContext';

export default function NewListScreen({ route, navigation }) {

    const {groupId} = route.params;
    const {user, setUser} = useContext(UserStateContext);
    const [list, setList] = useState({
        name : '',
        img64: ''
    });
    const [onSave, setOnSave] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(onSave > 0){

            if(list.name != ''){
                
                setLoading(true);
                
                push(ref(database, 'Groups/' + groupId + '/lists/'), 
                {
                    name : list.name,
                    img64: list.img64
                })   
                
                navigation.goBack();
            }
            else{
                 Alert.alert(
                    "Unauthorized list name",
                    "Name must not be empty !",
                    [
                        {
                            text: "Ok",
                            style: "cancel"
                        }
                ]);
            }
            
        }

    }, [onSave]);

    const SaveButton = () => {
        if(loading){
            return (
                <Button
                    buttonStyle={styles.buttonValidate}
                    loading
                />
            );
        }
        else{
            return (
                <Button
                    buttonStyle={[styles.buttonValidate, styles.bottomCenter]}
                    title="Save"
                    onPress={() => {
                        setOnSave(onSave + 1);                       
                    }}
                />
            );
        }
    }

    return (   
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>   

                <Avatar      
                    rounded               
                    size={300}
                    containerStyle={styles.adjustedTop}
                    source={
                        list.img64 == '' ? 
                        require("../utils/images/Unknown.png") : 
                        { uri: list.img64 }
                    }
                    onPress={() => navigation.navigate('Your profil picture', 
                    { 
                        header: list.name,
                        img64: list.img64,
                        onBack: (img64) => setList({...list, img64: img64})
                    })}
                /> 

                <Text style={[styles.adjustedTop, styles.title]}>Name of the list</Text>
                <Input
                    value={list.name}
                    placeholder='Type in name of the list'
                    textAlign='center'
                    onChangeText={(text) => setList({...list, name: text})}
                />

                <View style={[styles.adjustedTop, styles.leftView]}>

                    <SaveButton/>
                    
                </View>

            </ScrollView>  
        </View> 
    );
};