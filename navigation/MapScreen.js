import React, {useState, useEffect} from'react';
import { View, Text } from'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import * as Location from'expo-location';
import { styles }  from '../utils/Styles';

export default function MapScreen({ navigation }) {

    const [address, setAddress] = useState('');
     
    const [region, setRegion] = useState({          
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221});
    
    const [marker, setMarker] = useState({          
        latitude: 46.1280417,
        longitude: 7.0946756
    });

    useEffect(() => {  

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status !== 'granted') {      
                Alert.alert('No permission to get location')
                return;    
            }
            
            let location = await Location.getCurrentPositionAsync({});    

            updatePosition(location.coords.latitude, location.coords.longitude)  
        
        })();
    }, []);

    const search = () => {

      fetch("http://www.mapquestapi.com/geocoding/v1/address?key=5WCInUXWhZ5J6HIkr8VNB8PEotUFSIYX&location=" + address)
        .then((response) => response.json())
        .then((data) => {
    
          let locations = data.results[0].locations[0].latLng;
    
          updatePosition(locations.lat, locations.lng);
    
        })
        .catch((error) => {
          console.error(error);
        });
    };

      const updatePosition = (latitude, longitude) => {

        setRegion(
          {...region, 
            latitude : latitude, 
            longitude: longitude
          });
        setMarker(
          {
            latitude : latitude, 
            longitude: longitude
          });  
      }

      return (
    
        <View style={{flex: 1}}>
          <MapView
            style={{flex: 2}}
            region={region}
          >
            <Marker
              coordinate={marker}
            />
          </MapView>

          <View style={styles.container}>

          <Text style={[styles.adjustedTop, styles.title]}>Address</Text>
            <Input
                value={address}
                placeholder='Type in address to search'
                textAlign='center'
                onChangeText={(text) => setAddress(text)}
            />

            <View style={styles.containerLeft}>           

              <Button
                  buttonStyle={styles.buttonValidate}
                  title="Search"
                  onPress={() => search()}
              />
            </View>

            </View>
        </View>
      );
};