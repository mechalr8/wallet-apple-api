import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from "react-native";
import { PrimaryColor, AlertColor, SecondaryColor } from "../assetsAndImages/Colors";
import normalize from 'react-native-normalize';
import { getMonthNameByDate, getValidFromToInMonthByDate, validToTicketExpires } from "../utils/helper";
import TrainTicketIcon from '../assetsAndImages/trainicon.svg';
import ViewTicketIcon from '../assetsAndImages/view_ticket_icon.svg';
import ViewReceiptIcon from '../assetsAndImages/view_receipt_icon.svg';
import BuyAgainIcon from '../assetsAndImages/buy_again_icon.svg';
import OriginDot from '../assetsAndImages/origin-dot.svg';
import DestinationDot from '../assetsAndImages/destination-dot.svg';

export const ListItem = ({
    item,
    index,
    isCurrent,
    buyAgainOption,
    navigation,
}) => {
    const [originSOD, destinationSOD] = item?.sod ? item?.sod.split('|') : '';
    const originState = item?.origin_state ? item?.origin_state : '';
    const destinationState = item?.destination_state ? item?.destination_state : '';

    const origin = item?.origin_city_name
        ? item?.origin_city_name + ', ' + originState
        : originSOD;
    const destination = item?.destination_city_name
        ? item?.destination_city_name + ', ' + destinationState
        : destinationSOD;

    const isNotNullUndefined = (data) => {
        if (data != null && data != undefined) {
            return data.toUpperCase();
        }
        return '';
    };
    const returnMultiTicketType = (ticketTypeName) => {
        if (
            ticketTypeName === 'MONTHLY-PASS' ||
            ticketTypeName === 'MONTHLY-PASS-N'
        ) {
            return (
                'MONTHLY' +
                `-${getMonthNameByDate(item?.valid_from, true).toUpperCase()}`
            );
        } else {
            return ticketTypeName;
        }
    };

    return (
        <View style={styles.topView}>

            <View style={styles.rootTopView}>
                <View
                    style={{
                        ...styles.root,
                        ...(index === 0 ? styles.firstRow : {}),
                    }}>
                    <View style={styles.wrapper}>
                        <View
                            style={
                                buyAgainOption
                                    ? styles.icon
                                    : styles.iconWithOriginDestinationDot
                            }>
                            {buyAgainOption ? (
                                <TrainTicketIcon width="100%" height="100%" />
                            ) : (
                                    <>
                                        <OriginDot />
                                        <View
                                            style={{
                                                paddingTop: normalize(3),
                                                paddingBottom: normalize(3),
                                            }}>
                                        </View>
                                        <DestinationDot />
                                    </>
                                )}
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.locationText}>
                                {isNotNullUndefined(origin).toUpperCase()}
                            </Text>
                            <Text style={styles.locationText}>
                                {isNotNullUndefined(destination).toUpperCase()}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        <View style={styles.ticketTypeView} />
                        <View
                            style={
                                !isCurrent
                                    ? styles.pastTicketActionWrapper
                                    : styles.currentTicketActionWrapper
                            }>
                            <View>
                                <View
                                    style={{
                                        ...styles.btn,
                                    }}>
                                    <Text style={styles.btnText}>
                                        {isNotNullUndefined(
                                            returnMultiTicketType(item?.ticket_type),
                                        ).toUpperCase() + ', '}
                                        {isNotNullUndefined(item?.passenger_type).toUpperCase()}
                                    </Text>
                                    <View></View>
                                </View>
                            </View>
                            {isCurrent ? (
                                <View style={styles.remainTicketActionWrapper}>
                                    {item?.ticket_type !== 'ONE-WAY' &&
                                        item?.ticket_type !== 'MONTHLY-PASS' &&
                                        item?.ticket_type !== 'MONTHLY-PASS-N' ? (
                                            <Text
                                                style={
                                                    item?.redemption_left <= 2
                                                        ? styles.tripRemainText1
                                                        : styles.tripRemainText
                                                }>
                                                {(item?.redemption_left == 0 || item?.redemption_left > 9
                                                    ? item?.redemption_left
                                                    : '0' + item?.redemption_left) +
                                                    ' Trips Remaining'}
                                            </Text>
                                        ) : null}
                                </View>
                            ) : null}
                        </View>
                    </View>

                    {isCurrent ? (
                        <View style={styles.tripRemainView}>
                            {item?.passenger_type === 'STUDENT' ||
                                item?.passenger_type === 'SENIOR' ? (
                                    <Text style={styles.tripRemainText1}>
                                        {'Valid ID Required'}
                                    </Text>
                                ) : null}
                        </View>
                    ) : null}
                    {/* <View style={styles.tripvValidToView}>
                        <Text style={styles.validToText}>
                            {item?.ticket_type === 'MONTHLY-PASS' ||
                                item?.ticket_type === 'MONTHLY-PASS-N'
                                ? 'Valid ' + getValidFromToInMonthByDate(item?.valid_from)
                                : validToTicketExpires(item?.valid_to)}
                        </Text>
                    </View> */}
                </View>
                <View style={styles.speraterHorizontalLine}></View>
                {isCurrent ? <View style={styles.bottomViewRootContainer}>
                    {isCurrent ? (
                        <>
                            <TouchableOpacity
                                disabled={!isCurrent}
                                onPress={() => {
                                    if (isCurrent) {
                                        navigation.navigate('Detail', { item })
                                    }
                                }}>
                                <View style={styles.iconTextContainer}>
                                    <ViewTicketIcon />
                                    <Text style={styles.textStyle}>
                                        {'View Ticket'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.speraterVerticalLine} />
                        </>
                    ) : null}

                    <TouchableOpacity
                        // disabled={!networkStatus.isInternetReachable}
                        onPress={() => {
                            Alert.alert('View Receipt')
                        }}
                    >
                        <View style={styles.iconTextContainer}>
                            <ViewReceiptIcon />
                            <Text style={styles.textStyle}>
                                {'View Receipt'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View> : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: PrimaryColor.TEXT_BACKGROUND_COLOR,
        paddingTop: normalize(18, 'height'),
        paddingBottom: normalize(20, 'height'),
        paddingLeft: normalize(15, 'height'),
        paddingRight: normalize(15, 'height'),
    },
    rootTopView: {
        borderBottomWidth: normalize(10),
        borderBottomColor: AlertColor.LINE_COLOR,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    topView: {
        top: normalize(-8),
    },
    firstRow: {
        paddingTop: normalize(13, 'height'),
    },
    wrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    icon: {
        width: normalize(34),
        height: normalize(34),
        marginRight: normalize(15, 'width'),
    },
    iconWithOriginDestinationDot: {
        width: normalize(34),
        height: normalize(34),
        alignSelf: 'flex-start',
        marginTop: normalize(5),
        marginLeft: normalize(15),
    },
    ticketTypeView: {
        width: normalize(34),
        height: normalize(20),
        marginRight: normalize(15, 'width'),
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        paddingRight: normalize(20),
    },
    locationText: {
        fontSize: normalize(14),
        // fontFamily: 'Lato-Bold',
        lineHeight: normalize(22),
        marginTop: 1,
        marginBottom: 1,
        marginRight: normalize(10),
        color: PrimaryColor.TEXT_COLOR,
    },
    pastTicketActionWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: normalize(9, 'height'),
        justifyContent: 'space-between',
    },
    currentTicketActionWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: normalize(9, 'height'),
    },
    remainTicketActionWrapper: {
        marginLeft: normalize(9, 'height'),
        justifyContent: 'center',
    },
    btn: {
        borderRadius: normalize(4),
        borderColor: PrimaryColor.PLACEHOLDER_TEXT_COLOR,
        marginRight: normalize(6, 'width'),
        paddingHorizontal: normalize(10, 'width'),
        paddingVertical: normalize(5, 'height'),
        backgroundColor: SecondaryColor.DISABLE_TEXT_FIELD_COLOR,
        height: normalize(30),
    },
    btnViewReceipt: {
        marginRight: normalize(0),
        alignSelf: 'flex-start',
    },
    btnBuyAgain: {
        marginRight: normalize(0),
        alignSelf: 'flex-end',
    },
    disbaledBtn: {
        backgroundColor: '#cacaca',
    },
    validToText: {
        lineHeight: normalize(22),
        // fontFamily: 'Lato-Regular',
        fontSize: normalize(13),
        color: PrimaryColor.DISABLE_BUTTON_COLOR,
        marginRight: normalize(10),
    },
    btnTextViewReceipt: {
        lineHeight: normalize(22),
        // fontFamily: 'Lato-Bold',
        fontSize: normalize(12),
        textAlign: 'center',
        color: PrimaryColor.COMMON_TEXT_COLOR,
        alignSelf: 'flex-end',
        marginRight: 10,
    },
    btnText: {
        color: PrimaryColor.TEXT_COLOR,
    },
    tripRemainView: {
        width: '100%',
        marginLeft: normalize(50),
        marginRight: normalize(0),
    },
    tripvValidToView: {
        width: '100%',
        marginTop: normalize(5),
        marginLeft: normalize(50),
        marginRight: normalize(0),
    },
    tripvViewReceitAndBuyAgain: {
        flexDirection: 'row',
        flex: 1,
        marginTop: normalize(10),
        marginLeft: normalize(50),
        marginRight: normalize(0),
        justifyContent: 'space-between',
    },
    tripRemainText: {
        // fontFamily: 'Lato-Italic',
        width: '100%',
        fontStyle: 'italic',
        fontSize: normalize(12),
        color: PrimaryColor.TEXT_COLOR,
        lineHeight: normalize(22),
        letterSpacing:
            Platform.OS === 'ios' ? normalize(0) : normalize(2),
    },
    tripRemainText1: {
        // fontFamily: 'Lato-Italic',
        fontStyle: 'italic',
        width: '100%',
        fontSize: normalize(12),
        color: AlertColor.REQUIRED_MSG_COLOR,
        lineHeight: normalize(22),
        letterSpacing:
            Platform.OS === 'ios' ? normalize(0) : normalize(2),
    },
    bottomViewRootContainer: {
        height: normalize(40),
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        left: normalize(3.5),
    },
    textStyle: {
        marginLeft:
            Platform.OS === 'ios' ? normalize(4) : normalize(7),
        color: PrimaryColor.COMMON_TEXT_COLOR,
        // fontFamily: 'Lato-Bold',
        fontSize: normalize(12),
    },
    speraterVerticalLine: {
        height: normalize(22),
        paddingVertical: normalize(10),
        alignSelf: 'center',
        width: Platform.OS === 'ios' ? normalize(1) : normalize(3),
        backgroundColor: AlertColor.LINE_COLOR,
    },
    speraterHorizontalLine: {
        height: Platform.OS === 'ios' ? normalize(1) : normalize(3),
        width: '100%',
        backgroundColor: AlertColor.LINE_COLOR,
    },
    buyAgainBtnContainer: {
        marginLeft:
            Platform.OS === 'ios' ? normalize(4) : normalize(7),
    },
    iconTextContainer: {
        flexDirection: 'row',
    },
    separator: {
        left: normalize(5),
        height: normalize(8),
        flexDirection: 'column',
    },
});
