import { Controller } from "react-hook-form";
import { TextInput, StyleSheet, TextInputProps, Text } from "react-native";
type CustomInputProps = {
    control: any;
    name: string;
} & TextInputProps;

export default function CustomInput({
    control,
    name,
    ...props
}: CustomInputProps) {
    return (
        <Controller
            control={control}
            name={name}
           
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
            }) => (
                <>
                    <TextInput
                        {...props}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={[style.input, props.style, error && style.inputError]}
                    />
                    {error && (
                        <Text style={style.error}>* {error?.message}</Text>
                    )}
                </>
            )}
        />
    );
}

const style = StyleSheet.create({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        backgroundColor: "white",
        color: "black",
    },

    inputError: {
        borderWidth: .3,
        borderColor: "red",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
});
