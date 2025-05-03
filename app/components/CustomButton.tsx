import { Pressable, PressableProps, Text } from "react-native";
type CustomButtonProps = { text: string } & PressableProps;
export default function CustomButton({text, ...pressableProps}: CustomButtonProps) {
    return (
        <Pressable
            className="m-auto mt-6 p-2 bg-button border border-white rounded-lg"
            {...pressableProps}
        >
            <Text className="text-white font-bold text-lg px-4">
                {text}
            </Text>
        </Pressable>
    );
}
