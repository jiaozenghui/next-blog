import Head from 'next/head';

interface HeadProps {
  title: string;
  desc: string;
}
export default function ArticleHead({
  title,
  desc
}: HeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>
  );
}
