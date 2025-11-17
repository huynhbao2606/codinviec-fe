import { Pagination, PaginationProps } from "antd";
import clsx from "clsx";

interface MyPaginationProps extends PaginationProps {}
const MyPagination = ({
  className = "",
  defaultCurrent = 1,
  total = 50,
  ...props
}: MyPaginationProps) => {
  return (
    <div className={clsx(className, "flex justify-center items-center")}>
      <Pagination defaultCurrent={defaultCurrent} total={total} {...props} />
    </div>
  );
};
export default MyPagination;
