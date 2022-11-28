/**
 * @typedef {Object} Heading
 * @property {number} level
 * @property {string} id
 * @property {string} hashed
 * @property {number} count
 * @property {string} text
 */
/**
 * @param {number} indent
 * @returns {string}
 */
export function spaces(indent: number): string;
/**
 * to map
 * @param {Object} obj
 * @returns {Map<string, string>}
 */
export function map(obj: Object): Map<string, string>;
/**
 * @param {string} str
 * @returns {string}
 */
export function hsc(str: string): string;
/**
 * @param {Node} node
 * @returns {string}
 */
export function serialize_child_text(node: Node): string;
/**
 * @param {Node} h
 * @returns {string}
 */
export function create_id_from_text(h: Node): string;
/**
 * Headings の配列を <ul>/<ol> リストに組み直す
 * @param {Array.<Node>} headings
 * @param {{list:string}} opt
 */
export function to_toc(headings: Array<Node>, opt?: {
    list: string;
}): Node;
/**
 * @typedef {Object} NodeParam
 * @prop {string} name
 * @prop {string} type
 * @prop {Node} [parent]
 * @prop {Array.<Node>} [children]
 * @prop {number} [level]
 * @prop {string} [text]
 * @prop {Attr} [attr]
 * @prop {Array.<"center" | "left" | "right">} [aligns]
 */
/**
 * @param {NodeParam} param
 * @returns {Node}
 */
export function node({ name, type, parent, children, level, text, attr, aligns }: NodeParam): Node;
/**
 * @typedef {Object} EncodeOption
 * @prop {number} [indent]
 */
/**
 * Convert Markdown AST to HTML
 * @param {Node} node
 * @param {EncodeOption} [option]
 * @returns {string}
 */
export function encode(node: Node, option?: EncodeOption): string;
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
export { format } from "./formatter.js";
export class Node {
    /**
     * @param {NodeParam} param
     */
    constructor({ name, type, parent, children, level, text, attr, aligns }: NodeParam);
    name: string;
    type: string;
    parent: Node;
    level: number;
    text: string;
    attr: Attr;
    aligns: ("center" | "left" | "right")[];
    /**@type{Array.<Node>}*/
    children: Array<Node>;
    /**
     * @param {Node} child
     */
    appendChild(child: Node): void;
    /**
     * @param {Array.<Node>} children
     */
    appendChildren(children: Array<Node>): void;
    /**
     * @returns {Node}
     */
    lastChild(): Node;
    /**
     * @param {string} text
     */
    addText(text: string): void;
}
export type Heading = {
    level: number;
    id: string;
    hashed: string;
    count: number;
    text: string;
};
/**
 * HTML Attribute にエンコードされる値
 * 内部の値を保つために `_` で始まる値は
 * エンコード時に無視する (TODO: これ消したい)
 */
export type Attr = Map<string, string | null>;
export type NodeParam = {
    name: string;
    type: string;
    parent?: Node;
    children?: Array<Node>;
    level?: number;
    text?: string;
    attr?: Attr;
    aligns?: Array<"center" | "left" | "right">;
};
export type EncodeOption = {
    indent?: number;
};
export type Plugin = {
    enter: (arg0: Node) => Node;
    leave: (arg0: Node) => Node;
};
