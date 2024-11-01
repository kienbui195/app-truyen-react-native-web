export interface PageData {
  breadCrumb: BreadCrumb[];
  titlePage: string;
  items: Item[];
  params: Params;
  item: Item;
}

export interface BreadCrumb {
  name: string;
  slug?: string;
  isCurrent: boolean;
  position: number;
}

export interface Item {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  status: string;
  thumb_url: string;
  sub_docquyen: boolean;
  category: Category[];
  updatedAt: string;
  chaptersLatest: ChaptersLatest[];
  content: string;
  author: string[];
  chapters: ChapterData[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ChaptersLatest {
  filename: string;
  chapter_name: string;
  chapter_title: string;
  chapter_api_data: string;
}

export interface Params {
  type_slug: string;
  filterCategory: string[];
  sortField: string;
  sortType: string;
  pagination: Pagination;
}

export interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

export interface Categories {
  _id: string;
  name: string;
  slug: string;
}

export interface ChapterData {
  server_name: string;
  server_data: Chapter[];
}

export interface Chapter {
  chapter_api_data: string;
  chapter_name: string;
  chapter_title: string;
  filename: string;
}

export interface ChapterDetail {
  domain_cdn: string;
  item: {
    chapter_image: {
      image_page: number;
      image_file: string;
    }[];
    chapter_name: string;
    chapter_path: string;
    chapter_title: string;
    comic_name: string;
    _id: string;
  };
}
