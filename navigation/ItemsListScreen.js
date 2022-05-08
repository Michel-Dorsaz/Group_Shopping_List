import React, { useState, useContext, useEffect } from'react';
import { View, ScrollView, Text, Modal, Image, Alert, TouchableHighlight } from'react-native';
import { Avatar, Button, ListItem, Icon} from'react-native-elements';
import { database, ref, onValue, get, set, off } from '../utils/Database';
import { styles }  from '../utils/Styles';
import { UserStateContext } from '../utils/UserContext';

export default function ItemsListScreen({ route, navigation }) {
    
    const {groupId, listId} = route.params;
    const {user, setUser} = useContext(UserStateContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(-1);

    const query = ref(database, 'Groups/' + groupId + '/lists/' + listId + '/items/'); 
    const callback = (snapshot) => {

        const data = snapshot.val();

        if(data != null){ 

            const itemsId = Object.keys(data);   
            const itemsList = Object.values(data);              
            
            itemsList.forEach((item, index) => {
                item.id = itemsId[index];
            })

            setItems(itemsList);

        }
        if(data == null){
            setItems([]);
        }

        setLoading(false);
    };



    useEffect(() => {       
        onValue(query, callback);

        return () => {
            off(query, "value", callback);
            setItems([]);
          };
    }, []);

    const deleteItem = (item, index) => {

            Alert.alert(
                "Confirmation required",
                "You are about to delete the item: " + item.name,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { 
                        text: "Confirm deletion", 
                        onPress: () => {
                            set(ref(database, 'Groups/' + groupId + '/lists/' + listId + '/items/' + item.id), null);
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
    
                <View style={{height: '100%', backgroundColor: 'white'}}>

                    <ScrollView contentContainerStyle={styles.scrollContainer}> 
                        {
                            items.map((item, i) => (

                            <ListItem.Accordion
                                bottomDivider
                                style={styles.listItem}
                                key={i}
                                content={
                                    <>                                        
                                        <Avatar
                                            onPress={() => navigation.navigate('Image', {
                                                img64: item.img64,
                                                name: item.name
                                            })}
                                            source={
                                                item.img64 == '' ? 
                                                require("../utils/images/Unknown.png") : 
                                                { uri: item.img64 }
                                            } />
                                        <ListItem.Content>                                           
                                            <ListItem.Title>{item.name}</ListItem.Title>
                                            <ListItem.Subtitle>{item.quantity}</ListItem.Subtitle>
                                        </ListItem.Content>

                                    </>
                                }
                                isExpanded={i == expanded}
                                onPress={() => {
                                    expanded == i ? setExpanded(-1) : setExpanded(i)
                                }} 
                                onLongPress={() => deleteItem(item, i)}
                                >
                                {
                                    <ListItem style={styles.image}>
                                    <Avatar
                                        size={'xlarge'}
                                        onPress={() => navigation.navigate('Image', {
                                            img64: item.img64,
                                            name: item.name
                                        })}
                                        source={
                                            item.img64 == '' ? 
                                            require("../utils/images/Unknown.png") : 
                                            { uri: item.img64 }
                                        }
                                    />
                                </ListItem>
                                }
   
                            </ListItem.Accordion>
                            ))
                        }            
                    </ScrollView>
    
                    <View style={styles.bottomView}>
                        <Avatar
                            rounded
                            size={60}
                            onPress={() => navigation.navigate('New item', {groupId: groupId, listId: listId})}
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

