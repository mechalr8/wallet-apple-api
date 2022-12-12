import React from 'react';
import { View, Text } from 'react-native';

const FirstPage = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Text
                onPress={() => {
                    navigation.navigate('List Page')
                }}
                style={{
                    color: 'red'
                }}>Go to list</Text>
        </View>
    );
}

export default FirstPage;