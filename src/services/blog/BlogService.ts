import api from "@/interceptor/api";
import { BlogType } from "@/types/blog/BlogType";
import { SearchBlogType } from "@/types/blog/SearchBlogType";
import { BasePageResponse } from "@/types/common/BasePageResponse";
import { IBaseResponse } from "@/types/common/BaseResponse";

export const BlogService = {
  async getAllBlog(): Promise<BlogType[]> {
    const res = await api.get<IBaseResponse<BlogType[]>>("/blog");
    if (!res.data.data) {
      throw new Error("Không lấy được category");
    }
    return res?.data?.data;
  },

  async getAllBlogHavePage(
    searchs: SearchBlogType = {}
  ): Promise<BasePageResponse<BlogType>> {
    const res = await api.get<IBaseResponse<BasePageResponse<BlogType>>>(
      "/blog",
      {
        params: searchs,
      }
    );
    if (!res.data.data) {
      throw new Error("Không lấy được category");
    }
    return res?.data?.data;
  },
};
