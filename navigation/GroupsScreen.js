import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Modal, Image, Alert, TouchableHighlight } from'react-native';
import { Avatar, Button, ListItem, Input} from'react-native-elements';
import { database, ref, onValue, get, set, off } from '../utils/Database';
import { styles }  from '../utils/Styles';
import { UserStateContext } from '../utils/UserContext';

export default function GroupsScreen({ navigation }) {
    
    const {user, setUser} = useContext(UserStateContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    const query = ref(database, 'Users/' + user.phone + '/groups/'); 
    const callback = (snapshot) => {

        const data = snapshot.val(); 

        let userGroups = [];
        let userGroupsId = [];

        if(data != null){ 

            userGroupsId = Object.keys(data);              
            
            get(ref(database, 'Groups/'))
            .then((snapshot) => {
    
                const groupsObj = snapshot.val();  
    
                let existingGroupsId = [];
                let existingGroups = [];
    
                if(groupsObj != null){
                    existingGroupsId = Object.keys(groupsObj);   
                    existingGroups = Object.values(groupsObj);                       
                }

                userGroups = existingGroups.filter((group, index) => {
                    if(userGroupsId.includes(existingGroupsId[index]))
                        return group;
                })

                userGroups.forEach((group, index) => {
                    group.id = userGroupsId[index];
                });

                setGroups(userGroups);              
    
            }); 
        }
        if(data == null){
            setGroups([]);
        }
        setLoading(false);
    };



    useEffect(() => {       
        onValue(query, callback);

        return () => {
            off(query, "value", callback);
            setGroups([]);
          };
    }, []);

    const deleteGroup = (group, index) => {

        if(user.phone == group.owner){
            Alert.alert(
                "Confirmation required",
                "You are about to delete the group: " + group.name,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { 
                        text: "Confirm deletion", 
                        onPress: () => {
                            set(ref(database, 'Groups/' + group.id), null);

                            get(ref(database, 'Users/'))
                            .then((snapshot) => {

                                snapshot.forEach((childSnapshot) => {
                                    const childKey = childSnapshot.key;
                                    
                                    set(ref(database, 'Users/' + childKey + '/groups/' + group.id), null);

                                  });
                            })
                        }
                    }
                ]);
        }
        else{
            Alert.alert(
                "Confirmation required",
                "You are about to quit the group: " + group.name,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { 
                        text: "Confirm", 
                        onPress: () => {
                            set(ref(database, 'Users/' + user.phone + '/groups/' + group.id), null);
                        }
                    }
                ]); 
        }       
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
                onPress={() => navigation.navigate('Your profil', 
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
                            groups.map((group, i) => (
                            <ListItem
                                style={styles.listItem} 
                                key={i} 
                                bottomDivider
                                onLongPress={() => deleteGroup(group, i)} 
                                onPress={() => navigation.navigate('Lists', { groupId: group.id})}
                                >
                                <Avatar
                                    onPress={() => navigation.navigate('Image', {
                                        img64: group.img64,
                                        name: group.name
                                    })}
                                    source={
                                        group.img64 == '' ? 
                                        require("../utils/images/Unknown.png") : 
                                        { uri: group.img64 }
                                    } />
                                <ListItem.Content>
                                    <ListItem.Title>{group.name}</ListItem.Title>
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
                        onPress={() => {
                            Alert.alert(
                                "Add a group",
                                "Choose an option :",
                                [
                                    {
                                        text: "Cancel",
                                        style: "cancel"
                                    },
                                    {
                                        text: "Join a group",
                                        onPress: () => navigation.navigate('Join group')
                                    },
                                    {
                                        text: "Create a new group",
                                        onPress: () => navigation.navigate('New group')
                                    }
                            ]);
                        
                        }}
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

