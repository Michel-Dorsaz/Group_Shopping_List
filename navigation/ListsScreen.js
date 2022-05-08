import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Modal, Image, Alert, TouchableHighlight } from'react-native';
import { Avatar, Button, ListItem} from'react-native-elements';
import { database, ref, onValue, get, set, off } from '../utils/Database';
import { styles }  from '../utils/Styles';
import { UserStateContext } from '../utils/UserContext';

export default function ListsScreen({ route, navigation }) {
    
    const {groupId} = route.params;
    const {user, setUser} = useContext(UserStateContext);
    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    const query = ref(database, 'Groups/' + groupId + '/lists/'); 
    const callback = (snapshot) => {

        const data = snapshot.val();

        if(data != null){ 

            const listsId = Object.keys(data);   
            const groupLists = Object.values(data);              
            
            groupLists.forEach((list, index) => {
                list.id = listsId[index];
            })

            setLists(groupLists);

        }
        if(data == null){
            setLists([]);
        }

        setLoading(false);
    };



    useEffect(() => {       
        onValue(query, callback);

        return () => {
            off(query, "value", callback);
            setLists([]);
          };
    }, []);

    const deleteList = (list, index) => {

            Alert.alert(
                "Confirmation required",
                "You are about to delete the list: " + list.name,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { 
                        text: "Confirm deletion", 
                        onPress: () => {
                            set(ref(database, 'Groups/' + groupId + '/lists/' + list.id), null);
                        }
                    }
                ]);
          
    }

    /// Header config
    useEffect(() => {

        navigation.setOptions({ 
            headerLeft: () => 
              <Avatar
                rounded
                size={50}
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
              />,
            headerRight: () => 
              <Avatar 
                rounded 
                size={50}
                onPress={() => navigation.navigate('Map')}
                icon={{ 
                    name: 'map',
                    color: 'black'
                }}  />

        });
      });

    if(loading){

        return(
            <View style={styles.centeredView}>
                <Text style={styles.title}>Loading...</Text>
            </View>
        );
    }
    else{

        return (

            <View contentContainerStyle={styles.container}>
    
                <View style={{height: '100%'}}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}> 
                        {
                            lists.map((list, i) => (
                            <ListItem
                                style={styles.listItem} 
                                key={i} 
                                bottomDivider
                                onLongPress={() => deleteList(list, i)}
                                onPress={() => navigation.navigate('Items list', {groupId: groupId, listId: list.id})} 
                                >
                                <Avatar
                                    onPress={() => navigation.navigate('Image', {
                                        img64: list.img64,
                                        name: list.name
                                    })}
                                    source={
                                        list.img64 == '' ? 
                                        require("../utils/images/Unknown.png") : 
                                        { uri: list.img64 }
                                    } />
                                <ListItem.Content>
                                    <ListItem.Title>{list.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                            ))
                        }              
                    </ScrollView>
    
                    <View style={styles.bottomView}>
                        <Avatar
                            rounded
                            size={60}
                            onPress={() => navigation.navigate('New list', { groupId: groupId})}
                            source={
                                require("../utils/images/AddButton.png")
                            }
                        >
                        </Avatar>
                    </View>
                </View>  
            </View> 
        );
    }
};

