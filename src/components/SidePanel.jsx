import React from "react";
import '@xyflow/react/dist/style.css';
import {
    Box,
    Button,
    Drawer,
    Paper,
    Typography,
    TextField,
    Stack,
    Snackbar,
    Alert,
} from "@mui/material";

// Render nodes panel (left) or settings (right) depending on selectedNode
export function SidePanel({ selectedNode, setSelectedNode, updateSelectedNodeText }) {
    return (
        <Box sx={{ width: 320, padding: 2 }}>
            {!selectedNode ? (
                <>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Nodes
                    </Typography>

                    <Paper
                        elevation={2}
                        sx={{ p: 2, cursor: "grab", display: "inline-block" }}
                        onDragStart={(e) => e.dataTransfer.setData("application/reactflow", "textNode")}
                        draggable
                    >
                        <Typography>Message</Typography>
                    </Paper>
                </>
            ) : (
                <>
                    <Button variant="text" onClick={() => setSelectedNode(null)} sx={{ mb: 2 }}>
                        ← Back
                    </Button>
                    <Typography variant="h6">Message</Typography>
                    <TextField
                        multiline
                        minRows={4}
                        fullWidth
                        sx={{ mt: 2 }}
                        label="Text"
                        value={selectedNode.data.text}
                        onChange={(e) => updateSelectedNodeText(e.target.value)}
                    />
                </>
            )}
        </Box>
    );
};