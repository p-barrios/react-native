import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.screen}>
       <Text>Hola, Coder!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    paddingTop:50,
    paddingBottom: 100
  },
});
