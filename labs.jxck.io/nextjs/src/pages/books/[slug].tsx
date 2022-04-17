import Head from "next/head";
import { GetServerSideProps } from "next";
import Layout from "../../components/layout";
import { Book, getBook } from "../../lib/books";
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
      <header>
        <h1>{book.title}</h1>
      </header>
      <main>
        <h2>Pages</h2>
        <ul>
          {book.pages.map((page) => (
            <li key={page.file}>
              <Link href={`/books/${book.slug}/${page.file}`}>{page.file}</Link>
              : {page.title}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const book = await getBook(slug);
  return {
    props: {
      book,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const books = await getBooks();
//   const paths = books.map(({ slug }) => {
//     return {
//       params: { slug },
//     };
//   });
//   return {
//     paths,
//     fallback: true,
//   };
// };

export default Post;
