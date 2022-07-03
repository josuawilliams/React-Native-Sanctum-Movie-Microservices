import { View, ImageBackground, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from "react-native"
import tw from "twrnc"
import Cards from "../component/cards"
import { useEffect, useState } from "react"
import { GET_MOVIES } from "../../queryfetch/Movie"
import { SafeAreaView } from "react-native-safe-area-context"
import { useQuery } from "@apollo/client"
const window = Dimensions.get("window").width

export default function DashBoard() {
    const { loading, error, data } = useQuery(GET_MOVIES)
    const [dataFilter, setDataFilter] = useState([])
    const [dataGenre, setDataGenre] = useState([])
    useEffect(() => {
        if (data) {
            setDataFilter(data.getMovies)
            setDataGenre(data.getGenre)
        }
    }, [loading])
    if (loading) {
        return <View style={tw`flex-1 justify-center items-center`}>
            <Text>Waiting....</Text>
        </View>
    }
    if (error) {
        return <View style={tw`flex-1 justify-center items-center`}>
            <Text>ERROR FETCH </Text>
        </View>
    }
    let moviesData = dataFilter
    let Genre = dataGenre
    const filtered = (id) => {
        setDataFilter(data.getMovies.filter(el => el.Genre.id === id))
        if(id === "ALL"){
            setDataFilter(data.getMovies)
        }
    }
    return (
        <>
            <SafeAreaView style={styles.saveArea}>
                <ImageBackground style={tw`flex-1`} source={{ uri: 'https://www.teahub.io/photos/full/214-2149904_1080x1920-purple-blue-gradient-samsung-android-wallpaper-gradient.jpg' }}>
                    <View style={[tw`flex-col p-[12px] mb-10`, styles.width]}>
                        <FlatList
                            horizontal={true}
                            data={Genre}
                            renderItem={({ item }) => {
                                return <View style={tw`bg-white text-center justify-center items-center w-20 text-black`}>
                                    <TouchableOpacity onPress={() => filtered(item.id)} ><Text style={[tw`text-sm text-black z-10`]}>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            }}
                            keyExtractor={item => item.id}
                        />
                        <View style={tw`bg-white text-center justify-center items-center w-[100%] text-black`}>
                            <TouchableOpacity onPress={() => filtered("ALL")} ><Text style={[tw`text-sm text-black z-10`]}>All</Text>
                            </TouchableOpacity>
                        </View>
                        < Cards movie={moviesData} />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    saveArea: {
        flex: 1
    },
    width: {
        width: 100 / 100 * window,
        position: "relative",
    },
})

