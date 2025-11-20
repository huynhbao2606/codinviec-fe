import clsx from "clsx";
import React from "react";

type HeadingProps = {
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const HeadingCustom = ({
  type = "h1",
  children,
  className = "",
  ...rest
}: HeadingProps) => {
  const classGeneral = " text font-semibold";

  switch (type) {
    case "h2":
      return (
        <h2 className={clsx(className, classGeneral)} {...rest}>
          {children}
        </h2>
      );

    case "h3":
      return (
        <h3 className={clsx(className, classGeneral)} {...rest}>
          {children}
        </h3>
      );
    case "h5":
      return (
        <h3
          className={clsx(
            className,
            classGeneral,
            "text-[18px] leading-[1.75]"
          )}
          {...rest}
        >
          {children}
        </h3>
      );
  }

  return (
    <h1
      className={clsx(className, classGeneral, "text-[36px] leading-[1.2]")}
      {...rest}
    >
      {children}
    </h1>
  );
};
export default HeadingCustom;
