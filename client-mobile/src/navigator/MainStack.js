import HomePage from "../views/HomePage";
import DashBoard from "../views/DashBoard";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from "react-native-vector-icons/FontAwesome"
import Detail from "../views/Detail";

const Stack = createNativeStackNavigator();
export default function MainStack() {
  const navigation = useNavigation();
  return (
    <>
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }} >

          <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={DashBoard} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={Detail} options={{
            title: 'Movie Detail',
            headerTintColor: "white",
            headerLeft: () => (
              <Icon
                raised
                name='arrow-left'
                color='white'
                size={19}
                backgroundColor='black'
                onPress={() =>navigation.goBack()} />
            ),
            headerStyle: {
              backgroundColor: 'black',
            },
          }} />

        </Stack.Navigator>
      
    </>
  )
}


