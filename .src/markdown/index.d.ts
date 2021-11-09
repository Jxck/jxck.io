/**
 * @param {Node} node
 * @returns {string}
 */
export function serialize_child_text(node: Node): string;
/**
 * @typedef {Object} NodeParam
 * @prop {string} name
 * @prop {string} type
 * @prop {Node} [parent]
 * @prop {Array.<Node>} [children]
 * @prop {number} [level]
 * @prop {string} [text]
 * @prop {Attr} [attr]
 */
/**
 * @param {NodeParam} param
 * @returns {Node}
 */
export function node({ name, type, parent, children, level, text, attr }: NodeParam): Node;
/**
 * @typedef {Object} EncodeOption
 * @prop {number} [indent]
 */
/**
 * Convert Markdown AST to HTML
 * @param {Node} node
 * @param {EncodeOption} [option]
 * @returns {Serialized}
 */
export function encode(node: Node, option?: EncodeOption): Serialized;
/**
 * Parse Markdown text to AST
 * @param {string} md
 * @returns {Node}
 */
export function decode(md: string): Node;
/**
 * @typedef {Object} Plugin
 * @property {function(Node): Node} enter
 * @property {function(Node): Node} leave
 */
/**
 * Traverse Node Tree
 * @param {Node} ast
 * @param {Plugin} plugin
 */
export function traverse(ast: Node, plugin: Plugin): Node;
/**
 * dump for debug
 * @param {Node} ast
 */
export function dump(ast: Node): void;
export class Node {
    /**
     * @param {NodeParam} param
     */
    constructor({ name, type, parent, children, level, text, attr }: NodeParam);
    name: string;
    type: string;
    parent: Node;
    level: number;
    text: string;
    attr: Attr;
    children: Node[];
    /**
     * @param {Node} child
     */
    appendChild(child: Node): void;
    /**
     * @returns {Node}
     */
    lastChild(): Node;
    /**
     * @param {string} text
     */
    addText(text: string): void;
}
export type Serialized = {
    html: string;
    toc: Array<Toc>;
    tags: Array<string>;
};
export type Toc = {
    level: number;
    id: string;
    hashed: string;
    count: number;
    text: string;
};
export type Attr = {
    id?: string;
    title?: string;
    width?: string;
    height?: string;
    cite?: string;
    lang?: string;
    path?: string;
    type?: string;
    src?: string;
    srcset?: string;
    url?: string;
    alt?: string;
    rel?: string;
    property?: string;
    href?: string;
    translate?: string;
    loading?: string;
    decoding?: string;
    controls?: string;
    playsinline?: string;
    aligns?: Array<"center" | "left" | "right">;
    align?: "center" | "left" | "right";
    tags?: Array<string>;
};
export type NodeParam = {
    name: string;
    type: string;
    parent?: Node;
    children?: Array<Node>;
    level?: number;
    text?: string;
    attr?: Attr;
};
export type EncodeOption = {
    indent?: number;
};
export type Plugin = {
    enter: (arg0: Node) => Node;
    leave: (arg0: Node) => Node;
};
