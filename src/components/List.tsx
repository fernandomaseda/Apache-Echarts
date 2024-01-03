import { FC, ReactNode } from "react";
import clsx from "clsx";

const baseItemClassnames =
  "flex w-full items-center bg-white px-4 py-2 rounded-sm shadow-sm border border-solid border-zinc-100";

interface ListProps {
  children: ReactNode;
  className?: string;
}

export const List: FC<ListProps> = ({ className, children }) => {
  return (
    <ul className={clsx("flex w-full flex-col space-y-[1px]", className)}>
      {children}
    </ul>
  );
};

interface SimpleItemProps {
  name: string;
  value?: string;
  className?: string;
}

export const SimpleItem: FC<SimpleItemProps> = ({ className, name, value }) => {
  return (
    <li className={clsx(baseItemClassnames, "justify-between", className)}>
      <div className="text-base font-bold leading-none">{name}</div>
      <div className="text-base font-bold leading-none">{value}</div>
    </li>
  );
};

interface LegendItemProps {
  name: string;
  color: string;
  className?: string;
}

export const LegendItem: FC<LegendItemProps> = ({ className, name, color }) => {
  return (
    <li
      className={clsx(
        baseItemClassnames,
        "list-item text-base font-semibold leading-none",
        color,
        className
      )}
    >
      {name}
    </li>
  );
};
