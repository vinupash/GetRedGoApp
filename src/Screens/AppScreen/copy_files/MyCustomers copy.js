import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyCustomers = ({ navigation }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(CustomersDetail.length);
    }, [CustomersDetail]);


    const CustomersDetail = [
        {
            id: '1',
            name: 'Johon  Doe',
            point: 5,
            status: 'Registered',
            customerNo: 4
        },
        {
            id: '2',
            name: 'Johon  Doe',
            point: 5,
            status: 'Registered',
            customerNo: 4
        },
        {
            id: '3',
            name: 'Johon  Doe',
            point: 5,
            status: 'Registered',
            customerNo: 4
        },
        {
            id: '4',
            name: 'Johon  Doe',
            point: 3,
            status: 'Registered',
            customerNo: 4
        },
        {
            id: '5',
            name: 'Johon',
            point: '',
            status: 'Registered',
            customerNo: 4
        },
        {
            id: '6',
            name: 'Johon',
            point: '',
            status: 'Registered',
            customerNo: 4
        },
        {
            id: '7',
            name: 'Johon',
            point: '',
            status: 'Registered',
            customerNo: 4
        },
    ];

    // const PersonData = () => {
    //     return CustomersDetail.map((CustomersDetail, i) => {
    //         return (
    //             <View key={CustomersDetail.key}>
    //                 <View style={styles.cardSection}>
    //                     <View style={{
    //                         padding: 10,
    //                         flex: 1
    //                     }}>
    //                         <Text style={styles.cardUserName}>{CustomersDetail.name}</Text>

    //                         <View style={{
    //                             flexDirection: 'row'
    //                         }}>
    //                             <View style={{ width: '50%' }}>
    //                                 <Text style={styles.cardTitle}>Customer No</Text>
    //                                 <Text style={styles.cardText}>{CustomersDetail.customerNo}</Text>
    //                             </View>
    //                             <View style={{ width: '50%' }}>
    //                                 <Text style={styles.cardTitle}>Status</Text>
    //                                 <Text style={styles.cardText}>{CustomersDetail.status}</Text>
    //                             </View>
    //                         </View>

    //                     </View>

    //                     <View style={[styles.cardPointBox, { backgroundColor: CustomersDetail.point > 4 || CustomersDetail.point === null ? COLORS.brand.success : COLORS.brand.error, }]}>
    //                         <Text style={[styles.cardUserPoints, { fontSize: !CustomersDetail.point ? SIZES.font : SIZES.mediumLarge, }]}>{!CustomersDetail.point ? 'N/A' : CustomersDetail.point}</Text>
    //                         <Text style={styles.cardPointText}>pts</Text>
    //                     </View>
    //                 </View>
    //             </View>
    //         )
    //     })
    // }
    console.log(count);

    if (count > 3) {
        console.log('cool');
    } else {

    }

    const PersonDataList = ({ name, point, status, customerNo }) => (
        <View style={styles.cardSection}>
            <View style={{
                padding: 10,
                flex: 1
            }}>
                <Text style={styles.cardUserName}>{name}</Text>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.cardTitle}>Customer No</Text>
                        <Text style={styles.cardText}>{customerNo}</Text>
                    </View>
                    <View style={{ width: '50%' }}>
                        <Text style={styles.cardTitle}>Status</Text>
                        <Text style={styles.cardText}>{status}</Text>
                    </View>
                </View>

            </View>

            <View style={[styles.cardPointBox, { backgroundColor: point > 4 || point === null ? COLORS.brand.success : COLORS.brand.error, }]}>
                <Text style={[styles.cardUserPoints, { fontSize: !point ? SIZES.font : SIZES.mediumLarge, }]}>{!point ? 'N/A' : point}</Text>
                <Text style={styles.cardPointText}>pts</Text>
            </View>
        </View>
    );

    const renderItemPerson = ({ item }) => (
        <PersonDataList name={item.name} point={item.point} customerNo={item.customerNo} status={item.status} />
    );

    // const loadMoreData = () => {

    // };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <Text style={styles.pageTitle}>My Customers</Text>
            {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: windowWidth - 30, alignSelf: 'center', paddingBottom: 5 }}>
                <TouchableOpacity
                       onPress={onPress} 
                    style={[styles.btnView, { marginRight: 5 }]}
                >
                    <Text style={styles.btnText}>Status: All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                       onPress={onPress} 
                    style={styles.btnView}
                >
                    <Text style={styles.btnText}>Date: All</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.inputSection}>
                <Text style={styles.dateDetailsText}>24th Feb 23</Text>
                <FlatList
                    horizontal={false}
                    scrollEnabled={true}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={CustomersDetail}
                    renderItem={renderItemPerson}
                    keyExtractor={item => item.id}
                // ListHeaderComponent={<Text>{`Count: ${count}`}</Text>}
                // onEndReached={loadMoreData}
                // onEndReachedThreshold={0.5}
                // ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
                />
            </View>

        </SafeAreaView>
    )
}

export default MyCustomers

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
    }
})