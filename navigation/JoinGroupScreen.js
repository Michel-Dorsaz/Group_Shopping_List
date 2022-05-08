import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Alert } from'react-native';
import { Avatar, Input, Button } from'react-native-elements';
import { database, ref, get, set } from '../utils/Database';
import { styles }  from '../utils/Styles'
import { UserStateContext } from '../utils/UserContext';

export default function JoinGroupScreen({ navigation }) {

    const {user, setUser} = useContext(UserStateContext);
    const [group, setGroup] = useState({
        name : '',
        img64: '',
        owner: '',
        pwd: ''
    });

    const [onJoin, setOnJoin] = useState(0);

    useEffect(() => {

        if(onJoin > 0){

            get(ref(database, 'Groups/'))
                .then((snapshot) => {

                    const data = snapshot.val(); 
                    let groupExist = false;

                    if(data != null){

                        const groups = Object.values(data);  

                        groups.filter((g, index) => {

                            if(g.name == group.name
                             && g.pwd == group.pwd
                             ){

                                const userGroups = [{...user.groups}, g];

                                setUser({...user, groups: userGroups});
    
                                set(
                                    ref(database, 'Users/' + user.phone + '/groups/' + Object.keys(data)[index]),
                                    {
                                        name: group.name
                                    });
        
                                groupExist = true;
                                navigation.navigate('Groups');
                            }
                        })                   
                    }   
                    
                    if(!groupExist){
                        Alert.alert(
                            "Unable to fin group",
                            "This group doesn't exist !",
                            [
                                {
                                    text: "Ok",
                                    style: "cancel"
                                }
                        ]);
                    }           
                })
        }
    }, [onJoin]);

    return (
 
        <ScrollView contentContainerStyle={styles.container}>   

            <Text style={[styles.adjustedTop, styles.title]}>Group name</Text>
            <Input
                value={group.name}
                placeholder='Type in phone number'
                textAlign='center'
                onChangeText={(text) => setGroup({...group, name: text})}
            />

            <Text style={styles.title}>Password</Text>
            <Input
                value={group.pwd}
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                secureTextEntry={true}
                placeholder='Type in password'
                textAlign='center'
                onChangeText={(text) => setGroup({...group, pwd: text})}
            />

            <View style={styles.bottomView}>
                <Button
                    buttonStyle={styles.buttonValidate}
                    title="Join"
                    onPress={() => {
                        setOnJoin(onJoin+1);
                    }}
                />
            </View>

        </ScrollView> 
        

    );
};