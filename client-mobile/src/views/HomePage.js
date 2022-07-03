import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import tw from 'twrnc'


export default function HomePage({ navigation }) {
    const [loaded] = useFonts({
        brush: require("../../assets/fonts/CaveatBrush-Regular.ttf"),
    })

    if (!loaded) {
        return null
    }
    return (
        <>
            <ImageBackground style={styles.Logo} source={{
                uri: 'https://www.teahub.io/photos/full/214-2149904_1080x1920-purple-blue-gradient-samsung-android-wallpaper-gradient.jpg'
            }}
            >

                <View style={tw`flex-1 p-[20px] flex-col`}>
                    <View style={[tw`flex-1 justify-center items-center rounded-lg`]}>
                        <Image style={styles.img} source={{ uri: "https://freepngimg.com/download/doctor_strange/94331-and-sanctorum-sanctum-doctor-strange-black-white.png" }} />
                        <Text style={[styles.Title, tw`text-white mb-[300px] text-2xl`]}>WANT A WATCH MOVIES???</Text>

                        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")} title="Press me">
                            <Text style={[tw`rounded-full bg-blue-600 text-lg`, styles.button]}>ANARA SUMANARA</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    Logo: {
        width: "100%",
        height: "100%"
    },
    Title: {
        fontFamily: 'brush',
    },
    img: {
        width: 110,
        height: 110,
        marginBottom: 30,
        marginTop: 140,
        color: "white",
        filter: "brightness(5.5)"
    },
    button: {
        color: "white",
        paddingLeft: 90,
        paddingRight: 90,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: 'brush'
    }
});