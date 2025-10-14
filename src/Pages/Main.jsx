import React, { useCallback, useRef, useState, useEffect } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
} from "@xyflow/react";
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

import { SidePanel } from "../components/SidePanel";

// ----------------------
// Custom Text Node
// ----------------------
// This node renders a simple message card with a top title and text body.
// It exposes a TARGET handle (left) and a SOURCE handle (right).
const TextNode = ({ data }) => {
    return (
        <div style={{ width: 240, boxShadow: "0 8px 20px rgba(20,20,20,0.08)", borderRadius: 10 }}>
            {/* top bar */}
            <div
                style={{
                    background: "linear-gradient(90deg,#aaf1dd,#d9fff2)",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    padding: "8px 12px",
                    fontWeight: 700,
                }}
            >
                <Typography variant="subtitle2">Send Message</Typography>
            </div>

            {/* body */}
            <div style={{ background: "#fff", padding: 12, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                <Typography variant="body2">{data?.text || "(empty)"}</Typography>
            </div>

            {/* Handles are placed absolutely using reactflow's default handle positions. */}
            {/* We only render the handles as invisible DOM anchors; reactflow attaches them by id. */}
            <div style={{ position: "absolute", left: -8, top: 36 }} data-handle-target>
                {/* actual Handle elements are provided by reactflow via nodeTypes styling; we'll rely on builtin handles in the node renderer below */}
            </div>
        </div>
    );
};

// ----------------------
// App: Flow Builder
// ----------------------
export function Main() {
    // nodes & edges state helpers from reactflow
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    // selected node for settings panel
    const [selectedNode, setSelectedNode] = useState(null);

    // ref to reactflow wrapper and instance to project drop coords
    const reactFlowWrapper = useRef(null);
    const rfInstance = useRef(null);

    // for user-facing errors/info
    const [snack, setSnack] = useState({ open: false, severity: "error", message: "" });

    // node types map (extensible for future node types)
    const nodeTypes = {
        textNode: ({ id, data }) => (
            <div style={{ position: "relative", padding: 0 }}>
                {/* left handle (target) */}
                {/* use built-in handle element by the library: */}
                <div style={{ position: "absolute", left: -9, top: 44 }}>
                    <div className="react-flow__handle react-flow__handle-target" data-handle-type="target" />
                </div>

                <TextNode id={id} data={data} />

                {/* right handle (source) */}
                <div style={{ position: "absolute", right: -9, top: 44 }}>
                    <div className="react-flow__handle react-flow__handle-source" data-handle-type="source" />
                </div>
            </div>
        ),
    };

    // initialize with an example node so user can see something right away
    useEffect(() => {
        const startNodes = [
            {
                id: "1",
                type: "textNode",
                position: { x: 50, y: 240 },
                data: { text: "test message 1" },
            },
            {
                id: "2",
                type: "textNode",
                position: { x: 420, y: 160 },
                data: { text: "test message 2" },
            },
            {
                id: "3",
                type: "textNode",
                position: { x: 650, y: 360 },
                data: { text: "textNode" },
            },
        ];

        setNodes(startNodes);
    }, []);

    // when reactflow instance is ready
    const onInit = (instance) => {
        rfInstance.current = instance;
    };

    // Helper: show snackbar
    const showSnack = (severity, message) => setSnack({ open: true, severity, message });

    // Handle connection logic
    const onConnect = useCallback(
        (params) => {
            // Enforce: one edge only per source handle
            const hasOutgoingFromSameSource = edges.some(
                (e) => e.source === params.source && e.sourceHandle === params.sourceHandle
            );

            if (hasOutgoingFromSameSource) {
                showSnack("error", "Each source handle can only have one outgoing connection.");
                return;
            }

            // Add edge
            setEdges((eds) => addEdge({ ...params, animated: true }, eds));
        },
        [edges, setEdges]
    );

    // on node click -> open settings panel
    const onNodeClick = (event, node) => {
        setSelectedNode(node);
    };

    // drop a new node from the nodes panel
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");
            if (!type) return;

            const position = rfInstance.current.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const id = `${+new Date()}`; // simple unique id
            const newNode = {
                id,
                type,
                position,
                data: { text: "" },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [setNodes]
    );

    // Update selected node's text from settings panel
    const updateSelectedNodeText = (value) => {
        if (!selectedNode) return;
        setNodes((nds) => nds.map((n) => (n.id === selectedNode.id ? { ...n, data: { ...n.data, text: value } } : n)));
        setSelectedNode((s) => ({ ...s, data: { ...s.data, text: value } }));
    };

    // Save button rules:
    // If there are more than 1 node and more than 1 node has empty incoming connections (i.e. multiple start nodes)
    // -> show error and prevent save.
    const onSave = () => {
        if (nodes.length <= 1) {
            showSnack("info", "Saved (single or no node). Always good to test your flow!");
            return;
        }

        // count nodes without incoming edges (i.e. no edge whose target is that node)
        const nodesWithNoIncoming = nodes.filter((n) => !edges.some((e) => e.target === n.id));

        if (nodesWithNoIncoming.length > 1) {
            showSnack("error", `Cannot save: Found ${nodesWithNoIncoming.length} nodes without incoming connections.`);
            return;
        }

        // All validation passed - pretend to save
        showSnack("success", "Flow saved successfully!");
        // Here you'd call your API to persist the nodes & edges
        console.log("Saved flow", { nodes, edges });
    };

    // Close snack
    const handleCloseSnack = () => setSnack((s) => ({ ...s, open: false }));



    return (
        <Box id='main-app' sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
            {/* Top bar with Save */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", p: 1 }}>
                <Button variant="outlined" onClick={onSave} sx={{ mr: 2 }}>
                    Save Changes
                </Button>
            </Box>

            <Box sx={{ flex: 1, display: "flex" }}>
                {/* React Flow canvas with drag/drop */}
                <div ref={reactFlowWrapper} style={{ flex: 1 }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onInit={onInit}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        onNodeClick={onNodeClick}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                    >
                        <Background />
                        <Controls />
                        <MiniMap />
                    </ReactFlow>
                </div>

                {/* Right side: nodes panel OR settings drawer */}
                <Drawer anchor="right" variant="permanent" PaperProps={{ style: { width: 320 } }}>
                    <SidePanel
                        selectedNode={selectedNode}
                        setSelectedNode={setSelectedNode}
                        updateSelectedNodeText={updateSelectedNodeText}
                    />
                </Drawer>
            </Box>

            {/* Snackbar for feedback */}
            <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: "100%" }}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
