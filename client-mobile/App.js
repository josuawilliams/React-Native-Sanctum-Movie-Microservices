import { NavigationContainer } from '@react-navigation/native';
import MainStack from "./src/navigator/MainStack";
import { ApolloProvider } from '@apollo/client';
import client from './config/ApolloClient';
export default function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
      </ApolloProvider>
    </>
  )
}


