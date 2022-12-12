/**
 * Node_modules
 */
import React, { useState, useEffect } from 'react';
import normalize from 'react-native-normalize';
import { StyleSheet, View, Text, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * Application Components
 */
import { PrimaryColor, RGBAColor, ApiURL } from '../assetsAndImages/Colors';
import {
    validToTicketExpires,
    formateTicketExpires,
    getValidFromToInMonthByDate,
} from '../utils/helper';

export const TicketDetailHeader = ({
    origin,
    destination,
    validTo,
    serviceProviderName,
    validFrom,
    ticketType,
    SOD,
    issuedBy,
}) => {
    const sodFareZone = SOD.split('|');

    const [toolTipVisibleTop, setTopToolTipVisible] = useState(false);

    const [toolTipVisible, setToolTipVisible] = useState(false);

    const [resData, setRespData] = useState('');



    useEffect(() => {

    }, []);

    const ToolTipContent = ({ item }) => {
        return (
            <View style={styles.toolTipTopContainer}>
                <Text style={styles.toolTipContentTitle}>
                    {toolTipVisible
                        ? 'STOPS_BOARD'
                        : 'STOPS_DISEMBARK'}
                </Text>
                <ScrollView>
                    {item.length > 0
                        ? item.map((i) => {
                            return (
                                <View key={i} style={{ flexDirection: 'row' }}>
                                    <View style={styles.ovalDotIocnContainer}>
                                        {/* <OvalWhiteIcon /> */}
                                    </View>
                                    <View style={styles.toolTipContentPoint1View}>
                                        <Text style={styles.toolTipContentPoint1}>{i}</Text>
                                    </View>
                                </View>
                            );
                        })
                        : null}
                </ScrollView>
            </View>
        );
    };

    return (
        <LinearGradient
            colors={[PrimaryColor.BACKGROUND_COLOR, PrimaryColor.BACKGROUND_COLOR]}>
            <View style={styles.root}>
                <View style={styles.locationWrapper}>
                    <Text style={styles.headingText}>
                        {'Destination'}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '90%' }}>
                            <Text numberOfLines={1} style={styles.locationText}>
                                {destination}
                            </Text>
                        </View>

                        {resData ? (
                            <View
                                style={{ marginLeft: normalize(10), marginTop: normalize(4) }}>
                                {/* <Tooltip
                                    animated={true}
                                    arrowSize={{ width: normalize(62), height: normalize(28) }}
                                    isVisible={toolTipVisibleTop}
                                    backgroundColor={'rgba(0,0,0,0.0)'}
                                    content={
                                        <ToolTipContent
                                            item={resData ? resData.destinationOthersStops : ''}
                                        />
                                    }
                                    contentStyle={{
                                        backgroundColor: 'black',
                                        width: '100%',
                                    }}
                                    onClose={() => setTopToolTipVisible(false)}
                                    placement="left">
                                    <TouchableOpacity
                                        onPress={() => {
                                            setTopToolTipVisible(true);
                                        }}>
                                        <IWhiteButtonIcon />
                                    </TouchableOpacity>
                                </Tooltip> */}
                            </View>
                        ) : null}
                    </View>
                </View>
                <View style={{ ...styles.locationWrapper, ...styles.destinationWrapper }}>
                    <Text style={styles.headingText}>
                        {'Origin'}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '90%' }}>
                            <Text numberOfLines={1} style={styles.locationText}>
                                {origin}
                            </Text>
                        </View>
                        {resData ? (
                            <View
                                style={{ marginLeft: normalize(10), marginTop: normalize(4) }}>
                                {/* <Tooltip
                                    animated={true}
                                    arrowSize={{ width: normalize(62), height: normalize(28) }}
                                    isVisible={toolTipVisible}
                                    backgroundColor={'rgba(0,0,0,0.0)'}
                                    content={
                                        <ToolTipContent
                                            item={resData ? resData.originOthersStops : ''}
                                        />
                                    }
                                    contentStyle={{
                                        backgroundColor: 'black',
                                        width: '100%',
                                    }}
                                    onClose={() => setToolTipVisible(false)}
                                    placement="left">
                                    <TouchableOpacity
                                        onPress={() => {
                                            setToolTipVisible(true);
                                        }}>
                                        <IWhiteButtonIcon />
                                    </TouchableOpacity>
                                </Tooltip> */}
                            </View>
                        ) : null}
                    </View>
                    <Text style={styles.validTo_ServiceProviderNameKey}>
                        {ticketType === 'MONTHLY-PASS' || ticketType === 'MONTHLY-PASS-N'
                            ? 'Valid: '
                            : 'Valid through: '}
                        <Text style={styles.validTo_ServiceProviderNameValue}>
                            {ticketType === 'MONTHLY-PASS' || ticketType === 'MONTHLY-PASS-N'
                                ? getValidFromToInMonthByDate(validFrom)
                                : formateTicketExpires(validTo)}
                        </Text>
                    </Text>
                    {serviceProviderName.length > 0 ? (
                        <Text style={styles.validTo_ServiceProviderNameKey}>
                            Issuing OPR:{' '}
                            <Text style={styles.validTo_ServiceProviderNameValue}>
                                {serviceProviderName.toUpperCase()}
                            </Text>
                        </Text>
                    ) : null}
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: normalize(16, 'width'),
        paddingRight: normalize(16, 'width'),
        paddingTop: normalize(20, 'height'),
    },
    locationWrapper: {
        flexDirection: 'column',
        marginBottom: normalize(10, 'height'),
    },
    destinationWrapper: {
        marginBottom: normalize(36, 'height'),
    },
    headingText: {
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
        fontSize: normalize(16),
        lineHeight: normalize(22),
        // fontFamily: 'Lato-Regular',
        marginBottom: 2,
    },
    locationText: {
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
        fontSize: normalize(34),
        lineHeight: normalize(42),
        // fontFamily: 'Lato-Bold',
        marginTop: normalize(-7),
    },
    validTo_ServiceProviderNameKey: {
        lineHeight: normalize(22),
        // fontFamily: 'Lato-Regular',
        fontSize: normalize(15),
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
        marginTop: normalize(10),
    },
    toolTipTopContainer: {
        paddingRight: normalize(5),
        paddingLeft: normalize(6),
        marginTop: normalize(-8),
        marginBottom: normalize(5),
    },
    toolTipContentTitle: {
        lineHeight: normalize(20),
        // fontFamily: 'Lato-Regular',
        fontSize: normalize(16),
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
        marginTop: normalize(10),
    },
    toolTipContentPoint1View: {
        width: '95%',
    },
    toolTipContentPoint1: {
        lineHeight: normalize(20),
        // fontFamily: 'Lato-Regular',
        fontSize: normalize(13),
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
        marginTop: normalize(10),
    },
    toolTipContentPoint2View: {
        width: '95%',
    },
    toolTipContentPoint2: {
        lineHeight: normalize(20),
        // fontFamily: 'Lato-Regular',
        fontSize: normalize(13),
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
        marginTop: normalize(10),
    },
    ovalDotIocnContainer: {
        justifyContent: 'flex-start',
        marginTop: normalize(18),
        marginRight: normalize(10),
    },
    validTo_ServiceProviderNameValue: {
        // fontFamily: 'Lato-Bold',
        lineHeight: normalize(22),
        fontSize: normalize(15),
        color: PrimaryColor.TEXT_BACKGROUND_COLOR,
        marginTop: normalize(10),
    },
});
