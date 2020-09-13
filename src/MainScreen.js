import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {
    Accuracy,
    requestPermissionsAsync,
    watchPositionAsync
} from 'expo-location';
import Modal from 'react-native-modal';

const MainScreen = () => {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [err, setErr] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [location, setLocation] = useState({
        "coords": {
            "accuracy": 20,
            "altitude": 0,
            "heading": 90,
            "latitude": 23.78973410127297,
            "longitude": 90.42522132396698,
            "speed": 0,
        },
        "mocked": false,
        "timestamp": 1599938018000,
    });

    const startWatching = async () => {
        try {
            await requestPermissionsAsync();
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, (location) => {
                setLat(location.coords.latitude);
                setLong(location.coords.longitude);
                console.log(location);
                setLocation(location);
            });
        } catch (e) {
            setErr(e);
            console.log(e);
        }
    };

    useEffect(() => {
        startWatching();
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView>
            {err ? <Text>Please allow location services</Text> : null}


            <MapView
                style={styles.map}
                initialRegion={{
                    ...location.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                region={{
                    ...location.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <Marker
                    onPress={toggleModal}
                    key={'current'}
                    pinColor={"lime"}
                    coordinate={location.coords}
                    title={`Place's title`}
                    description={`It's Description`}
                ></Marker>

            </MapView>

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="down"
                backdropOpacity={0.01}
                hideModalContentWhileAnimating={true}

            >
                <View style={styles.modal}>

                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputStyle}
                        placeholder='Enter Name'
                        value={`${name}`}
                        onChangeText={newName => setName(newName)}

                    />
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputStyle}
                        placeholder='LatLong'
                        value={`LatLong: ${location.coords.latitude} , ${location.coords.longitude}`}

                    />


                    <Button title="Send to Console" onPress={() => {
                        console.log(`Name: ${name}`);
                        console.log(`Latitude: ${location.coords.latitude}`);
                        console.log(`Longitude: ${location.coords.longitude}`);
                        toggleModal();
                    }} />
                </View>
            </Modal>



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 800
    },
    modal: {
        width: 350,
        //borderWidth: 3,
        //borderColor: 'red',
        marginTop: 200,
        alignSelf: 'center',
        borderRadius: 10
    },
    text: {
        fontSize: 20
    },
    inputStyle: {
        fontSize: 18,
        marginTop: 1,
        backgroundColor: '#F0EEEE',
        height: 30,
        borderRadius: 5,
        marginHorizontal: 15,
        //flexDirection: 'row',
        //alignItems: 'center',
        marginBottom: 10
    }
});

export default MainScreen;

