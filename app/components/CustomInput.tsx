import { Controller, Control, Path, FieldValues } from "react-hook-form";
import { TextInput, StyleSheet, TextInputProps, Text } from "react-native";
type CustomInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
} & TextInputProps;

export default function CustomInput<T extends FieldValues>({
    control,
    name,
    ...props
}: CustomInputProps<T>) {
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
                        style={[
                            style.input,
                            props.style,
                            error && style.inputError,
                        ]}
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
        borderWidth: 0.3,
        borderColor: "red",
    },
    error: {
        color: "red",
        fontSize: 12,
        marginTop: 4,
    },
});
