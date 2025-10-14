import { useCallback, useRef, useState, useEffect } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
    Handle,
    Position
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import {
    Box,
    Button,
    Drawer,
    Snackbar,
    Alert,
    Stack,
    Paper
} from "@mui/material";
import { nodeTypes } from "../components";


import { SidePanel, TextNode } from "../components";
import { DnDProvider, useDnD } from "../provider/DnDContext";

export function Home() {
    const { screenToFlowPosition } = useReactFlow();
    const [, setType] = useDnD();

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

    // initialize with example nodes so user can see something right away
    useEffect(() => {
        const startNodes = [
            {
                id: "1",
                type: "textNode",
                position: { x: 100, y: 100 },
                data: { text: "Welcome! Connect me to other nodes" },
            },
            {
                id: "2",
                type: "textNode",
                position: { x: 400, y: 200 },
                data: { text: "Drag from the right handle to connect" },
            },
            {
                id: "3",
                type: "textNode",
                position: { x: 100, y: 300 },
                data: { text: "Click on nodes to edit their text" },
            },
        ];

        setNodes(startNodes);
    }, [setNodes]);

    // when reactflow instance is ready
    const onInit = (instance) => {
        rfInstance.current = instance;
    };

    // Helper: show snackbar
    const showSnack = (severity, message) => setSnack({ open: true, severity, message });

    // Handle connection logic with validation
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

            // Add edge with animation
            setEdges((eds) => addEdge({ ...params, animated: true }, eds));
            showSnack("success", "Nodes connected successfully!");
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
        console.log('Hellooo >>>')
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");
            if (!type) return;


            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const id = `${+new Date()}`;
            const newNode = {
                id,
                type,
                position,
                data: { label: `${type} node`, text: "" },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes]
    );

    const onDragStart = (event, nodeType) => {
        console.lgog('onDragStart >> ')
        setType(nodeType);
        // event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

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


        // Number of node for which incoming edges are not present.  
        console.log(nodes, edges);
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
        <ReactFlowProvider>
            <DnDProvider>
                <Box id='main-app' sx={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        p: 2,
                        backgroundColor: 'background.paper',
                        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                        zIndex: 1000,
                        position: 'relative'
                    }}>
                        <Button variant="outlined" onClick={onSave} sx={{ mr: "30%" }}>
                            Save Changes
                        </Button>
                    </Box>

                    <Box sx={{ flex: 1, display: "flex" }}>
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
                                onDragStart={onDragStart}
                                fitView
                            >
                                <Background />
                                <Controls />
                                <MiniMap />
                            </ReactFlow>
                        </div>

                        <SidePanel
                            selectedNode={selectedNode}
                            setSelectedNode={setSelectedNode}
                            updateSelectedNodeText={updateSelectedNodeText}
                        />
                    </Box>

                    <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: "100%" }}>
                            {snack.message}
                        </Alert>
                    </Snackbar>
                </Box>
            </DnDProvider>
        </ReactFlowProvider>
    );
}
