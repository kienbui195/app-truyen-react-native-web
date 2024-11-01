import config from "@/constants/config";
import { Item } from "@/lib/types";
import { Link, useRouter } from "expo-router";
import moment from "moment";
import { Text, View, Image, Pressable, TouchableOpacity } from "react-native";

export default function ComicCard({ data }: { data: Item }) {
  const router = useRouter();

  return (
    <View className="m-1 rounded-lg flex-1 border w-[180px] h-fit overflow-hidden">
      <Link
        href={{
          pathname: "/(comic)/comics/[id]",
          params: {
            id: data.slug,
          },
        }}
      >
        <Image
          source={{
            uri: `${config.REACT_NATIVE_OTTRUYEN_IMG}/uploads/comics/${data.thumb_url}`,
          }}
          className="rounded-lg w-[180px] h-[240px]"
          resizeMode="contain"
        />
      </Link>
      <View className="p-1">
        <TouchableOpacity
          onPress={() => router.push(`/(comic)/comics/${data.slug}`)}
        >
          <Text className="font-bold text-black">{data.name}</Text>
        </TouchableOpacity>
        <Text className="text-xs">{`Trạng thái: ${data.status}`}</Text>
        <View className="flex-row flex-wrap">
          {data.category.map((cate, idx) => (
            <Pressable
              key={idx}
              className="w-fit bg-black rounded-md px-1 m-0.5"
              onPress={() => router.push(`/category?_q=${cate.slug}`)}
            >
              <Text className="text-white text-xs font-semibold">
                {cate.name}
              </Text>
            </Pressable>
          ))}
        </View>
        <View className="flex-row justify-end mt-2">
          <Text className="text-gray-400 text-xs font-bold">
            {moment(data.updatedAt).format("hh:mm DD/MM/YYYY")}
          </Text>
        </View>
      </View>
    </View>
  );
}
