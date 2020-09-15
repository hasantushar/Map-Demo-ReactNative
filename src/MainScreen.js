import React, { useState, useCallback } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal';
import GetLocation from './GetLocation';

const MainScreen = () => {
    const initialLocation = {
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
    };

    const [isModalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState("");
    const [location, setLocation] = useState(initialLocation);

    const callback = useCallback((location) => {
        console.log(location);
        setLocation(location);
    }, [location]);


    const [err] = GetLocation(callback);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <SafeAreaView>

            {err ? <Text style={styles.errorText} > Please allow location services, reload the app if this text stays after enabling. The map should go fullscreen after reloading</Text> : null}

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
                onBackdropPress={toggleModal}
                onSwipeComplete={toggleModal}
                swipeDirection="down"
                backdropOpacity={0.01}
                hideModalContentWhileAnimating={true}
                onBackButtonPress={toggleModal}
            >
                <SafeAreaView style={styles.modal}>
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
                        setName("");
                        toggleModal();
                    }} />
                </SafeAreaView>
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 800
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 30,
    },
    modal: {
        width: 350,
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
        marginBottom: 10
    }
});

export default MainScreen;

