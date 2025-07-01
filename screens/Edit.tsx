import { StyleSheet, View } from 'react-native';
import colors from '../shared/constants/colors';
import Info from '../components/Info';

// interface EditProps {
//     id
// }

export default function Edit() {
  return (
    <View style={styles.container}>
      <Info />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: colors.background,
  },
});
