import logo from "./logo.svg";
import "./App.css";
import { HeaderComponent } from "./components/header/headerComponent";
import { HeroComponent } from "./components/hero/heroComponent";
import { ListComponent } from "./components/list/listComponent";
function App() {
  return (
    <>
      <HeaderComponent />
      <HeroComponent />
      <ListComponent />
    </>
  );
}

export default App;
