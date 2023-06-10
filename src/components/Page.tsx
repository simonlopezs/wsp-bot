import { PropsWithChildren } from "react";

export interface PageProps extends PropsWithChildren {
  title: string;
  actions?: React.ReactNode;
}

export const Page = ({ title, children, actions }: PageProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between align-middle mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {actions}
      </div>
      {children}
    </div>
  );
};
