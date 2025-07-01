import { View, StyleSheet } from "react-native";
import colors from "../../shared/constants/colors";

export default function ReportScreen() {
    return (
        <View style={styles.container}></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    }
})