"use client";
import ContainerPage from "@/components/ui/container/page";
import HeadingCustom from "@/components/ui/HeadingCustom/page";
import { PATHS } from "@/constants/paths";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import BlogCardCustom from "../blog/components/BlogCardCustom";
import ListBlogCustom from "../blog/components/ListBlogCustom";
import MyPagination from "@/components/ui/MyPagination/page";
import SearchCustom from "@/components/ui/SearchCustom/page";
import { BlogService } from "@/services/blog/BlogService";
import { useQuery } from "@tanstack/react-query";
import { BlogType } from "@/types/blog/BlogType";
import { useState } from "react";
import { BasePageResponse } from "@/types/common/BasePageResponse";

const pageSizeBlogDefault = 9;

const BlogAllPage = () => {
  const [pageBlog, setPageBlog] = useState(1);

  const { data, isLoading, isError, error } = useQuery<
    BasePageResponse<BlogType>,
    Error
  >({
    queryKey: ["blogs", pageBlog],
    queryFn: () =>
      BlogService.getAllBlogHavePage({
        pageNumber: pageBlog,
        pageSize: pageSizeBlogDefault,
      }),
  });

  const onChangePagination = (page: number, pageSize: number) => {
    setPageBlog(page);
  };
  return (
    <>
      <ContainerPage className="">
        <Breadcrumb
          className="!mb-[10px]"
          items={[
            {
              title: (
                <Link href={PATHS.HOME}>
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              title: <Link href={PATHS.BLOG}>Blog</Link>,
            },
            {
              title: "Blog-all",
            },
          ]}
        />
        <HeadingCustom type="h1">Blog All Page</HeadingCustom>
        <p>Blog tìm việc giúp phát triển ý tưởng và sự nghiệp của bạn</p>

        <SearchCustom className="!mt-[20px]" />

        {/* section Nổi bật */}
        <section className="mt-[30px]">
          <ListBlogCustom className="mt-[20px]">
            {data?.content?.map((blog) => (
              <BlogCardCustom
                key={blog.id}
                shortDescription={blog.shortDescription || ""}
                title={blog.title || ""}
                imageUrl={blog.picture || "/hinh_blog_mau.jpg"}
                linkDetail={`${PATHS.BLOG}/${blog.id}`}
              />
            ))}
          </ListBlogCustom>
        </section>
        <MyPagination
          defaultCurrent={pageBlog}
          pageSize={pageSizeBlogDefault}
          total={data?.totalElements || 0}
          onChange={onChangePagination}
          className="mt-[30px]"
        />
      </ContainerPage>
    </>
  );
};
export default BlogAllPage;
