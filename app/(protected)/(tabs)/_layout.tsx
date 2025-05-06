import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
// import { ImageBackground } from "react-native";

// const TabIcon = ({focused, icon, titile}: any) => {
//     if(focused){
//         return (
//             <ImageBackground className="flex flex-row flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">

//             </ImageBackground>
//         )
//     }
// }

export default function ProtectedLayout() {
    const { user } = useAuth();
    if (user.role !== "admin") {
        return <Redirect href={"/(protected)/(user)/home"} />;
    }
    return (
        <Tabs
            screenOptions={{
                // tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: "100%",
                    height: "120%",
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0f0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 60,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#0f0D23",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Inicio",
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                            name={"home"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="members"
                options={{
                    title: "Clientes",
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                            name={"groups"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
            name="plans" options={{
                title: "Planes",
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons
                        name={"card-membership"}
                        size={size}
                        color={color}
                    />
                ),
            }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <MaterialIcons
                            name={"manage-accounts"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
