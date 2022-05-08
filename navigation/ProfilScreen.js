import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text } from'react-native';
import { Avatar, Input, Button } from'react-native-elements';
import { database, ref, update } from '../utils/Database';
import { styles }  from '../utils/Styles'
import { UserStateContext } from '../utils/UserContext';

export default function ProfilScreen({ navigation }) {

    const {user, setUser} = useContext(UserStateContext);
    const [profil, setProfil] = useState({...user});
    const [onSave, setOnSave] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if(onSave > 0){
          
            setUser({...profil});

            setLoading(true);
            
            update(
                ref(database, 'Users/' + profil.phone),
                {
                    pseudo: profil.pseudo, 
                    pwd: profil.pwd,
                    img64: profil.img64
                })
                .then(navigation.goBack());
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>   

            <Avatar      
                rounded               
                size={300}
                containerStyle={styles.adjustedTop}
                source={
                    profil.img64 == '' ? 
                    require("../utils/images/Unknown.png") : 
                    { uri :profil.img64 }
                }
                onPress={() => navigation.navigate('Your profil picture', 
                { 
                    header: profil.pseudo,
                    img64: profil.img64,
                    onBack: (img64) => setProfil({...profil, img64: img64})
                })}
              /> 
            <Text style={[styles.adjustedTop, styles.title, styles.readOnly]}>Phone number</Text>
            <Input
                style={styles.readOnly}
                value={profil.phone}
                textAlign='center'
                readOnly
            />

            <Text style={[styles.adjustedTop, styles.title]}>Pseudonyme</Text>
            <Input
                value={profil.pseudo}
                placeholder='Type in pseudo'
                textAlign='center'
                onChangeText={(text) => setProfil({...profil, pseudo: text})}
            />

            <Text style={styles.title}>Password</Text>
            <Input
                value={profil.pwd}
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                secureTextEntry={true}
                placeholder='Type in password'
                textAlign='center'
                onChangeText={(text) => setProfil({...profil, pwd: text})}
            />

            <View style={styles.leftView}>

                <SaveButton/>
               
            </View>

        </ScrollView>  
    );
};