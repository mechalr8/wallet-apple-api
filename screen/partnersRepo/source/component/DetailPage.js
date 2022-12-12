/**
 * Node_modules
 */
import normalize from 'react-native-normalize';
import React, {useState, useEffect, Fragment, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  Linking,
  Image,
  StatusBar,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
/**
 * Custom Modules
 */
import CloseIconWhite from '../assetsAndImages/closewhite.svg';

import {get} from 'lodash';
import {getMonthNameByDate} from '../utils/helper';
import {PrimaryColor, AlertColor} from '../assetsAndImages/Colors';
import {TicketDetailHeader} from './TicketDetailHeader';

const DetailPage = ({navigation, route}) => {
  const item = route.params?.item ?? undefined;
  const [originSOD, destinationSOD] = item.sod.split('|');
  const originState = item.origin_state ? item.origin_state : '';
  const destinationState = item.destination_state ? item.destination_state : '';
  const validTo = item.valid_to ? item.valid_to : '';
  const validFrom = item.valid_from ? item.valid_from : '';
  const issuedByName = item.issuedByName ? item.issuedByName : '';
  const issuedBy = get(item, 'issuedBy', '');
  const ticket_type = item.ticket_type ? item.ticket_type : '';

  const origin = item.origin_city_name
    ? item.origin_city_name + ', ' + originState
    : originSOD;
  const destination = item.destination_city_name
    ? item.destination_city_name + ', ' + destinationState
    : destinationSOD;

  // useEffect(() => {
  //     /**
  //      * Logic Designed by @raj_shekhar
  //      */
  //     let oldBrightness = 1;

  //     if (Platform.OS === 'ios') {
  //         ScreenBrightness.getBrightness().then((brightness) => {
  //             oldBrightness = Platform.OS === 'ios' ? brightness : brightness / 255;
  //             ScreenBrightness.setBrightness(1);
  //         });
  //     } else {
  //         SystemSetting.getAppBrightness().then((brightness) => {
  //             console.log('Current app brightness is ' + brightness);
  //             oldBrightness = brightness;
  //             SystemSetting.setAppBrightness(1);
  //         });
  //     }

  //     return () => {
  //         if (Platform.OS === 'ios') {
  //             ScreenBrightness.setBrightness(oldBrightness);
  //         } else {
  //             SystemSetting.setAppBrightness(oldBrightness);
  //         }
  //     };
  // }, []);

  const [minimizeMessage, setMinimizeMessage] = useState(true);

  const scrollViewInt = useRef();
  useEffect(() => {
    const onTop = navigation.addListener('focus', () => {
      scrollViewInt.current.scrollToEnd({animated: true});
    });
    return onTop;
  }, [navigation]);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.topStatusBar} />
      <SafeAreaView style={styles.root}>
        <ScrollView
          style={styles.container}
          ref={scrollViewInt}
          bounces="false">
          <View style={styles.container}>
            <TicketDetailHeader
              SOD={item.sod}
              issuedBy={issuedBy}
              origin={origin.toUpperCase()}
              destination={destination.toUpperCase()}
              validTo={validTo}
              serviceProviderName={issuedByName}
              validFrom={validFrom}
              ticketType={ticket_type}
            />
            <View style={styles.main}>
              <TicketCard item={item} />
            </View>
            <View
              style={{
                height: normalize(Platform.OS === 'ios' ? 50 : 50),
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  topStatusBar: {
    flex: 0,
    backgroundColor: PrimaryColor.BACKGROUND_COLOR,
  },
  root: {
    flex: 1,
    backgroundColor: PrimaryColor.TEXT_BACKGROUND_COLOR,
    top: Platform.OS === 'android' ? normalize(0) : normalize(0),
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: PrimaryColor.TEXT_BACKGROUND_COLOR,
    marginTop: Platform.OS === 'android' ? normalize(1) : normalize(0),
  },

  main: {
    flexDirection: 'column',
  },
  expiryWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: normalize(40, 'width'),
    paddingRight: normalize(40, 'width'),
    marginTop: normalize(13, 'height'),
  },
  title: {
    // fontFamily: 'Lato-Regular',
    fontSize: normalize(14),
    color: PrimaryColor.PLACEHOLDER_TEXT_COLOR,
  },
  date: {
    // fontFamily: 'Lato-Bold',
    color: PrimaryColor.TEXT_COLOR,
    fontSize: normalize(20),
    lineHeight: normalize(36),
  },
  headerWrapper: {
    display: 'flex',
    width: '100%',
    backgroundColor: PrimaryColor.BACKGROUND_COLOR,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: normalize(15),
  },
});

