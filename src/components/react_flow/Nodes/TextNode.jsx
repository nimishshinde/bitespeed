import React from "react";
import { Typography } from "@mui/material";

export function TextNode({ data }) {
    return (
        <div style={{ width: 240, boxShadow: "0 8px 20px rgba(20,20,20,0.08)", borderRadius: 10 }}>
            <div
                style={{
                    background: "linear-gradient(90deg,#aaf1dd,#d9fff2)",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    padding: "8px 12px",
                }}
            >
                <Typography variant="subtitle2">Send Message</Typography>
            </div>

            <div style={{ background: "#fff", padding: 12, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <Typography variant="h6">{data?.text || "(empty)"}</Typography>
            </div>
        </div>
    );
};
