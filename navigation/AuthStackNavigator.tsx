import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/code/Auth/SignInScreen";
import SignUpScreen from "../screens/code/Auth/SignUpScreen";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign in"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Sign up" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
