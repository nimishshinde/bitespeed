import React from "react";
import '@xyflow/react/dist/style.css';
import {
    Box,
    Button,
    Drawer,
    Paper,
    Typography,
    TextField,
} from "@mui/material";
import { useDnD } from '../provider/DnDContext';


// Render nodes panel (left) or settings (right) depending on selectedNode
export function SidePanel({ selectedNode, setSelectedNode, updateSelectedNodeText }) {
    const [_, setType] = useDnD();

    const onDragStart_DND = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData("application/reactflow", "textNode")
    };

    return (
        <Drawer anchor="right" variant="permanent" PaperProps={{ style: { width: "auto" } }}>
            <Box sx={{ width: 320, padding: 2 }}>
                {!selectedNode ? (
                    <>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Nodes
                        </Typography>

                        <Paper
                            elevation={0}
                            sx={{ p: 2, cursor: "grab", display: "inline-block" }}
                            onDragStart={(e) => onDragStart_DND(e, "textNode")}
                            draggable
                        >
                            <Typography variant="h5" >Message</Typography>
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
        </Drawer>
    );
};