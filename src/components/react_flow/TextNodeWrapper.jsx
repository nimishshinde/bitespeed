import { useState } from "react";
import { Handle, Position, useEdges } from "@xyflow/react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { TextNode } from "./Nodes/TextNode";

import '@xyflow/react/dist/style.css';

export function TextNodeWrapper({ id, data }) {
    const edges = useEdges();

    const [snack, setSnack] = useState({ open: false, severity: "error", message: "" });
    const showSnack = (severity, message) => setSnack({ open: true, severity, message });

    const handleCloseSnack = () => setSnack((s) => ({ ...s, open: false }));

    return (
        <div style={{ position: "relative", padding: 0 }}>
            {/* left handle (target) */}
            <Handle
                isValidConnection={
                    (edge) => {
                        const source = edge.source;
                        let isValid = true;

                        edges.forEach((ele) => {
                            if (ele.source === source) {
                                isValid = false;
                            }
                        });

                        if (!isValid) {
                            showSnack("error", "Node source can only have one edge originating");
                        }

                        return isValid;
                    }
                }
                type="target"
                position={Position.Left}
                style={{
                    background: '#555',
                    width: 8,
                    height: 8,
                    border: '2px solid #fff'
                }}
            />

            <TextNode id={id} data={data} />

            {/* right handle (source) */}
            <Handle
                // isConnectableStart={false}
                type="source"
                position={Position.Right}
                style={{
                    background: '#555',
                    width: 8,
                    height: 8,
                    border: '2px solid #fff'
                }}
                isValidConnection={
                    (edge) => {
                        const source = edge.source;
                        let isValid = true;

                        edges.forEach((ele) => {
                            if (ele.source === source) {
                                isValid = false;
                            }
                        });

                        if (!isValid) {
                            showSnack("error", "Node source can only have one edge originating");
                        }

                        return isValid;
                    }
                }
            />

            <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: "100%" }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </div>
    )
}
