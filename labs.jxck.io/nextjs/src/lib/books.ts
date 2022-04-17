import path from "path";
import { readdir, readFile } from "fs/promises";
import { encode, decode, traverse, Node } from "@jxck/markdown";

export const booksDir = path.join(process.cwd(), "books");

export type Book = {
  slug: string;
  title: string;
  pages: Page[];
};

export type Page = {
  title: string;
  file: string;
};

async function getBookTitle(slug: string) {
  const config_path = `${booksDir}/${slug}/config.yaml`;
  const config = await readFile(config_path, { encoding: "utf-8" });
  const groups = config.match(/title: "(?<title>.*)"/)?.groups;
  const title = groups?.title as string;
  return title;
}

async function getPageTitle(slug: string, file: string) {
  const body = await readFile(`${booksDir}/${slug}/${file}`, {
    encoding: "utf-8",
  });
  const groups = body.match(/title: "(?<title>.*)"/)?.groups;
  const title = groups?.title as string;
  return title;
}

export async function getBooks(): Promise<Book[]> {
  const dirs = await readdir(booksDir, { withFileTypes: true });
  const slugs = dirs.filter((dir) => dir.isDirectory()).map(({ name }) => name);

  const books = await Promise.all(
    slugs.map(async (slug) => {
      return await getBook(slug);
    })
  );
  return books;
}

export async function getBook(slug: string): Promise<Book> {
  const title = await getBookTitle(slug);

  const dirs = await readdir(`${booksDir}/${slug}`, { withFileTypes: true });
  const files = dirs
    .filter((dir) => dir.isFile())
    .map(({ name }) => name)
    .filter((name) => name.endsWith(".md"))
    .sort((a, b) => {
      return Number(a.split(".")[0]) - Number(b.split(".")[0]);
    });

  const pages = await Promise.all(
    files.map(async (file) => {
      const title = await getPageTitle(slug, file);
      return { file, title };
    })
  );

  return { title, slug, pages };
}

export async function getPage(slug: string, file: string) {
  const book = await getBook(slug);
  const page = book.pages.filter((page) => page.file === file).pop() as Page;
  return page;
}

export async function getAllPaths() {
  const books = await getBooks();
  return books
    .map(({ slug, pages }) => {
      return pages.map(({ file }) => {
        const params = { slug, file };
        return { params };
      });
    })
    .flat();
}

export async function getHTML(slug: string, file: string) {
  const text = await readFile(`${booksDir}/${slug}/${file}`, {
    encoding: "utf-8",
  });
  const groups = text.match(/^---\n(?<frontmatter>([\n\r]|.)*?)\n---\n(?<markdown>([\n\r]|.)*)$/m)?.groups
  const { frontmatter, markdown } = groups || {}

  const ast = decode(markdown);

  const root = traverse(ast, {
    enter: (node) => node,
    leave: (node) => {
      if (node.name === "details") {
        node.attr.set(`open`, null)
        const section = node.children.at(1) as Node
        section.attr.set(`class`, `details-content`)
      }
      return node;
    },
  });

  const { html } = encode(root);
  return {frontmatter, html};
}
