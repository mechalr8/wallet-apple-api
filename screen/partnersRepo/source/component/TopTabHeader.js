/**
 * Node_modules
 */
import React from 'react';
import normalize from 'react-native-normalize';
import { Text, StyleSheet, View, TouchableOpacity, Platform } from 'react-native';

/**
 * Application Components
 */
import { PrimaryColor, RGBAColor } from '../assetsAndImages/Colors';
// import { Forward } from '../../../../../assets';

/**
 * My Ticket Header
 */
export const TopTabHeader = ({
    isCurrentTabActive = true,
    onClick,
    navigation,
}) => {
    return (
        <View style={styles.root}>
            <View style={styles.wrapper}>

                <View style={styles.tabWrapper}>
                    <TouchableOpacity
                        onPress={() => onClick('current')}
                        style={{
                            ...styles.half,
                            ...(isCurrentTabActive ? styles.activeTab : {}),
                        }}>
                        <Text
                            style={{
                                ...styles.tabText,
                                ...(isCurrentTabActive ? styles.activeTabColor : {}),
                            }}>
                            {'Current Tickets'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => onClick('past')}
                        style={{
                            ...styles.half,
                            ...(!isCurrentTabActive ? styles.activeTab : {}),
                        }}>
                        <Text
                            style={{
                                ...styles.tabText,
                                ...(!isCurrentTabActive ? styles.activeTabColor : {}),
                            }}>
                            {'Past Tickets'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        backgroundColor: PrimaryColor.TEXT_BACKGROUND_COLOR,
        paddingBottom: normalize(5, 'height'),
        overflow: 'hidden', // to hide the shadow from top
    },
    wrapper: {
        flexDirection: 'column',
        backgroundColor: PrimaryColor.BACKGROUND_COLOR,
        marginBottom: normalize(5, 'height'),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.18,
        shadowRadius: 5,
        elevation: 1,
    },
    header: {
        // fontFamily: 'Lato-Bold',
        fontSize: normalize(16),
        lineHeight: normalize(30, 'height'),
        left: normalize(100),
        flex: 1,
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
    },
    tabWrapper: {
        paddingTop: normalize(17, 'height'),
        flexDirection: 'row',
    },
    tabText: {
        // fontFamily: 'Lato-Bold',
        fontSize: normalize(16),
        lineHeight: normalize(20, 'height'),
        color: RGBAColor.WHITE_5,
        textAlign: 'center',
    },
    half: {
        flex: 1,
        borderBottomColor: PrimaryColor.BACKGROUND_COLOR,
        borderBottomWidth: 4,
        paddingBottom: normalize(12, 'height'),
    },
    activeTab: {
        borderBottomColor: PrimaryColor.TEXT_BACKGROUND_COLOR,
    },
    activeTabColor: {
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
    },
});
