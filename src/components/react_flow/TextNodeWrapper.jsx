
import { Handle, Position } from "@xyflow/react";
import { TextNode } from "./Nodes/TextNode";

import '@xyflow/react/dist/style.css';

export function TextNodeWrapper({ id, data }) {
    return (
        <div style={{ position: "relative", padding: 0 }}>
            {/* left handle (target) */}
            <Handle
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
                type="source"
                position={Position.Right}
                style={{
                    background: '#555',
                    width: 8,
                    height: 8,
                    border: '2px solid #fff'
                }}
            />
        </div>
    )
}
