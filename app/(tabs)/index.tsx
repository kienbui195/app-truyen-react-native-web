import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  RefreshControl,
} from "react-native";
import qs from "qs";
import { Link, useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import config from "@/constants/config";
import { PageData } from "@/lib/types";
import ComicCard from "@/components/ComicCard";
import { cn } from "@/lib/utils";

export default function Index() {
  const [pageData, setPageData] = useState<PageData | undefined>(undefined);
  const [flag, setFlag] = useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  async function getPageData(page = 1) {
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          config.REACT_NATIVE_OTTRUYEN_URL
        }/danh-sach/truyen-moi?${qs.stringify(
          {
            page,
          },
          { encodeValuesOnly: true }
        )}`
      );
      setPageData(res.data.data);
      setFlag((prev) => prev++);
    } catch (err) {
      console.log(err);
    } finally {
      setFlag((prev) => prev + 1);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPageData();
  }, []);

  return (
    <View className="flex-1 px-3 mt-4">
      <Text className="text-lg">Truyện mới</Text>
      {pageData && (
        <FlatList
          numColumns={2}
          contentContainerClassName="items-center flex-1"
          data={pageData.items}
          renderItem={(data) => <ComicCard data={data.item} />}
          keyExtractor={(data) => `${data._id}`}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getPageData} />
          }
        />
      )}
      <View className="my-4 justify-center items-center flex-1 flex-row">
        <Pressable
          className="mr-4"
          disabled={pageData?.params.pagination.currentPage === 1}
          onPress={() => {
            pageData && getPageData(pageData.params.pagination.currentPage - 1);
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
            pageData && getPageData(pageData.params.pagination.currentPage + 1);
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
                ? "text-gray-500"
                : "text-blue-500",
            ])}
          >
            Trang Sau
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
