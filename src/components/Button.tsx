import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as: "primary" | "secondary";
  size?: "small" | "medium" | "full";
  className?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
  onlyIcon?: ReactNode;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  as,
  size,
  children,
  disabled,
  className = "",
  startIcon,
  onlyIcon,
  ...props
}) => {
  const getButtonClassNames = () => {
    const classNameSize = {
      small: "p-[6px] text-sm max-h-7",
      medium: "py-[10px] px-4",
      grown: "py-[10px] px-6",
      full: "py-[10px] w-full",
    };

    const shadowOutlineTransition =
      "transition-[shadow, outline] duration-100 ease-in-out";

    switch (as) {
      case "primary":
        return clsx(
          "text-center font-semibold text-white bg-black rounded-sm border-none text-nowrap leading-none",
          "hover:shadow-sm active:shadow-none disabled:opacity-50",
          shadowOutlineTransition,
          classNameSize[size ?? "medium"]
        );
      case "secondary":
        return clsx(
          "text-center font-semibold text-black bg-white rounded-sm border border-solid border-gray-200 text-nowrap leading-none",
          "hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50",
          shadowOutlineTransition,
          classNameSize[size ?? "medium"]
        );
      default:
        return "";
    }
  };

  const ChildenRender = (): JSX.Element => {
    if (onlyIcon) {
      return (
        <div className="flex flex-row items-center justify-center">
          {children}
        </div>
      );
    }

    if (startIcon) {
      return (
        <div className="inline-flex items-center space-x-[6px] max-h-full">
          <span>{startIcon}</span>
          <span>{children}</span>
        </div>
      );
    }
    return <>{children}</>;
  };

  return (
    <button
      className={clsx(getButtonClassNames(), className)}
      disabled={disabled}
      {...props}
    >
      <ChildenRender />
    </button>
  );
};
