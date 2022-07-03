import { View, StyleSheet, Image, Text, TouchableOpacity, FlatList, Linking } from "react-native"
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc"
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Cards({ movie }) {
    const navigation = useNavigation();
    return (
        <>

            <FlatList data={movie}
                renderItem={({ item }) => {
                    return <View style={tw`mt-[10px]`}>
                        <View style={tw`bg-neutral-100 rounded-lg border border-gray-400 shadow-md`}>
                            <TouchableOpacity onPress={() => { navigation.navigate("Detail", { id: item.id }) }} style={styles.padding}>
                                <Image style={[tw`rounded-t-lg`, styles.image]} source={{ uri: item.imgURL }} />
                                <View style={tw`flex-row`}>
                                    <Text style={[styles.tag, tw`text-center rounded-full`]}>RATING: {item.rating}/10{" "}
                                        <Icon name="star" size={15} color="yellow" />
                                    </Text>
                                    <Text style={[styles.tag, tw`text-center rounded-full`]}>{item.Genre.name}</Text>
                                </View>
                                <Text style={tw`text-2xl mb-2 font-bold tracking-tight text-gray-900 dark:text-white`}>{item.title}</Text>
                                <Text style={tw`font-normal text-gray-700 dark:text-gray-400`}>{item.synopsis}</Text>
                            </TouchableOpacity >


                            <TouchableOpacity onPress={() => Linking.openURL(`${item.trailerURL}`)} style={tw`pt-[1px] mb-[5px]`}>
                                <Text style={tw`font-medium bg-blue-700 rounded-lg hover:bg-blue-800 dark:hover:bg-blue-700 text-center text-white p-2`}>
                                    <Icons name="movie-roll" size={15} color="yellow" />{" "}
                                    TRAILER{" "}
                                    <Icons name="movie-roll" size={15} color="yellow" />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 400,
        marginTop: 17,
    },
    padding: {
        padding: 17,
    },
    tag: {
        flex: 1,
        backgroundColor: "#FF8C00",
        margin: 7,
        padding: 5,
    }
})