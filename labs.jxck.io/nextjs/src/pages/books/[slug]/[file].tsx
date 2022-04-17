import Head from "next/head";
import { GetServerSideProps } from "next";
import Layout from "../../../components/layout";
import { getHTML, getPage, Page } from "../../../lib/books";
import Link from "next/link";

type Props = {
  slug: string;
  page: Page;
  body: string;
};

const Post = ({ slug, page, body }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
      </Head>
      <header>
        <Link href={`/books/${slug}`}>{slug}</Link>
      </header>
      <main className="znc" dangerouslySetInnerHTML={{ __html: body }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const file = params?.file as string;
  const page = await getPage(slug, file);
  const body = await getHTML(slug, file);
  return {
    props: {
      slug,
      page,
      body,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = await getAllPaths();
//   return {
//     paths,
//     fallback: true,
//   };
// };

export default Post;
