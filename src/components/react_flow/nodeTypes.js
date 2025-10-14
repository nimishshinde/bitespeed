import { TextNodeWrapper } from "./TextNodeWrapper";
import { NODE_TYPES } from "../../constants/common";

const { TEXT_NODE } = NODE_TYPES;

export const nodeTypes = {
    [TEXT_NODE]: TextNodeWrapper,
};