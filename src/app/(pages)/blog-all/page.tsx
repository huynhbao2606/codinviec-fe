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

const BlogAllPage = () => {
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
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
          </ListBlogCustom>
        </section>
        <MyPagination defaultCurrent={1} total={500} className="mt-[30px]" />
      </ContainerPage>
    </>
  );
};
export default BlogAllPage;
