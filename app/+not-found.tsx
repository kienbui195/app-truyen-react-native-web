import {View} from 'react-native'
import { Link, Stack } from 'expo-router'

export default function NotFound () {
  return (
    <>
      <Stack.Screen options={{title: "Oops! Not found!"}}/>
      <View className='flex-1 justify-center items-center bg-black'>
        <Link href={'/'} className='text-white underline'>Go back Home</Link>
      </View>
    </>
  )
}