import Head from "next/head";
import Layout, { TITLE } from "../components/layout";
import { getBooks, Book } from "../lib/books";
import Link from "next/link";
import { GetStaticProps } from "next";

type Props = {
  books: Book[];
};

const Index = ({ books }: Props) => {
  return (
    <Layout home>
      <Head>
        <title>zenn.jxck.io</title>
      </Head>
      <header>
        <h1>{TITLE}</h1>
      </header>
      <main>
        <h2>Books</h2>
        <ul>
          {books.map(({ slug, title }) => (
            <li key={slug}>
              <Link href={`/books/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const books: Book[] = await getBooks();
  return {
    props: {
      books,
    },
  };
};

export default Index;