export const TicketDetailScreenNavigationOptions = ({navigation}) => {
  return {
    headerShown: true,
    title: '',
    headerBackTitleVisible: false,
    headerTintColor: PrimaryColor.TEXT_BACKGROUND_COLOR,
    headerTitleAlign: 'center',
    headerLeft: null,

    headerStyle: {
      backgroundColor: PrimaryColor.BACKGROUND_COLOR,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerRight: () => (
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <CloseIconWhite
            marginTop={normalize(12)}
            width={normalize(16, 'width')}
            height={normalize(16, 'height')}
          />
        </TouchableOpacity>
      </View>
    ),
  };
};

export default DetailPage;

/**
 * Ticket Card
 */

const TicketCard = ({
  item: {barcode_s3_url, ticket_type, passenger_type, id},
  item,
}) => {
  const VerifyId = CheckID => {
    if (CheckID === 'SENIOR' || CheckID === 'STUDENT') {
      return '*Vlid id required';
    } else {
      return null;
    }
  };
  const returnMultiTicketType = ticketTypeName => {
    if (
      (ticketTypeName === 'MONTHLY-PASS' ||
        ticketTypeName === 'MONTHLY-PASS-N') &&
      item.valid_from != null
    ) {
      return (
        'MONTHLY' +
        `-${getMonthNameByDate(item.valid_from, true).toUpperCase()}`
      );
    } else {
      return ticketTypeName;
    }
  };
  const [showQrModal, setShowQrModal] = useState(false);
  return (
    <View style={cardStyles.root}>
      <View style={cardStyles.container}>
        {VerifyId(item.passenger_type) ? (
          <Text style={cardStyles.idCheck}>
            {VerifyId(item.passenger_type)}
          </Text>
        ) : null}

        <Text style={cardStyles.title}>
          {returnMultiTicketType(ticket_type)}
          {', '}
          {passenger_type != null && passenger_type != undefined
            ? passenger_type
            : ''}
        </Text>
        {item.ticket_type !== 'ONE-WAY' &&
        item.ticket_type !== 'MONTHLY-PASS' &&
        item.ticket_type !== 'MONTHLY-PASS-N' ? (
          <Text
            style={
              item.redemption_left <= 2
                ? cardStyles.remainingTripDetailText
                : cardStyles.remainingTripDetailText1
            }>
            {item.redemption_left == 0 || item.redemption_left > 9
              ? 'Trips Remaining: ' + item.redemption_left + ' Trips'
              : 'Trips Remaining: ' + '0' + item.redemption_left + ' Trips'}
          </Text>
        ) : null}

        <Text style={cardStyles.referenceIdTitle}>{'Ticket Reference'}</Text>
        <View>
          <Text style={cardStyles.referenceId}>{id.split('-')[0]}</Text>
        </View>

        <View style={cardStyles.qrWrapper}>
          <View>
            <Image
              style={cardStyles.qrImage}
              source={{
                uri: `${barcode_s3_url}.png`,
              }}
            />
          </View>
        </View>
      </View>
      {/* {showQrModal ? (
                <QrImageModal item={item} onClose={() => setShowQrModal(false)} />
            ) : null} */}
      <View style={cardStyles.bottomTextView}>
        <Text style={cardStyles.bottomText}>
          {'Please confirm you are boarding the correct bus.'}
        </Text>
      </View>
      <View style={cardStyles.button}>
        <Button
          title="Add to Apple Wallet"
          color={PrimaryColor.BACKGROUND_COLOR}
          onPress={Linking.openURL('https://www.apple.com/wallet/')}
        />
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  root: {
    paddingLeft: normalize(17, 'width'),
    paddingRight: normalize(17, 'width'),
    paddingBottom: normalize(10, 'height'),
  },
  container: {
    backgroundColor: PrimaryColor.TEXT_BACKGROUND_COLOR,
    borderRadius: normalize(10),
    paddingBottom: normalize(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    bottom: normalize(25),
  },
  idCheck: {
    // fontFamily: 'Lato-Bold',
    color: AlertColor.REQUIRED_MSG_COLOR,
    fontSize: normalize(14),
    alignSelf: 'center',
    marginTop: normalize(15),
  },
  title: {
    // fontFamily: 'Lato-Bold',
    marginTop: normalize(10),
    color: PrimaryColor.TEXT_COLOR,
    fontSize: normalize(24),
    lineHeight: normalize(36),
    alignSelf: 'center',
    textAlign: 'center',
  },
  passengerType: {
    // fontFamily: 'Lato-Bold',
    color: PrimaryColor.TEXT_COLOR,
    fontSize: normalize(24),
    lineHeight: normalize(36),
    alignSelf: 'center',
  },
  qrWrapper: {
    marginTop: normalize(10, 'height'),
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: normalize(20),
  },
  qrImage: {
    width: normalize(300, 'width'),
    height: normalize(300),
  },
  qrContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: normalize(13, 'width'),
    flex: 1,
  },
  referenceIdTitle: {
    // fontFamily: 'Lato-Bold',
    fontSize: normalize(14),
    lineHeight: normalize(18),
    color: PrimaryColor.PLACEHOLDER_TEXT_COLOR,
    marginBottom: 4,
    alignSelf: 'center',
    marginTop: normalize(22),
  },
  referenceId: {
    // fontFamily: 'Lato-Bold',
    fontSize: normalize(16),
    lineHeight: normalize(22),
    alignSelf: 'center',
    color: PrimaryColor.TEXT_COLOR,
  },

  enlarge: {
    color: PrimaryColor.BUTTON_COLOR,
    // fontFamily: 'Lato-Bold',
    fontSize: normalize(12),
  },
  bottomTextView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    alignSelf: 'center',
    fontSize: normalize(14),
    // fontFamily: 'Lato-Regular',
    color: PrimaryColor.TEXT_COLOR,
  },
  remainingTripDetailText: {
    top: normalize(5),
    alignSelf: 'center',
    // fontFamily: 'Lato-Bold',
    fontSize: normalize(16),
    color: AlertColor.REQUIRED_MSG_COLOR,
  },
  remainingTripDetailText1: {
    top: normalize(5),
    alignSelf: 'center',
    // fontFamily: 'Lato-Bold',
    fontSize: normalize(16),
    color: PrimaryColor.TEXT_COLOR,
  },
  expandIconContainer: {
    alignSelf: 'flex-end',
    marginTop: normalize(5),
    marginRight: normalize(8),
  },
  button: {
    marginTop: normalize(15),
    alignSelf: 'center',
  },
});
