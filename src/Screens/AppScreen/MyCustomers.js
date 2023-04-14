import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../Constants/Api';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyCustomers = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isTotalPages, setTotalPages] = useState('');

    const getData = async () => {
        try {
            setLoading(true)
            const userLognDetails = await AsyncStorage.getItem("userData");
            if (!userLognDetails) {
                // Alert.alert("Unable to fetch mobile number, Login again");
                return;
            }
            setLoading(false)
            const transformedLoginData = JSON.parse(userLognDetails);
            console.log('transformedLoginData Navigation--->', transformedLoginData);
            setLoading(true);
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

            const response = await fetch(baseUrl + "user/customerListing", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json MyCustomers --->', json.result);
            if (json.status === 'success') {
                setTotalPages(json.number_of_pages)
                setOffset(offset + 1);
                //Increasing the offset for the next API call
                setDataSource([...dataSource, ...json.result]);
                setLoading(false);
            } else {
                console.log(json.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const CustomersScreenData = () => {
        return dataSource.map((CustomersInfoData, i) => {
            return (
                <View style={styles.cardSection} key={CustomersInfoData.fldi_cust_id}>
                    <View style={{
                        padding: 10,
                        flex: 1
                    }}>
                        {/* <Text style={styles.cardUserName}>{CustomersInfoData.fldv_name ? CustomersInfoData.fldv_name : '-'}</Text> */}

                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>

                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Customer No</Text>
                                <Text style={styles.cardText}>{CustomersInfoData.fldv_mobile ? CustomersInfoData.fldv_mobile.replace(/^(\d{2})(\d+)$/, (_, firstTwoDigits, remainingDigits) => firstTwoDigits + "*".repeat(remainingDigits.length)) : '-'}</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Status</Text>
                                <Text style={styles.cardText}>{CustomersInfoData.flg_status == 1 ? 'Registered' : 'Not-Registered'}</Text>
                            </View>

                        </View>

                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Date</Text>
                                {/* <Text style={styles.cardText}>{CustomersInfoData.flddt_date_added ? CustomersInfoData.flddt_date_added : '-'}</Text> */}
                                <Text style={styles.cardText}>{CustomersInfoData.flddt_date_added ? moment(CustomersInfoData.flddt_date_added).format('Do MMMM YYYY') : '-'}</Text>
                                {/* {moment(CustomersInfoData.flddt_date_added).format('Do MMMM YYYY')} */}
                            </View>
                            <View style={{ width: '50%' }}>
                                {/* <Text style={styles.cardTitle}>Name</Text>
                                <Text style={styles.cardText}>{CustomersInfoData.fldv_name ? CustomersInfoData.fldv_name : '-'}</Text> */}
                            </View>
                        </View>

                    </View>

                    <View style={[styles.cardPointBox, { backgroundColor: CustomersInfoData.fldf_points > 4 || CustomersInfoData.fldf_points === null ? COLORS.brand.success : COLORS.brand.error, }]}>
                        <Text style={[styles.cardUserPoints, { fontSize: CustomersInfoData.fldf_points && CustomersInfoData.fldf_points >= 1 ? SIZES.mediumLarge : SIZES.font, }]}>{CustomersInfoData.fldf_points && CustomersInfoData.fldf_points >= 1 ? CustomersInfoData.fldf_points : 'N/A'}</Text>
                        <Text style={styles.cardPointText}>pts</Text>
                    </View>
                </View>
            )
        })
    }


    const renderFooter = () => {
        return (
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <Header
                    onPress={() => navigation.openDrawer()}
                />
                <View style={{
                    width: windowWidth - 30,
                    alignSelf: 'center',
                    marginBottom: 14,
                    marginTop: 10,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                }}>
                    {/* <Text style={styles.pageTitle}>My Customers</Text> */}
                    {loading ? (
                        <ActivityIndicator
                            size="small" color={COLORS.brand.primary}
                            style={{ marginLeft: 8, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flex: 1 }} />
                    ) : null}
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {CustomersScreenData()}
                    {renderFooter()}
                </ScrollView>
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
        textAlign: 'left',
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
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
        height: 100,
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


// import React, { useState, useEffect } from 'react';
// import { FlatList, View, Text, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { baseUrl } from '../../Constants/Api';
// const ITEM_COUNT_PER_PAGE = 20;

// const MyCustomers = () => {
//     const [data, setData] = useState([]);
//     const [page, setPage] = useState(1);
//     const [hasMoreData, setHasMoreData] = useState(true);

//     const fetchData = async () => {
//         const userLognDetails = await AsyncStorage.getItem("userData");
//         if (!userLognDetails) {
//             // Alert.alert("Unable to fetch mobile number, Login again");
//             return;
//         }
//         // setLoading(false)
//         const transformedLoginData = JSON.parse(userLognDetails);
//         console.log('transformedLoginData Navigation--->', transformedLoginData);
//         // setLoading(true);
//         var myHeaders = new Headers();
//         myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");
//         myHeaders.append("Cookie", "off_cc=f3eccae0981f4a2ca6cd3a7535a52b510b4d4149");

//         var formdata = new FormData();
//         formdata.append("waiter_id", transformedLoginData.waiter_id);
//         formdata.append("store_id", transformedLoginData.store_id);
//         formdata.append("page_no", page);

//         var requestOptions = {
//             method: 'POST',
//             headers: myHeaders,
//             body: formdata,
//             redirect: 'follow'
//         };

//         const response = await fetch(baseUrl + "user/customerListing", requestOptions);
//         // const json = await response.json();
//         // const response = await fetch(`https://example.com/api/data?page=${page}`);
//         const newData = await response.json();
//         console.log('newData--->', newData.result);

//         if (newData.length === 0) {
//             setHasMoreData(false);
//         } else {
//             setData([...data, ...newData.result]);
//             setPage(page + 1);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const FundItem = ({ title }) => (
//         <View>
//             <Text>{title}</Text>
//         </View>
//     );

//     const renderFundItem = ({ item }) => (
//         <FundItem title={item.fldi_cust_id} />
//     );


//     // const renderItem = ({ item }) => {
//     //     return (
//     //         <View>
//     //             <Text>{item.fldv_name}</Text>
//     //             {/* <Text>{item.description}</Text> */}
//     //         </View>
//     //     );
//     // };

//     // const Item = ({ title }) => (
//     //     <View style={styles.item}>
//     //         <Text style={styles.title}>{title}</Text>
//     //     </View>
//     // );

//     return (
//         <FlatList
//             data={data}
//             // keyExtractor={item => item.id}
//             // renderItem={renderItem}
//             renderItem={renderFundItem}
//             keyExtractor={item => item.id}
//             onEndReached={() => {
//                 if (hasMoreData) {
//                     fetchData();
//                 }
//             }}
//             onEndReachedThreshold={0.5}
//         />
//         // <Text>Cool</Text>
//     );
// };

// export default MyCustomers;

// const styles = StyleSheet.create({
//     // container: {
//     //     flex: 1,
//     //     marginTop: StatusBar.currentHeight || 0,
//     // },
//     // item: {
//     //     backgroundColor: '#f9c2ff',
//     //     padding: 20,
//     //     marginVertical: 8,
//     //     marginHorizontal: 16,
//     // },
//     // title: {
//     //     fontSize: 32,
//     // },
// });

