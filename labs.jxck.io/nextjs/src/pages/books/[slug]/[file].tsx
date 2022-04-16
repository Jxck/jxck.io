import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../../components/layout";
import { getAllPaths, getHTML, getPage, Page } from "../../../lib/books";
import Link from "next/link";

type Props = {
  page: Page;
  body: string;
};

const Post = ({ page, body }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
      </Head>
      <main>
        <h1>{page.title}</h1>
        <article>{body}</article>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPaths();
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const file = params?.file as string;
  const page = await getPage(slug, file);
  const body = await getHTML(slug, file);
  return {
    props: {
      page,
      body,
    },
  };
};

export default Post;
