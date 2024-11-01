import ComicCard from "@/components/ComicCard";
import config from "@/constants/config";
import { Categories, Item, PageData } from "@/lib/types";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";

export default function ShortVideo() {
  const [pageData, setPageData] = useState<Categories[]>([]);
  const router = useRouter();
  const { _q } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<PageData | undefined>(undefined);
  const [chooseCate, setChooseCate] = useState({
    name: "",
    slug: "",
  });

  async function getPageData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${config.REACT_NATIVE_OTTRUYEN_URL}/the-loai`
      );

      setPageData(res.data.data.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function getListComicOfCategory(categorySlug: string, page = 1) {
    try {
      const res = await axios.get(
        `${config.REACT_NATIVE_OTTRUYEN_URL}/the-loai/${categorySlug}?page=${page}`
      );

      setChooseCate((prev) => ({ ...prev, name: res.data.data.titlePage }));
      setList(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  useEffect(() => {
    getPageData();
  }, []);

  useEffect(() => {
    if (_q) {
      setChooseCate((prev) => ({ ...prev, slug: _q as string }));
      getListComicOfCategory(_q as string);
    }
  }, [_q]);

  return (
    <View className="px-1 flex-1 mt-4">
      <Text className="text-lg font-bold">Tất cả thể loại</Text>
      <View className="flex-row items-start flex-wrap">
        {pageData.map((data, idx) => (
          <TouchableOpacity
            className="border border-black m-1 rounded-lg"
            onPress={() => router.push(`/category?_q=${data.slug}`)}
            key={idx}
          >
            <View className={cn(["p-1 rounded-lg", data.slug === _q ? "bg-blue-500" : "bg-slate-100"])}>
              <Text className="font-bold">{data.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Text className={cn(["mt-4 text-lg font-bold", list ? "flex" : "hidden"])}>{`Danh sách truyện thể loại ${chooseCate.name}`}</Text>
      {list && (
        <FlatList
          numColumns={2}
          contentContainerClassName="items-center flex-1"
          data={list.items}
          renderItem={(data) => <ComicCard data={data.item} />}
          keyExtractor={(data) => `${data._id}`}
          // refreshing={}
        />
      )}
      {list && (
        <View className="my-4 justify-center items-center flex-1 flex-row">
          <Pressable
            className="mr-4"
            disabled={list?.params.pagination.currentPage === 1}
            onPress={() => {
              list &&
                getListComicOfCategory(
                  _q as string,
                  list.params.pagination.currentPage - 1
                );
            }}
          >
            <Text
              className={cn([
                "font-bold",
                list?.params.pagination.currentPage === 1
                  ? "text-gray-400"
                  : "text-blue-500",
              ])}
            >
              Trang Trước
            </Text>
          </Pressable>
          <Text className="text-blue-500 underline text-lg">
            {list?.params.pagination.currentPage}
          </Text>
          <Pressable
            className="ml-4"
            onPress={() => {
              list &&
                getListComicOfCategory(
                  _q as string,
                  list.params.pagination.currentPage + 1
                );
            }}
            disabled={
              !list
                ? true
                : list.params.pagination.currentPage ===
                  Math.ceil(
                    list.params.pagination.totalItems /
                      list.params.pagination.totalItemsPerPage
                  )
            }
          >
            <Text
              className={cn([
                "font-bold ",
                !list
                  ? "text-gray-500"
                  : list.params.pagination.currentPage ===
                    Math.ceil(
                      list.params.pagination.totalItems /
                        list.params.pagination.totalItemsPerPage
                    )
                  ? "text-gray-500"
                  : "text-blue-500",
              ])}
            >
              Trang Sau
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
