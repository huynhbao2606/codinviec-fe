import clsx from "clsx";
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ContainerPage = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={clsx(
        "container mx-auto px-[6rem] max-xl:px-[5rem] max-lg:px-[4rem] max-sm:px-[2rem]",
        className
      )}
    >
      {children}
    </div>
  );
};
export default ContainerPage;
