import { cn } from '@/lib/utils';
import { Text, View, Pressable } from 'react-native';

type Props = {
  label: string;
  theme?: 'primary' | 'secondary';
  onPress?: () => void;
};

export default function Button({ label, theme = 'primary', onPress }: Props) {
  return (
    <View className='w-[320px] h-[68px] mx-5 justify-center items-center p-[3px]'>
      <Pressable
        onPress={() => onPress && onPress()}
        className={cn([
          'rounded-lg w-full h-full justify-center items-center flex-row',
          theme === 'primary' ? 'bg-blue-500' : 'bg-black'])}
      >
        <Text className='text-[16px] text-white'>{label}</Text>
      </Pressable>
    </View>
  );
}