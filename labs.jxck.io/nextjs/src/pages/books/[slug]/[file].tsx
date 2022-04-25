import Head from "next/head";
import { GetServerSideProps } from "next";
import Layout from "../../../components/layout";
import { getHTML, getPage, Page, getCommitInfo } from "../../../lib/books";
import Link from "next/link";

type Props = {
  slug: string;
  page: Page;
  frontmatter: string,
  html: string;
  date: string;
  time: string;
  zone: string;
  hash: string;
  file: string;
};

const Post = ({ slug, page, frontmatter, html, date, time, hash, file }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
      </Head>
      <header>
        <Link href={`/books/${slug}`}>{slug}</Link> / {file} ({date} {time} #{hash})
        <pre>{frontmatter}</pre>
      </header>
      <main className="znc" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const file = params?.file as string;
  const page = await getPage(slug, file);
  const {frontmatter, html} = await getHTML(slug, file);
  const {date, time, zone, hash} = await getCommitInfo();
  return {
    props: {
      slug,
      page,
      frontmatter,
      html,
      date,
      time,
      zone,
      hash,
      file
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
