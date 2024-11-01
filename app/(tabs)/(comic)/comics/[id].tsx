import config from "@/constants/config";
import { Chapter, ChapterDetail, PageData } from "@/lib/types";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useGlobalSearchParams, useNavigation, useRouter } from "expo-router";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

export interface DetailComicPage {
  serverIdx: number;
  chapters: Chapter[];
  currentChapterIdx: number;
}

export default function ComicDetail() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();
  const navigation = useNavigation();
  const [pageData, setPageData] = useState<PageData | undefined>(undefined);
  const [detail, setDetail] = useState<DetailComicPage>({
    serverIdx: 0,
    chapters: [],
    currentChapterIdx: 0,
  });
  const [chapterInfo, setChapterInfo] = useState({
    name: "",
    title: "",
    apiData: "",
  });
  const [oneChapterInfo, setOneChapterInfo] = useState<
    ChapterDetail | undefined
  >(undefined);
  const width = Dimensions.get("window").width;

  async function getComic() {
    try {
      const res = await axios.get(
        `${config.REACT_NATIVE_OTTRUYEN_URL}/truyen-tranh/${id}`
      );

      setPageData(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  async function onGetChapterData() {
    try {
      const res = await axios.get(`${chapterInfo.apiData}`);

      setOneChapterInfo(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  }

  useEffect(() => {
    if (chapterInfo.apiData === "") return;
    onGetChapterData();
  }, [pageData, chapterInfo.apiData]);

  useEffect(() => {
    if (id) {
      getComic();
    }
  }, [id]);

  useLayoutEffect(() => {
    if (pageData) {
      navigation.setOptions({ title: pageData.item.name });
    }
  }, [navigation, id, pageData]);

  useEffect(() => {
    if (!pageData) return;
    if (pageData.item.chapters.length < 1) return;

    const chapters = [...pageData.item.chapters[detail.serverIdx].server_data];
    setDetail((prev) => ({ ...prev, chapters }));
  }, [detail.serverIdx, pageData]);

  useEffect(() => {
    if (!pageData) return;
    if (pageData.item.chapters.length < 1) return;

    const data =
      pageData.item.chapters[detail.serverIdx].server_data[
        detail.currentChapterIdx
      ];

    setChapterInfo((prev) => ({
      ...prev,
      name: data.chapter_name,
      title: data.chapter_title,
      apiData: data.chapter_api_data,
    }));
  }, [detail.currentChapterIdx, pageData]);

  return (
    pageData && (
      <ScrollView>
        <View className="flex-row ">
          <Image
            source={{
              uri: `${config.REACT_NATIVE_OTTRUYEN_IMG}/uploads/comics/${pageData.item.thumb_url}`,
            }}
            className="size-[200px]"
            resizeMode="contain"
          />
          <View className="p-2 flex-1">
            <Text className="font-bold text-lg">{pageData.item.name}</Text>
            <Text className="font-bold text-gray-400 text-xs">{`Trạng thái: ${pageData.item.status}`}</Text>
            <Text className="font-bold text-green-400 text-xs">{`Ngày cập nhật: ${moment(
              pageData.item.updatedAt
            ).format("hh:mm DD/MM/YYYY")}`}</Text>
            <View className="flex-row flex-wrap mt-2 items-center">
              {pageData.item.category.map((cate, idx) => (
                <Pressable
                  className="px-1 rounded-lg bg-black m-0.5"
                  onPress={() => router.push(`/category?_q=${cate.slug}`)}
                  key={idx}
                >
                  <Text className="text-white font-bold">{cate.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        <View className="mt-4 flex-1 px-2">
          <Text className="text-lg font-bold">Chọn Server</Text>
          <View className="flex-row flex-wrap mb-4">
            {pageData.item.chapters.length > 0 &&
              pageData.item.chapters.map((chapter, idx) => (
                <Pressable
                  className={cn([
                    "border rounded-lg px-1 m-0.5",
                    idx === detail.serverIdx ? "bg-blue-300" : "bg-slate-100",
                  ])}
                  key={idx}
                  onPress={() =>
                    setDetail((prev) => ({ ...prev, serverIdx: idx }))
                  }
                >
                  <Text className="text-black">{chapter.server_name}</Text>
                </Pressable>
              ))}
          </View>
          <Text className="font-bold">Chapters</Text>
          <View className="flex-row flex-wrap mb-4 mt-1">
            {detail.chapters.length > 0 &&
              detail.chapters.map((chapter, idx) => (
                <Pressable
                  key={idx}
                  className={cn([
                    "border rounded-lg m-0.5 min-w-10 p-0.5 justify-center items-center",
                    idx === detail.currentChapterIdx
                      ? "bg-green-300"
                      : "bg-slate-100",
                  ])}
                  onPress={() => {
                    setDetail((prev) => ({ ...prev, currentChapterIdx: idx }));
                  }}
                >
                  <Text>{chapter.chapter_name}</Text>
                </Pressable>
              ))}
          </View>
          {oneChapterInfo && (
            <View className="flex-1 items-center mt-4">
              <Text className="text-xl font-bold">{`Chapter ${oneChapterInfo.item.chapter_name}`}</Text>
              <Text className="text-lg font-bold">
                {oneChapterInfo.item.chapter_title}
              </Text>
              <View className="mt-4 flex-1 h-full mb-10">
                <Carousel
                  width={width}
                  height={1.5 * width}
                  data={oneChapterInfo.item.chapter_image}
                  scrollAnimationDuration={500}
                  renderItem={(data) => (
                    <Image
                      key={data.index}
                      source={{
                        uri: `${oneChapterInfo.domain_cdn}/${oneChapterInfo.item.chapter_path}/${data.item.image_file}`,
                      }}
                      className="flex-1 w-full h-auto"
                      resizeMode="cover"
                    />
                  )}
                  defaultIndex={0}
                  mode="horizontal-stack"
                  modeConfig={{}}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    )
  );
}
