import clsx from "clsx";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContainerPage = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={clsx(
        "w-full container mx-auto px-[6rem] max-xl:px-[40px] max-lg:px-[32px] max-sm:px-[16px] py-[60px]",
        className
      )}
    >
      {children}
    </div>
  );
};
export default ContainerPage;
