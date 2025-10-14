import { Main } from "./Pages/Main"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./UI/theme";


function App() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Main />
    </ThemeProvider>
  )
}

export default App
