import { Home } from "./Pages/Home.jsx"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./UI/theme";
import { ReactFlowProvider } from "@xyflow/react"
import { DnDProvider } from "./provider/DnDContext.jsx"


function App() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <ReactFlowProvider>
        <DnDProvider>
          <Home />
        </DnDProvider>
      </ReactFlowProvider>
    </ThemeProvider>
  )
}

export default App
