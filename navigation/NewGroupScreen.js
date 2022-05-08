import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Alert } from'react-native';
import { Avatar, Input, Button } from'react-native-elements';
import { database, ref, set, push, get } from '../utils/Database';
import { styles }  from '../utils/Styles'
import { UserStateContext } from '../utils/UserContext';

export default function NewGroupScreen({ navigation }) {

    const {user, setUser} = useContext(UserStateContext);
    const [group, setGroup] = useState({
        name : '',
        img64: '',
        owner: user.phone,
        pwd: ''
    });
    const [onSave, setOnSave] = useState(0);
        
    useEffect(() => {

        if(onSave > 0){
            if(group.name != ''){

                get(ref(database, 'Groups/'))
                .then((snapshot) => {

                    const userObj = snapshot.val(); 
                    
                    let groupExist = false;

                    if(userObj != null){

                        const groups = Object.values(userObj);

                        groups.filter((g) => {

                            if(g.name == group.name && g.pwd == group.pwd){

                                Alert.alert(
                                    "Unauthorized group",
                                    "This group already exist !",
                                    [
                                        {
                                            text: "Ok",
                                            style: "cancel"
                                        }
                                ]);

                                groupExist = true;
                                return;
                            } 
                        });
                    }

                    
                    if(!groupExist){
                        
                        const newGroupRef = push(
                            ref(database, 'Groups/'),
                            {
                                name: group.name,
                                img64: group.img64,
                                owner: user.phone,
                                pwd: group.pwd
                            })
                          
                        set(ref(database, 'Users/' + user.phone + '/groups/' + newGroupRef.key),
                        {
                            name: group.name
                        })
                        .then(navigation.navigate('Groups')); 
                    }                  

                });


                                      
            }
            else{
                 Alert.alert(
                    "Unauthorized group name",
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

    return (   
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>   

                <Avatar      
                    rounded               
                    size={300}
                    containerStyle={styles.adjustedTop}
                    source={
                        group.img64 == '' ? 
                        require("../utils/images/Unknown.png") : 
                        { uri: group.img64 }
                    }
                    onPress={() => navigation.navigate('Your profil picture', 
                    { 
                        header: group.name,
                        img64: group.img64,
                        onBack: (img64) => setGroup({...group, img64: img64})
                    })}
                /> 

                <Text style={[styles.adjustedTop, styles.title]}>Name of the group</Text>
                <Input
                    value={group.name}
                    placeholder='Type in name of the group'
                    textAlign='center'
                    onChangeText={(text) => setGroup({...group, name: text})}
                />

                <Text style={[styles.adjustedTop, styles.title]}>Password</Text>
                <Input
                    value={group.pwd}
                    placeholder='Type in password'
                    textAlign='center'
                    onChangeText={(text) => setGroup({...group, pwd: text})}
                />

                <View style={[styles.adjustedTop, styles.leftView]}>
                    <Button
                        buttonStyle={[styles.buttonValidate, styles.bottomCenter]}
                        title="Save"
                        onPress={() => {
                            setOnSave(onSave + 1);                       
                        }}
                    />
                </View>

            </ScrollView>  
        </View> 
    );
};