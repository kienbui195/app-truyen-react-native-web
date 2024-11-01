import { useState, useEffect, useRef } from "react";
import { Dimensions, View } from "react-native";

interface UseIsInViewOptions {
  checkOnce?: boolean;
}

const useIsInView = ({ checkOnce = false }: UseIsInViewOptions) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<View>(null);

  useEffect(() => {
    const handleCheckInView = () => {
      if (ref.current) {
        ref.current.measureInWindow((x, y, width, height) => {
          const windowHeight = Dimensions.get("window").height;
          const isElementInView = y >= 0 && y + height <= windowHeight;

          // Nếu `checkOnce` là true và phần tử đã vào view, không cập nhật lại nữa
          if (checkOnce && isElementInView) {
            setIsInView(true);
          } else if (!checkOnce) {
            setIsInView(isElementInView);
          }
        });
      }
    };

    handleCheckInView();

    const subscription = Dimensions.addEventListener(
      "change",
      handleCheckInView
    );
    return () => subscription?.remove();
  }, [checkOnce]);

  return { isInView, ref };
};

export default useIsInView;
