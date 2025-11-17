import HeadingCustom from "@/components/ui/HeadingCustom/page";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type divProps = React.HTMLAttributes<HTMLDivElement>;

type BlogCardProps = {
  title?: string;
  shortDescription?: string;
  imageUrl?: string;
  linkDetail?: string;
} & divProps;

const BlogCardCustom = ({
  title = "",
  shortDescription = "",
  imageUrl = "",
  linkDetail = "",
  className,
  ...rest
}: BlogCardProps) => {
  return (
    <div
      className={clsx(
        className,
        " bg-white rounded-[20px] overflow-hidden shadow-xl flex flex-col  h-[550px]"
      )}
      {...rest}
    >
      <div className="w-full h-[220px] relative">
        <Image
          src={imageUrl || ""}
          alt="blog"
          fill
          className="w-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between p-[32px]">
        <div>
          <HeadingCustom type="h5" className="line-clamp-3 wrap-break-word">
            <Link href={linkDetail}>
              The Ultimate guide: Navigating IT career survival and growth in
              the Age of AI
            </Link>
          </HeadingCustom>

          <p className="mt-[20px] line-clamp-4 wrap-break-word">
            Đọc bản tiếng Việt ở đây. The technological landscape is undergoing
            a fundamental revolution driven by Artificial Intelligence (AI),
            moving far beyond hype to create tangible shifts in the job market
            and career lore
          </p>
        </div>
        <Link href={linkDetail} className="mt-20px text-right">
          xem chi tiết
        </Link>
      </div>
    </div>
  );
};
export default BlogCardCustom;
