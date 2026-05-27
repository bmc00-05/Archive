import type { Root, RootContent, Element } from "hast";

/**
 * H2를 경계로 형제 노드를 <section data-section data-slug=...> 로 묶는 rehype 플러그인.
 * H2 앞에 위치하는 내용(인트로)이 있으면 별도 intro 섹션으로 묶는다.
 *
 * 결과 구조 예:
 *   <section data-section data-intro>...intro...</section>
 *   <section data-section data-slug="problem"><h2>Problem</h2>...</section>
 *   <section data-section data-slug="solution"><h2>Solution</h2>...</section>
 */
export function rehypeSectionWrap() {
  return (tree: Root) => {
    const sections: Element[] = [];
    let current: Element | null = null;
    const intro: RootContent[] = [];

    const isH2 = (node: RootContent): node is Element =>
      node.type === "element" && node.tagName === "h2";

    for (const node of tree.children) {
      if (isH2(node)) {
        if (current) sections.push(current);
        const slug = (node.properties?.id as string | undefined) ?? undefined;
        current = {
          type: "element",
          tagName: "section",
          properties: {
            "data-section": "true",
            ...(slug ? { "data-slug": slug } : {}),
          },
          children: [node],
        };
      } else if (current) {
        // Element.children only allows ElementContent; cast is safe at runtime
        // because RootContent (Comment/Text/Element/Doctype/Raw) all render fine inside.
        current.children.push(node as unknown as Element["children"][number]);
      } else {
        intro.push(node);
      }
    }
    if (current) sections.push(current);

    const finalChildren: RootContent[] = [];
    if (intro.length > 0) {
      finalChildren.push({
        type: "element",
        tagName: "section",
        properties: { "data-section": "true", "data-intro": "true" },
        children: intro as unknown as Element["children"],
      });
    }
    finalChildren.push(...sections);

    tree.children = finalChildren;
  };
}
