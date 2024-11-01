import { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

export default function LoadingScreen() {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Tạo hiệu ứng xoay lặp lại
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View className="flex-1 h-screen justify-center items-center bg-white">
      <Animated.View
        style={{
          width: 64,
          height: 64,
          borderWidth: 4,
          borderColor: "blue",
          borderRightColor: "transparent",
          borderRadius: 32,
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
}
