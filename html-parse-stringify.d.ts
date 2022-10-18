declare module 'html-parse-stringify' {
  export interface TagNode {
    type: 'tag';
    name: string;
    voidElement: boolean;
    attrs: Record<string, string | undefined>;
    children: Node[];
  }

  export interface TextNode {
    type: 'text';
    content: string;
  }

  export interface ComponentNode {
    type: 'component';
    name: string;
    attrs: Record<string, string | undefined>;
    voidElement: boolean;
    children: [];
  }

  export type Node = TagNode | TextNode | ComponentNode;

  export interface ParseOptions {
    components: Record<string, boolean>;
  }

  namespace HtmlParseStringify {
    function parse(html: string, options?: ParseOptions): Node[];
    function stringify(doc: Node[]): string;
  }

  export default HtmlParseStringify;
}
