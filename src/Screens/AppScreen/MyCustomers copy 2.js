import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyCustomers = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isTotalPages, setTotalPages] = useState('');

    useEffect(() =>
        getData(),
        []);

    // const isFocused = useIsFocused()

    // useEffect(() => {
    //     const GetUserAsyncLoginData = async () => {
    //         setLoading(true)
    //         const userLognDetails = await AsyncStorage.getItem("userData");
    //         if (!userLognDetails) {
    //             // Alert.alert("Unable to fetch mobile number, Login again");
    //             return;
    //         }
    //         setLoading(false)
    //         const transformedLoginData = JSON.parse(userLognDetails);
    //         // console.log('transformedLoginData Navigation--->', transformedLoginData);
    //         setWaiter_id(transformedLoginData.waiter_id)
    //         setStore_id(transformedLoginData.store_id)
    //     }
    //     GetUserAsyncLoginData()
    // }, [isFocused])

    const getData = async () => {
        try {
            console.log('getData');
            setLoading(true);
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            const transformedLoginData = JSON.parse(userLognDetails);
            console.log('transformedLoginData Navigation--->', transformedLoginData);

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
            myHeaders.append("Cookie", "off_cc=f3eccae0981f4a2ca6cd3a7535a52b510b4d4149");

            var formdata = new FormData();
            formdata.append("waiter_id", transformedLoginData.waiter_id);
            formdata.append("store_id", transformedLoginData.store_id);
            formdata.append("page_no", offset);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            fetch("https://demo.crayoninfotech.com/cocacola/api/user/customerListing", requestOptions)
                .then((response) => response.json())
                // .then(response => response.text())
                // .then(result => console.log(result))
                .then((responseJson) => {
                    console.log('responseJson--->', responseJson.result);
                    //Successful response
                    setTotalPages(responseJson.number_of_pages)
                    setOffset(offset + 1);
                    //Increasing the offset for the next API call
                    setDataSource([...dataSource, ...responseJson.result]);
                    setLoading(false);
                })
                .catch(error => console.log('error', error));
        } catch (error) {
            console.log(error.message);
        }

    };

    const renderFooter = () => {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>
                {offset <= isTotalPages ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={getData}
                        style={styles.loadMoreBtn}>
                        <Text style={[styles.btnText, { color: COLORS.brand.white }]}>Load More</Text>
                        {loading ? (
                            <ActivityIndicator
                                color="white"
                                style={{ marginLeft: 8 }} />
                        ) : null}
                    </TouchableOpacity>
                ) :
                    null}
            </View>
        );
    };

    const PersonDataList = ({ name, point, status, customerNo }) => (
        <View style={styles.cardSection}>
            <View style={{
                padding: 10,
                flex: 1
            }}>
                <Text style={styles.cardUserName}>{name ? name : '-'}</Text>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.cardTitle}>Customer No</Text>
                        <Text style={styles.cardText}>{customerNo}</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.cardTitle}>Status</Text>
                        <Text style={styles.cardText}>{status == 1 ? 'Registered' : 'Not-Registered'}</Text>
                    </View>
                </View>

            </View>

            <View style={[styles.cardPointBox, { backgroundColor: point > 4 || point === null ? COLORS.brand.success : COLORS.brand.error, }]}>
                <Text style={[styles.cardUserPoints, { fontSize: point && point >= 1 ? SIZES.mediumLarge : SIZES.font, }]}>{point && point >= 1 ? point : 'N/A'}</Text>
                <Text style={styles.cardPointText}>pts</Text>
            </View>
        </View>
    );

    const renderItemPerson = ({ item }) => (
        <PersonDataList name={item.fldv_name} point={item.fldf_points} customerNo={item.fldi_cust_id} status={item.flg_status} />
    );


    // if (loading) {
    //     return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Header
                    onPress={() => navigation.openDrawer()}
                />
                <Text style={styles.pageTitle}>My Customers</Text>
                <FlatList
                    horizontal={false}
                    scrollEnabled={true}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={dataSource}
                    renderItem={renderItemPerson}
                    keyExtractor={item => item.id}
                    ListFooterComponent={renderFooter}
                />
            </View>
        </SafeAreaView>
    );
};

export default MyCustomers;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        marginBottom: 14,
        textAlign: 'left',
        width: windowWidth - 30,
        alignSelf: 'center',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
        marginTop: 20
    },
    dateDetailsText: {
        fontFamily: FONT.InterRegular,
        color: COLORS.brand.textColor,
        fontSize: SIZES.small,
    },
    inputSection: {
        marginTop: 10,
        width: windowWidth - 30,
        alignSelf: 'center',
        flex: 1
    },
    cardSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 96,
        marginBottom: 10,
        ...SHADOWS.light,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        width: windowWidth - 30,
        alignSelf: 'center',
        margin: 6
    },
    cardUserName: {
        fontSize: SIZES.medium,
        fontWeight: 800,
        fontFamily: FONT.InterBold,
        marginBottom: 10,
        color: COLORS.brand.textColor
    },
    cardTitle: {
        fontSize: SIZES.base,
        color: COLORS.brand.labelText,
        fontWeight: '400',
        fontFamily: FONT.InterRegular,
        marginBottom: 2,
    },
    cardText: {
        fontSize: SIZES.small,
        color: COLORS.brand.textColor,
        fontWeight: 700,
        fontFamily: FONT.InterMedium,
    },
    cardPointText: {
        textAlign: 'center',
        fontSize: SIZES.base,
        fontWeight: 300,
        fontFamily: FONT.InterRegular,
        color: COLORS.brand.white
    },
    cardUserPoints: {
        textAlign: 'center',
        fontWeight: 600,
        fontFamily: FONT.InterBold,
        color: COLORS.brand.white,
    },
    cardPointBox: {
        width: 40,
        // backgroundColor: COLORS.brand.success,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    btnView: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#E0E0E0',
        backgroundColor: COLORS.brand.white,
        ...SHADOWS.light
    },
    btnText: {
        fontFamily: FONT.InterRegular,
        color: COLORS.brand.textColor,
        fontSize: SIZES.small,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

})
