import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';

const ModalTester = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View>
            <Button title="Show modal" onPress={toggleModal} />

            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection="down"
                backdropOpacity={0.15}
                hideModalContentWhileAnimating={true}
            >
                <View style={styles.modal}>
                    <Text style={styles.text}>Hello!, I am modal</Text>
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputStyle}
                        placeholder='Latitude'

                    />
                    <TextInput
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={styles.inputStyle}
                        placeholder='Longitude'

                    />


                    <Button title="Send to Console" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        width: 300,
        //borderWidth: 3,
        //borderColor: 'red',
        marginTop: 400,
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


export default ModalTester;