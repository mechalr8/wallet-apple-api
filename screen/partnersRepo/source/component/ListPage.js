import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { ListItem } from './ListItem';
import ListData from '../data/listData.json'
import { TopTabHeader } from './TopTabHeader';

const ListPage = ({ navigation }) => {
    const [isCurrentTicketOpen, setIsCurrentTicketOpen] = useState(true);
    const listData = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Ticket 1',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Ticket 2',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Ticket 3',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b1',
            title: 'Ticket 4',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6l',
            title: 'Ticket 5',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d7a',
            title: 'Ticket 6',
        },
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <TopTabHeader
                isCurrentTabActive={isCurrentTicketOpen}
                navigation={navigation}
                onClick={(tabName) =>
                    setIsCurrentTicketOpen(tabName === 'current')
                }
            />
            {isCurrentTicketOpen ?
                (<FlatList
                    data={ListData.currentTicket}
                    renderItem={({ item, index }) => {
                        return <ListItem
                            index={index}
                            item={item}
                            isCurrent={true}
                            navigation={navigation}
                        />
                    }}
                />) :
                (<FlatList
                    data={ListData.pastTicket}
                    renderItem={({ item, index }) => {
                        return <ListItem
                            index={index}
                            item={item}
                            isCurrent={false}
                            navigation={navigation}
                        />
                    }}
                />)}
        </SafeAreaView>
    );
}

const FlatlistCard = ({ title, navigation }) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Detail')
        }}>
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        backgroundColor: '#EEEE89',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 12
    },
    title: {
        fontSize: 32,
    },
});
export default ListPage;