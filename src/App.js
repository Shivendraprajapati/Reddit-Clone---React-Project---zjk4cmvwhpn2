import { CssBaseline, ThemeProvider } from "@mui/material";
import Listing from "./Components/Listing";
import { Navbar } from "./Components/Navbar";
import RightSideBar from "./Components/RightSideBar";
import Sidebar from "./Components/Sidebar";
import { ColorModeContext, useMode } from "./Theme";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <div>
            <Sidebar />
            <Listing />
            <RightSideBar />
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
