import { useQuery } from "@apollo/client"
import { MOVIE_DETAIL_BY_ID } from "../../queryfetch/Movie"
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, FlatList } from "react-native"
import { useFonts } from "expo-font"
import Icon from "react-native-vector-icons/FontAwesome"
import tw from "twrnc"

export default function Detail({ route }) {
    const [loaded] = useFonts({
        dmsans: require("../../assets/fonts/DMSans-Regular.ttf"),
    })
    let ID = route.params.id
    const { loading, error, data } = useQuery(MOVIE_DETAIL_BY_ID, {
        variables: { getMovieDetailId: ID },
    })
    if (loading) return <View style={tw`flex-1 justify-center items-center`}><Text>Waiting...</Text></View>
    let dataDetail = data.getMovieDetail

    return (
        <>
            <SafeAreaView style={[styles.container, tw`bg-neutral-900`]}>
                <ScrollView style={styles.scrollView}>
                    <View style={tw`flex flex-row p-3`}>
                        <Image style={[styles.img, tw`rounded-lg`]} source={{ uri: dataDetail.imgURL }} />
                        <View style={tw`flex flex-col mb-25`}>
                            <View style={[styles.list]}>
                                <Icon style={[styles.font, tw`absolute mt-3`]} name="video-camera" size={20} color="white" />
                                <Text style={[styles.font, tw`absolute mt-9 `]} >Genre</Text>
                                <Text style={[styles.font, tw`absolute mt-15 font-bold`]} >{dataDetail.Genre.name}</Text>
                            </View>
                            <View style={styles.list}>
                                <Icon style={[styles.font, tw`absolute mt-3`]} name="star" size={20} color="white" />
                                <Text style={[styles.font, tw`absolute mt-9`]} >Rating</Text>
                                <Text style={[styles.font, tw`absolute mt-15 font-bold`]} >{dataDetail.rating}/10</Text>
                            </View>
                        </View>
                    </View>
                    <View >
                        <Text style={[styles.text, tw`text-left ml-4 font-bold`]}>
                            {dataDetail.title}
                        </Text>
                        <Text style={[styles.author, tw`text-left ml-4 font-sm`]}>
                            Author : {dataDetail.Author.username}
                        </Text>
                    </View>
                    <Text style={tw`text-center text-white font-bold`}>
                        _____________________________________________________
                    </Text>
                    <View >
                        <Text style={[styles.text2, tw`m-4 font-bold`]}>
                            sysnopsis
                        </Text>
                        <Text style={tw`ml-4 text-xl text-white`}>
                            {dataDetail.synopsis}
                        </Text>
                    </View>
                    <Text style={[styles.text, tw`text-center mt-6`]}>CASTS</Text>
                    <FlatList horizontal={true} data={dataDetail.Casts}
                        renderItem={({ item }) => {

                            return <View style={[tw`flex-1 flex-col p-[12px] mb-5`]}>
                                <View style={tw`mt-[10px]`}>
                                    <View style={tw`bg-neutral-100 rounded-lg border border-gray-400 shadow-md`}>
                                        <View style={styles.padding}>
                                            <Image style={[tw`rounded-t-lg`, styles.image]} source={{ uri: item.profilePict }} />
                                            <Text style={tw`text-2xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-center`}>{item.name}</Text>
                                        </View >
                                    </View>
                                </View>
                            </View>
                        }}
                    />
                </ScrollView>
            </SafeAreaView>

        </>
    )
}

const styles = StyleSheet.create({
    img: {
        width: "60%",
        height: "100%",
        marginRight: 20
    },
    container: {
        flex: 1,

    },
    scrollView: {
        marginHorizontal: 5,
    },
    text: {
        fontSize: 30,
        fontFamily: "dmsans",
        color: "white",
    },
    text2: {
        fontSize: 20,
        fontFamily: "dmsans",
        color: "white",
    },
    author: {
        fontSize: 15,
        fontFamily: "dmsans",
        color: "white",
    },
    list: {
        backgroundColor: "black",
        margin: 10,
        padding: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "thistle",
        alignItems: "center",
    },
    genre: {
        color: "red",
    },
    font: {
        fontFamily: "dmsans",
        color: "white",
    },

    image: {
        width: 300,
        height: 400,
        marginTop: 17,
    },
    padding: {
        padding: 17,
    },
})