import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "../shared/constants/colors";
import UserIcon from '../assets/icons/user.svg';
import useGetUser from "../api/user/useGetUser";

export default function Info() {
    const { user, loading, error } = useGetUser();

    if (loading) return <ActivityIndicator size="large" />;
    if (error) return <Text>Errore nel caricamento</Text>;
    
    return (
        <TouchableOpacity activeOpacity={1} style={styles.container} >
            <View style={styles.box_icon}>
                <UserIcon/>
            </View>
            <View style={{marginLeft: 10}}>
                <Text style={styles.title}>Hi, {user?.name}</Text>
                <Text style={styles.subtitle}>Bet with intelligence</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row'
    },

    box_icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.light_green
    },

    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        color: colors.black
    },

    subtitle: {
        fontFamily: 'Montserrat-Regular',
        color: colors.light_gray
    }
})