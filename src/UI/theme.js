import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#f8fafb",   // clean neutral background
            paper: "#ffffff",     // white for cards and surfaces
        },
        primary: {
            main: "#2b824c",      // brand green for main accent
            light: "#4aed88",
            dark: "#236c3f",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#368654",
        },
        text: {
            primary: "#1a1c23",   // dark gray for main text
            secondary: "#555a66", // softer gray for secondary content
        },
        divider: "rgba(0, 0, 0, 0.12)",
    },

    typography: {
        fontFamily: ['"Inter"', '"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"].join(","),
        h1: { fontWeight: 700, fontSize: "2.5rem", lineHeight: 1.2, letterSpacing: "-0.02em", color: "#1a1c23" },
        h2: { fontWeight: 600, fontSize: "2rem", lineHeight: 1.3, color: "#1a1c23" },
        h3: { fontWeight: 600, fontSize: "1.75rem", lineHeight: 1.3, color: "#1a1c23" },
        h4: { fontWeight: 600, fontSize: "1.5rem", color: "#1a1c23" },
        h5: { fontWeight: 500, fontSize: "1.25rem", color: "#1a1c23" },
        h6: { fontWeight: 500, fontSize: "1rem", color: "#1a1c23" },
        body1: { fontSize: "1rem", lineHeight: 1.6, color: "#33363f" },
        body2: { fontSize: "0.875rem", lineHeight: 1.6, color: "#5f6368" },
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
                        transform: "translateY(-1px)",
                        boxShadow: "0 2px 8px rgba(43, 130, 76, 0.25)",
                    },
                },
                containedPrimary: {
                    backgroundColor: "#2b824c",
                    color: "#ffffff",
                    "&:hover": {
                        backgroundColor: "#236c3f",
                    },
                },
                outlinedPrimary: {
                    borderColor: "#2b824c",
                    color: "#2b824c",
                    "&:hover": {
                        borderColor: "#236c3f",
                        backgroundColor: "rgba(43, 130, 76, 0.08)",
                    },
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    color: "#1a1c23",
                    borderRadius: 12,
                    padding: "1rem",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#ffffff",
                    color: "#1a1c23",
                    borderRight: "1px solid rgba(0,0,0,0.1)",
                    width: 260,
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    color: "#1a1c23",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                },
            },
        },
    },
});
