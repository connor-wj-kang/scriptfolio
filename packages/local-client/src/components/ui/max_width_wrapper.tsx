import { FC, ReactNode } from "react";

interface MaxWidthWrapperProps {
  children: ReactNode;
}

const MaxWidthWrapper: FC<MaxWidthWrapperProps> = ({ children }) => {
  return (
    <div className="mx-6 mb-12 flex flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
