import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';

const ExpenseList = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [expenditureList, setExpenditure] = useState([]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/home.jpeg')}
        resizeMode="contain"
        style={styles.image}
      />
      <Text>Hi</Text>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight - 10,
    paddingTop: 5,
  },
  title: {
    fontSize: 15,
  },
});

export default ExpenseList;
