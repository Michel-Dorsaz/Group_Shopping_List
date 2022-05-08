import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Alert } from'react-native';
import { Avatar, Input, Button } from'react-native-elements';
import { database, ref, get, set } from '../utils/Database';
import { styles }  from '../utils/Styles'
import { UserStateContext } from '../utils/UserContext';

export default function RegisterScreen({ navigation }) {

    const {user, setUser} = useContext(UserStateContext);
    const [onRegister, setOnRegister] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(onRegister > 0){

            const query = ref(database, 'Users/' + user.phone); 

            setLoading(true);

            get(query)
                .then((snapshot) => {

                    const userObj = snapshot.val();    

                    if(userObj != null){
    
                        Alert.alert(
                            "Unauthorized registration",
                            "This phone number is already registered !",
                            [
                                {
                                    text: "Ok",
                                    style: "cancel"
                                }
                            ]);
                    }
                    else{
                        set(
                            query,
                            {
                                pseudo: user.pseudo, 
                                pwd: user.pwd,
                                img64: user.img64,
                                groups: []
                            });

                        setLoading(false);
                        navigation.navigate('Login'); 
                    }

                })
        }
    }, [onRegister]);

    const RegisterButton = () => {
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
                    buttonStyle={styles.buttonValidate}
                    title="Register"
                    onPress={() => {
                        setOnRegister(onRegister+1);
                    }}
                />
            );
        }
    }

    return (
 
        <ScrollView contentContainerStyle={styles.scrollContainer}>   

            <Avatar      
                rounded               
                size={300}
                containerStyle={styles.adjustedTop}
                source={
                    user.img64 == '' ? 
                    require("../utils/images/Unknown.png") : 
                    { uri :user.img64 }
                }
                onPress={() => navigation.navigate('Your profil picture', 
                    { 
                        header: user.pseudo,
                        img64: user.img64,
                        onBack: (img64) => setUser({...user, img64: img64})
                    })}
              /> 

            <Text style={styles.title}>Phone number</Text>
            <Input
                value={user.phone}
                placeholder='Type in phone number'
                textAlign='center'
                onChangeText={(text) => setUser({...user, phone: text})}
            />

            <Text style={styles.title}>Pseudonyme</Text>
            <Input
                value={user.pseudo}
                placeholder='Type in pseudo'
                textAlign='center'
                onChangeText={(text) => setUser({...user, pseudo: text})}
            />

            <Text style={styles.title}>Password</Text>
            <Input
                value={user.pwd}
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                secureTextEntry={true}
                placeholder='Type in password'
                textAlign='center'
                onChangeText={(text) => setUser({...user, pwd: text})}
            />

            <View style={styles.leftView}>

                <RegisterButton/>

            </View>

        </ScrollView> 
        

    );
};