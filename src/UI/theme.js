import { createTheme } from "@mui/material"

export const theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#1c1e29",
            paper: "#242736",
        },
        primary: {
            main: "#4aed88",
            dark: "#2b824c",
            light: "#368654",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#368654",
        },
        text: {
            primary: "#ffffff",
            secondary: "#b0b3c2",
        },
        divider: "rgba(255, 255, 255, 0.12)",
    },

    typography: {
        fontFamily: ['"Inter"', '"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"].join(","),
        h1: { fontWeight: 700, fontSize: "2.5rem", lineHeight: 1.2, letterSpacing: "-0.02em" },
        h2: { fontWeight: 600, fontSize: "2rem", lineHeight: 1.3 },
        h3: { fontWeight: 600, fontSize: "1.75rem", lineHeight: 1.3 },
        h4: { fontWeight: 600, fontSize: "1.5rem" },
        h5: { fontWeight: 500, fontSize: "1.25rem" },
        h6: { fontWeight: 500, fontSize: "1rem" },
        body1: { fontSize: "1rem", lineHeight: 1.6, color: "#d0d2dc" },
        body2: { fontSize: "0.875rem", lineHeight: 1.6, color: "#a0a3b0" },
        button: { textTransform: "none", fontWeight: 600, fontSize: "0.95rem" },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: "8px 18px",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        boxShadow: "0 0 10px rgba(74, 237, 136, 0.3)",
                        transform: "translateY(-1px)",
                    },
                },
                containedPrimary: {
                    backgroundColor: "#4aed88",
                    color: "#1c1e29",
                    "&:hover": {
                        backgroundColor: "#2b824c",
                    },
                },
                outlinedPrimary: {
                    borderColor: "#4aed88",
                    color: "#4aed88",
                    "&:hover": {
                        borderColor: "#2b824c",
                        backgroundColor: "rgba(74, 237, 136, 0.08)",
                    },
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#242736",
                    color: "#ffffff",
                    borderRadius: 12,
                    padding: "1rem",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#1c1e29",
                    color: "#ffffff",
                    borderRight: "1px solid rgba(255,255,255,0.1)",
                    width: 260,
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#242736",
                    boxShadow: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#242736",
                    borderRadius: 12,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                },
            },
        },
    },
});

