import ContainerPage from "@/components/ui/container/page";
import HeadingCustom from "@/components/ui/HeadingCustom/page";
import PATH from "@/constant/path";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import BlogCardCustom from "./components/BlogCardCustom";
import ListBlogCustom from "./components/ListBlogCustom";
import { UiButton } from "@/components/ui/base/UiButton";
import SearchCustom from "@/components/ui/SearchCustom/page";

const BlogPage = () => {
  return (
    <>
      <ContainerPage className="">
        <Breadcrumb
          className="!mb-[10px]"
          items={[
            {
              title: (
                <Link href={PATH.HOME}>
                  <HomeOutlined />
                </Link>
              ),
            },
            {
              title: "Blog",
            },
          ]}
        />
        <HeadingCustom type="h1">Blog Page</HeadingCustom>
        <p>Blog tìm việc giúp phát triển ý tưởng và sự nghiệp của bạn</p>

        <SearchCustom className="!mt-[20px]" />
        {/* section Nổi bật */}
        <section className="mt-[30px]">
          <div className=" flex items-center justify-between">
            <h2 className="text-[30px]">Nổi bật</h2>
            <Link
              href={PATH.BLOGALL}
              className="text-accent-500 link-underline"
            >
              Xem tất cả
            </Link>
          </div>
          <ListBlogCustom className="mt-[20px]">
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
          </ListBlogCustom>
        </section>

        {/* section Mới nhất */}
        <section className="mt-[30px]">
          <div className=" flex items-center justify-between">
            <h2 className="text-[30px]">Mới nhất</h2>
            <Link
              href={PATH.BLOGALL}
              className="text-accent-500 link-underline"
            >
              Xem tất cả
            </Link>
          </div>
          <ListBlogCustom className="mt-[20px]">
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
          </ListBlogCustom>
        </section>

        {/* section đọc nhiều nhất */}
        <section className="mt-[30px]">
          <div className=" flex items-center justify-between">
            <h2 className="text-[30px]">Đọc nhiều nhất</h2>
            <Link
              href={PATH.BLOGALL}
              className="text-accent-500 link-underline"
            >
              Xem tất cả
            </Link>
          </div>
          <ListBlogCustom className="mt-[20px]">
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
            <BlogCardCustom imageUrl="/hinh_blog_mau.jpg" />
          </ListBlogCustom>
        </section>
      </ContainerPage>
      <div className="bg-accent-50">
        <ContainerPage className="flex justify-between items-center">
          <p className="text-[24px]">Hãy kể về câu chuyện sự nghiệp của bạn.</p>
          <UiButton variantCustom="secondary">Chia sẻ ngay</UiButton>
        </ContainerPage>
      </div>
    </>
  );
};
export default BlogPage;
