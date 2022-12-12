import { zonedTimeToUtc, format, utcToZonedTime } from 'date-fns-tz';
import { getYear, getTime, differenceInDays, isValid } from 'date-fns';
import moment from 'moment';
import { noop } from 'lodash';
import { Dimensions } from 'react-native';

const shortMonthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

const fullMonthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function DayAsString(dayIndex) {
    var weekdays = new Array(7);
    weekdays[0] = 'Sun';
    weekdays[1] = 'Mon';
    weekdays[2] = 'Tue';
    weekdays[3] = 'Wed';
    weekdays[4] = 'Thu';
    weekdays[5] = 'Fri';
    weekdays[6] = 'Sat';

    return weekdays[dayIndex];
}
export const shortMonthNameValue = function (index) {
    return shortMonthName[index];
};
export const dateFormat = function (date) {
    const _date = date ? new Date(date) : null;
    if (_date) {
        return (
            shortMonthName[_date.getMonth()] +
            ' ' +
            _date.getDay().toString().padStart(2, '0') +
            ', ' +
            _date.getFullYear()
        );
    }
    return 'N/A';
};
export const timeFormat = (datestr) => {
    const date = datestr ? new Date(datestr) : null;
    if (!date) {
        return 'N/A';
    }
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const am_pm = date.getHours() >= 12 ? 'pm' : 'am';
    hours = hours < 10 ? '0' + hours : hours;
    const minutes =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return hours + ':' + minutes + am_pm;
};

export const otpTimeFormat = (sec, f = 'hh:mma, MM/DD/YYYY') => {
    var d = new Date();
    var n = d.getTimezoneOffset() / 60;
    const offset = -n - getTimeOffset();
    return moment(sec).add(offset, 'hours').format(f);
};

export const otpTimeFormatWithoutDate = (sec, f = 'hh:mma') => {
    var d = new Date();
    var n = d.getTimezoneOffset() / 60;
    const offset = -n - getTimeOffset();
    return moment(sec).add(offset, 'hours').format(f);
};

export const optServerCurrentDate = () => {
    var d = new Date();
    var n = d.getTimezoneOffset() / 60;
    const offset = -n - getTimeOffset();
    return moment().add(offset, 'hours');
};

function getTimeOffset() {
    let user_timezone = new Date().getTimezoneOffset();
    let sign = user_timezone <= 0 ? '+' : '-';
    user_timezone = Math.abs(user_timezone);
    let absolute_number = user_timezone / 60;
    return sign === '-' ? -absolute_number : absolute_number;
}

export const timmer = function (toMinutes, callback) {
    // Get today's date and time

    let countDownDate = new Date();
    countDownDate = countDownDate.setMinutes(
        countDownDate.getMinutes() + toMinutes,
    );

    const fnc = setInterval(() => {
        const now = new Date().getTime();
        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) {
            clearInterval(fnc);
        } else {
            callback({ days, hours, minutes, seconds, distance });
        }
    }, 1000);
    return fnc;
};

export const capitalizeOneWord = function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
};

export const capitalize_Words = function (word) {
    if (word != null && word.length > 0) {
        return word.toString().replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    } else {
        return word;
    }
};
export const capitalize_Words_Dash = function (word) {
    if (word != null && word.length > 0) {
        return word.toString().replace(/\w+-*/g, function (txt) {
            return capitalize_String(txt);
        });
    } else {
        return word;
    }
};

export const remove_Words = (word, removeWord, withWord) => {
    return word.replace(removeWord, withWord);
};

export const remove_words_stop = (word) => {
    var isStop = word ? word.substring(0, 4) : '';
    if (isStop.toLowerCase() === 'stop') {
        return word.substring(5);
    }
    return word;
};

export const formatPhoneNumber = (input) => {
    var cleaned = ('' + input).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        number = [match[1], match[2], '-', match[3], '-', match[4]].join('');
        return number;
    }

    return input;
};

export function secondToReadable(seconds) {
    // eslint-disable-next-line radix
    const sec = parseInt(seconds);

    const hoursFloat = sec / (60 * 60);
    const hours = Math.floor(hoursFloat);
    const minutes = Math.round((hoursFloat - hours) * 60);
    return `${hours}hr ${minutes}min`;
}

export function secondToTime(seconds) {
    // eslint-disable-next-line radix
    const sec = parseInt(seconds);

    const hoursFloat = sec / (60 * 60);
    const hours = Math.floor(hoursFloat);
    const minutes = Math.round((hoursFloat - hours) * 60);
    const AP = hours > 12 ? 'AM' : 'PM';
    const tweleveHours = hours > 12 ? hours - 12 : hours;
    const minuteLeadinZero = minutes > 9 ? minutes : '0' + minutes.toString();
    const hoursWithLeadingZero =
        tweleveHours > 9 ? tweleveHours : '0' + tweleveHours.toString();

    return `${hoursWithLeadingZero}:${minuteLeadinZero} ${AP}`;
}

// capitalize_String will only make first letter upper for rest of the string it will be lower
export const capitalize_String = function (word) {
    if (word != null && word.length > 0) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    } else {
        return word;
    }
};

