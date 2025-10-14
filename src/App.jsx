import { Home } from "./Pages/Home.jsx"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./UI/theme";
import { ReactFlowProvider } from "@xyflow/react"


function App() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <ReactFlowProvider>
        <Home />
      </ReactFlowProvider>
    </ThemeProvider>
  )
}

export default App
