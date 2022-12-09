import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const PaymentList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [paymentList, setPaymentList] = useState([]);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}>
        <Marker
          coordinate={{latitude: 6.40607, longitude: 3.40735}}
          title="Emi School of Engineering"
          description="This is where the magic happens!"></Marker>
      </MapView>
    </View>
  );
};

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: deviceHeight,
    width: 420,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PaymentList;
