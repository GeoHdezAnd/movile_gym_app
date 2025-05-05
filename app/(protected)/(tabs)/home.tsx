import {  StyleSheet, Text, View } from "react-native";

export default function HomeAdmin() {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <View style={style.header} >

            </View>
            <Text className="text-white font-bold">Pantalla principal? </Text>
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        top: 0,
        
    }
})