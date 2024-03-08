import { useEffect } from "react";
import { startService } from "./bundler";
import Header from "./components/ui/header";
import MaxWidthWrapper from "./components/ui/max_width_wrapper";
import CellList from "./components/CellList";

function App() {
  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <Header></Header>
      <MaxWidthWrapper>
        <CellList></CellList>
      </MaxWidthWrapper>
    </div>
  );
}

export default App;
