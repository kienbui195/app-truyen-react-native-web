import ComicCard from "@/components/ComicCard";
import config from "@/constants/config";
import { PageData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function SearchScreen() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<PageData | undefined>(undefined);

  async function onSearch(page = 1) {
    try {
      setLoading(true);
      const res = await axios.get(
        `${config.REACT_NATIVE_OTTRUYEN_URL}/tim-kiem?keyword=${keyword}&page=${page}`
      );

      setPageData(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 mt-4 px-1 items-center">
      <View className="flex-row items-center w-full px-2">
        <TextInput
          value={keyword}
          onChangeText={(val) => setKeyword(val)}
          className="w-full h-10 p-2 border-2 border-black placeholder:text-gray-400 rounded-lg"
          placeholder="Nhập từ khóa..."
        />
        <Pressable
          className="ml-4 bg-blue-500 p-2 rounded-xl shadow-md"
          onPress={() => onSearch(1)}
        >
          <AntDesign name="search1" size={24} className="text-white" />
        </Pressable>
      </View>
      {pageData && (
        <View className="pt-4 flex-1 items-start w-full px-2">
          <Text className="font-bold text-lg">Kết quả</Text>
          {pageData.items.length > 0 ? (
            <FlatList
              numColumns={2}
              contentContainerClassName="items-center flex-1"
              data={pageData.items}
              renderItem={(data) => <ComicCard data={data.item} />}
              keyExtractor={(data) => `${data._id}`}
              refreshing={loading}
            />
          ) : (
            <Text className="italic">{`Không tìm thấy mẩu truyện nào có từ khóa "${keyword}"`}</Text>
          )}
          {pageData.items.length > 0 && (
            <View className="my-4 justify-center items-center flex-1 w-full flex-row">
              <Pressable
                className="mr-4"
                disabled={pageData?.params.pagination.currentPage === 1}
                onPress={() => {
                  pageData &&
                    onSearch(pageData.params.pagination.currentPage - 1);
                }}
              >
                <Text
                  className={cn([
                    "font-bold",
                    pageData?.params.pagination.currentPage === 1
                      ? "text-gray-400"
                      : "text-blue-500",
                  ])}
                >
                  Trang Trước
                </Text>
              </Pressable>
              <Text className="text-blue-500 underline text-lg">
                {pageData?.params.pagination.currentPage}
              </Text>
              <Pressable
                className="ml-4"
                onPress={() => {
                  pageData &&
                    onSearch(pageData.params.pagination.currentPage + 1);
                }}
                disabled={
                  !pageData
                    ? true
                    : pageData.params.pagination.currentPage ===
                      Math.ceil(
                        pageData.params.pagination.totalItems /
                          pageData.params.pagination.totalItemsPerPage
                      )
                }
              >
                <Text
                  className={cn([
                    "font-bold ",
                    !pageData
                      ? "text-gray-500"
                      : pageData.params.pagination.currentPage ===
                        Math.ceil(
                          pageData.params.pagination.totalItems /
                            pageData.params.pagination.totalItemsPerPage
                        )
                      ? "text-gray-400"
                      : "text-blue-500",
                  ])}
                >
                  Trang Sau
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
