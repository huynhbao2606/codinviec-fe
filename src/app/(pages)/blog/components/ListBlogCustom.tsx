import clsx from "clsx";
import React from "react";

type divProps = React.HTMLAttributes<HTMLDivElement>;

const ListBlogCustom = ({ children, className, ...rest }: divProps) => {
  return (
    <div className={clsx(className, "grid grid-cols-3 gap-[20px]")} {...rest}>
      {children}
    </div>
  );
};
export default ListBlogCustom;
