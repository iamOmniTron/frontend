import RenderRoutes from "./routes";
import RefreshContext from "./context/refreshContext";
import { useState } from "react";

function App() {
  const [flag,setFlag] = useState(false);
  return (
    <>
    <RefreshContext.Provider value={{flag,setFlag}}>
        <RenderRoutes/>
    </RefreshContext.Provider>
    </>
  );
}

export default App;
