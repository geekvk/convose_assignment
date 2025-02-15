import {StyleSheet, View} from 'react-native';
import SearchBar from "@/components/SearchBar";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar/>
    </View>
  )

}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    paddingHorizontal : 20,
    paddingVertical : 10
  }
});
