import React, { useState, useContext, useEffect } from'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles }  from '../utils/Styles';
import { UserStateContext } from '../utils/UserContext';
import { database, ref, get } from '../utils/Database';
import { getData, storeData } from '../utils/AsyncStorage';

export default function LoginScreen({ navigation }) {

    const {user, setUser} = useContext(UserStateContext);
    const [onLogin, setOnLogin] = useState({});
    const [loading, setLoading] = useState(false);

    // Auto-login if user has already logged before.
    useEffect(() => {

        setLoading(true);

        getData('@phoneNumber', (value) => {  

            if(value != null) {

                const query = ref(database, 'Users/' + value); 

                get(query)
                .then((snapshot) => {

                    const userObj = snapshot.val();  

                    if(userObj != null){
                        setUser({
                            phone: value,
                            pseudo: userObj.pseudo, 
                            pwd: userObj.pwd,
                            img64: userObj.img64,
                            groups: userObj.groups
                        });              
                    }
                    setLoading(false);
                    navigation.navigate('Groups');
                });               
            } 
            
            setLoading(false);
        })   
    }, []);


    // Authentification
    useEffect(() => {  
        
        if(onLogin.phone == undefined)
            return;

        const query = ref(database, 'Users/' + onLogin.phone); 

        setLoading(true);

        get(query)
        .then((snapshot) => {
          
            const userObj = snapshot.val(); 

            if(userObj != null && userObj.pwd == onLogin.pwd){
                setUser({
                    phone: onLogin.phone,
                    pseudo: userObj.pseudo, 
                    pwd: userObj.pwd,
                    img64: userObj.img64,
                    groups: userObj.groups
                });   
                
                storeData('@phoneNumber', onLogin.phone);

                navigation.navigate('Groups');
            }
            else{
                
                setLoading(false);

                Alert.alert(
                    "Unauthorized login",
                    "Invalid credentials !",
                    [
                        {
                            text: "Ok",
                            style: "cancel"
                        }
                ]);
            }
        });     

    }, [onLogin]);

    const authenticate = () => {
        setOnLogin({phone: user.phone, pwd: user.pwd});
    }        

    const LoginButton = () => {
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
                    title="Login"
                    onPress={authenticate}
                />
            );
        }
    }
    
    return (   
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.adjustedTop, styles.title]}>Phone number</Text>
            <Input
                value={user.phone}
                placeholder='Type in phone number'
                textAlign='center'
                onChangeText={(text) => setUser({...user, phone: text})}
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

            <View style={styles.bottomView}>

                <LoginButton/>              

                <Button
                    buttonStyle={styles.buttonValidate}
                    title="Register"
                    onPress={() => {navigation.navigate('Register',  {selectedImage: ''})}}
                />
            </View> 
        </ScrollView>         
    );
};