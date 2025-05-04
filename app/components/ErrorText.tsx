import { Text, StyleSheet } from "react-native";


export default function ErrorText({ error }: { error: string }) {
    return (
        <Text style={style.errorMessage}>
            * {error}
        </Text>
    )
}

const style =  StyleSheet.create({
    errorMessage :{
        color: "red",
        fontSize: 16,
        padding: 2,
        borderRadius: 10,
        backgroundColor: "rgba(163, 18, 13, 0.38)",
    }
})