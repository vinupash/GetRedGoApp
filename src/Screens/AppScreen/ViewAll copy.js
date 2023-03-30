import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import Header from '../../Components/Header'
import { COLORS, FONT, SHADOWS, SIZES } from '../../Constants'
import assets from '../../Constants/assets';
import { useIsFocused } from '@react-navigation/native';
import { baseUrl } from '../../Constants/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'react-native-image-picker';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ViewAll = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const [isLoading, setLoading] = useState(false);
    const [isPageTitle, setPageTitle] = useState('')
    const [isScreenName, setScreenName] = useState('')
    const [isImageType, setImageType] = useState('');
    const [isGetImageType, setGetImageType] = useState('');
    const [isTableImagePath, setTableImagePath] = useState('');
    const [isTableImageType, setTableImageType] = useState('');
    const [isAllTablesData, setAllTablesData] = useState({});

    const { pageDetails } = route.params;
    useEffect(() => {
        setPageTitle(pageDetails.pageTitle)
        setScreenName(pageDetails.screenName)
        setGetImageType(pageDetails.imageType)
    }, [isFocused])

    const [isWaiter_id, setWaiter_id] = useState('');
    const [isStore_id, setStore_id] = useState('');

    console.log(isGetImageType, isScreenName, isPageTitle, isWaiter_id, isStore_id);

    useEffect(() => {
        const UserData = async () => {
            try {
                setLoading(true)
                const userLognDetails = await AsyncStorage.getItem("userData");
                if (!userLognDetails) {
                    // Alert.alert("Unable to fetch mobile number, Login again");
                    return;
                }

                const transformedLoginData = JSON.parse(userLognDetails);
                console.log('transformedLoginData UploadPictures--->', transformedLoginData);
                setWaiter_id(transformedLoginData.waiter_id);
                setStore_id(transformedLoginData.store_id);

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

                var formdata = new FormData();
                formdata.append("store_id", transformedLoginData.store_id);
                formdata.append("imagetype", isGetImageType);
                formdata.append("page_no", "1");

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
                };

                const response = await fetch(baseUrl + "image/imageListing", requestOptions);
                const json = await response.json();
                setLoading(false);
                console.log('json ViewAll--->', json);
                if (json.status === 'success') {
                    setAllTablesData(json.result)
                } else {
                    alert(json.message)
                }

            } catch (error) {
                console.log(error.message);
            }
        }

        UserData()
    }, [isGetImageType])


    const ImageUpload = async () => {
        try {
            setLoading(true);

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46Q0ByXjBuQCQxMiE=");

            var formdata = new FormData();
            formdata.append("waiter_id", isWaiter_id);
            formdata.append("store_id", isStore_id);
            formdata.append("imagetype", isImageType);
            formdata.append("upload_img", isTableImageType, isTableImagePath);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrl + "image/uploadImage", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json HotelDetails TableImage--->', json);

            if (json.status === true) {
                alert(json.message);
            } else {
                alert(json.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const tableImage = async () => {
        try {
            const options = {
                storageOptions: {
                    path: 'image'
                },
                mediaType: 'photo',
                includeBase64: false,
                quality: 1,
            }
            ImagePicker.launchCamera(options, response => {
                // console.log('response--->', response);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else {
                    if (!response.uri) {
                        const resitem = response && response.assets[0]
                        const img = {
                            uri: resitem.uri,
                            name: resitem.fileName,
                            type: resitem.type
                        }
                        // setfiledata(img)
                        // setImage(response.assets[0].uri)
                        console.log('img--->', img);
                        console.log('setImage--->', response.assets[0].uri);
                        setTableImagePath(response.assets[0].uri)
                        setTableImageType(img)
                        setImageType('table')
                        ImageUpload()
                    }
                }
            })
        } catch (error) {
            console.warn(error);
        }
    }


    const AllTableData = () => {
        return isAllTablesData.map(allTableInfoData => {
            return (
                <View style={styles.productBox} key={allTableInfoData.fldi_id}>
                    {/* <Image source={{ uri: allTableInfoData.fldv_image }} style={styles.ProductImage} />
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded by</Text>
                            <Text style={styles.cardText}>Suresh Yadav</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Uploaded on</Text>
                            <Text style={styles.cardText}>11th Jan 2023</Text>
                        </View>
                    </View>
                    <View style={styles.productDetails}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Status</Text>
                            <Text style={styles.cardText}>{allTableInfoData.flg_status == 0 ? 'Approved' : 'Not-Approved'}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.cardTitle}>Pts</Text>
                            <Text style={styles.cardText}>5</Text>
                        </View>
                    </View> */}
                </View>
            )
        })
    }

    if (isLoading) {
        return <ActivityIndicator size="small" color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={COLORS.brand.white}
            />
            <Header
                onPress={() => navigation.openDrawer()}
            />
            <View style={styles.btnTextGroup}>
                <Text style={styles.pageTitle}>{isPageTitle}</Text>
                {isScreenName === 'Table' ?
                    <TouchableOpacity
                        onPress={tableImage}
                        style={[styles.btnView]}
                    >
                        <Text style={styles.btnText}>Upload New</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >

                {isScreenName === 'Table' ?
                    <View>
                        {isAllTablesData.map((user) => (
                            <Text>{user.fldi_id}</Text>
                        ))}
                        {/* <Text>Cool</Text> */}
                    </View>
                    :
                    null
                }


                {isScreenName === 'Bar' ?
                    <View style={styles.productBox}>
                        <Image source={assets.ProductImage} style={styles.ProductImage} />
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded by</Text>
                                <Text style={styles.cardText}>Suresh Yadav</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded on</Text>
                                <Text style={styles.cardText}>11th Jan 2023</Text>
                            </View>
                        </View>
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Status</Text>
                                <Text style={styles.cardText}>Approved</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Pts</Text>
                                <Text style={styles.cardText}>5</Text>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

                {isScreenName === 'Outside' ?
                    <View style={styles.productBox}>
                        <Image source={assets.ProductImage} style={styles.ProductImage} />
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded by</Text>
                                <Text style={styles.cardText}>Suresh Yadav</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Uploaded on</Text>
                                <Text style={styles.cardText}>11th Jan 2023</Text>
                            </View>
                        </View>
                        <View style={styles.productDetails}>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Status</Text>
                                <Text style={styles.cardText}>Approved</Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Text style={styles.cardTitle}>Pts</Text>
                                <Text style={styles.cardText}>5</Text>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

                {isScreenName === 'Menu' ?

                    <>
                        <ImageBackground style={styles.cardSection} source={assets.cardBgRed} resizeMode="cover">
                            <View style={{
                                padding: 10,
                                flex: 1
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ width: '100%', padding: 10 }}>
                                        <Text style={[styles.cardText, { fontSize: SIZES.medium }]}>Coke</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={[styles.cardPointBox]}>
                                <SvgXml xml={CokeIconWhite} width={43} height={46} />
                            </View>
                        </ImageBackground>

                        <ImageBackground style={styles.cardSection} source={assets.cardBgBlack} resizeMode="cover">
                            <View style={{
                                padding: 10,
                                flex: 1
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <View style={{ width: '100%', padding: 10 }}>
                                        <Text style={[styles.cardText, { fontSize: SIZES.medium }]}>Coke Zero</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={[styles.cardPointBox]}>
                                <SvgXml xml={CokeIconRed} width={43} height={46} />
                            </View>
                        </ImageBackground>
                    </>
                    :
                    null
                }

            </ScrollView>

        </SafeAreaView>
    )
}

export default ViewAll

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    pageTitle: {
        textAlign: 'left',
        fontSize: SIZES.mediumLarge,
        fontFamily: FONT.InterBold,
        fontWeight: 700,
        color: COLORS.brand.textColor,
    },
    btnTextGroup: {
        marginTop: 20,
        width: windowWidth - 30,
        marginBottom: 14,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnView: {
        borderWidth: 1,
        borderColor: COLORS.brand.primary,
        backgroundColor: COLORS.brand.background,
        ...SHADOWS.light,
        marginTop: 6,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: 126,
        height: 40,
    },
    btnText: {
        fontFamily: FONT.InterBold,
        color: COLORS.brand.primary,
        fontSize: SIZES.medium,
        fontWeight: 800
    },
    productBox: {
        width: windowWidth - 30,
        alignSelf: 'center',
        marginVertical: 10
    },
    ProductImage: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: windowWidth - 30,
        height: 200
    },
    productDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
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
})