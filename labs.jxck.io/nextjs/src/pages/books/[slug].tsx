import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/layout";
import { getBooks, Book, getBook } from "../../lib/books";
import Link from "next/link";

type Props = {
  book: Book;
};

const Post = ({ book }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{book.title}</title>
      </Head>
      <main>
        <h1>{book.title}</h1>
        <ul>
          {book.pages.map((page) => (
            <li key={page.file}>
              <Link href={`/books/${book.slug}/${page.file}`}>
                {page.title}
              </Link>
              : {page.file}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const books = await getBooks();
  const paths = books.map(({ slug }) => {
    return {
      params: { slug },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const book = await getBook(slug);
  return {
    props: {
      book,
    },
  };
};

export default Post;
