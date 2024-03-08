import { BookKey } from "lucide-react";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center gap-2 ">
        <BookKey />
        <span className="font-extrabold">Scriptfolio</span>
      </div>
    </header>
  );
};

export default Header;