export function getRand(length = 10) {
    var result = '';
    var characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function isCardExpiry(exp) {
    const d = new Date();
    const currentYear = d.getFullYear();
    const currentMonth = d.getMonth() + 1;
    // get parts of the expiration date
    var parts = exp.split('/');
    var year = parseInt(parts[1], 10) + 2000;
    //var month = parseInt(parts[0], 10);
    var month = parseInt(parts[0]);
    let expiryError = null;
    if (year < currentYear || (year == currentYear && month < currentMonth)) {
        // Last index means to disble the radio button.
        expiryError = [
            'Payment Type has expired - Please visit your account on coachusa.com to update card information',
            true,
        ];
    } else {
        currentMonthNextYear = currentMonth;
        if (year > currentYear || year === currentYear) {
            let dateDiff = -1;
            if (year === currentYear + 1) {
                currentMonthNextYear = month + 12;
                dateDiff = currentMonthNextYear - currentMonth;
            } else if (year === currentYear) {
                dateDiff = month - currentMonthNextYear;
            }
            if (dateDiff < 3 && dateDiff !== -1) {
                expiryError = [
                    'Expiration date approaching - Please visit your account on coachusa.com to update card information',
                    false,
                ];
            } else {
                expiryError = null;
            }
        }
    }

    return expiryError;
}

/**
 * Method for formatting time.
 * @param timestamp : Takes timestamp as an input
 */
export function returnTime(timestamp) {
    try {
        var created_at = new Date(timestamp);
        var now = new Date(new Date().toISOString());

        const dayDifference = Math.abs(now.getDate() - created_at.getDate());
        const yearDifference = getYear(now) - getYear(created_at);
        if (yearDifference < 1) {
            if (dayDifference == 0) {
                return 'today';
            } else if (dayDifference == 1) {
                return 'yesterday';
            } else if (dayDifference > 1 && dayDifference < 7) {
                return dayDifference + ' a day ago';
            } else {
                return format(created_at, 'MMM dd');
            }
        } else {
            return created_at.toISOString().split('T')[0];
        }
    } catch (error) {
        //console.log('returnTime NOtificationList', error);

        return '';
    }
}

export function returnTimeMoment(timestamp) {
    try {
        const utcDate = utcToZonedTime(timestamp, 'UTC');
        const currentDate = zonedTimeToUtc(getTime(new Date()), 'UTC');
        let dayDifference = differenceInDays(currentDate, utcDate);
        if (dayDifference == 0) {
            return 'today';
        } else if (dayDifference == 1) {
            return 'yesterday';
        } else if (dayDifference > 1 && dayDifference < 7) {
            return dayDifference + 'a day ago';
        } else {
            if (getYear(utcDate) == getYear(currentDate)) {
                return format(utcDate, 'MMM dd');
            } else {
                return format(utcDate, 'yyyy MM dd');
            }
        }
    } catch (error) {
        //console.log('returnTime NOtificationList', error);

        return '';
    }
}

/**
 * Method for formatting valid_to.
 * @param valid_to : Takes valid_to as an input and return valid_to in formate
 */
export const validToTicketExpires = function (valid_to) {
    const momentDate = moment(valid_to, 'YYYY-MM-DD');
    let month = momentDate.format('M');
    let year = momentDate.format('Y');
    let dt = momentDate.format('D');

    const date = new Date(momentDate);

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    var currentDate = new Date();
    const formatedDate = month + '/' + dt + '/' + year;

    if (currentDate - date < 0) {
        return 'Valid through ' + formatedDate;
    } else {
        return 'Valid through ' + formatedDate;
    }
};

export const validateAndFormatDate = (date, date_format) => {
    if (isValid(new Date(date))) {
        return date;
    } else {
        return '';
    }
};
export const formateTicketExpires = function (valid_to) {
    const momentDate = moment(valid_to, 'YYYY-MM-DD');
    let month = momentDate.format('M');
    let year = momentDate.format('Y');
    let dt = momentDate.format('D');
    const date = new Date(momentDate);
    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    const formatedDate = month + '/' + dt + '/' + year;

    return formatedDate;
};

export const getMonthName = (monthValue, shortName) => {
    const date = new Date();
    let month = date.getMonth();

    if (month === 11 && monthValue !== 0) {
        month = 0;
    } else {
        month = month + monthValue;
    }
    return shortName ? shortMonthName[month] : fullMonthName[month];
};

export const getMonthNameByDate = (dateValue, shortName) => {
    const momentDate = moment(dateValue, 'YYYY-MM-DD');
    const month = momentDate.format('M');
    const monthValue = month > 0 ? month - 1 : 0;
    return shortName ? shortMonthName[monthValue] : fullMonthName[monthValue];
};

export const getValidFromToInMonthByDate = (dateValue) => {
    const momentDate = moment(dateValue, 'YYYY-MM-DD');
    const month = momentDate.format('M');
    let year = momentDate.format('Y');

    const monthValue = month > 0 ? month : 0;
    const days = new Date(year, monthValue, 0).getDate();
    const monthFormate = monthValue > 9 ? monthValue : '0' + month;

    return `${monthFormate}/01/${year} - ${monthFormate}/${days}/${year}`;
};

export const getDaysInMonth = (monthValue) => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getYear();
    if (month === 12 && monthValue !== 0) {
        month = 1;
        year = year + 1;
    } else {
        month = month + monthValue;
    }
    return new Date(year, month, 0).getDate();
};

export function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



export function isSVG(resource = '') {
    return resource.toString().indexOf('SvgComponent') !== -1;
}

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
