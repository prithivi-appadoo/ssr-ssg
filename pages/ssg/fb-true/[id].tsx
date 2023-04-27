import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

type Props = { data: Post };

export default function Ssg(props: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading......</h1>;
  }

  return (
    <>
      <h1>SSG with fallback: true</h1>
      <p>{props.data.author.username}</p>
      <p>{props.data.id}</p>
      <p>{props.data.caption}</p>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    // Fetch data from external API
    const res = await fetch(
      `http://localhost:3001/posts/${context.params?.id}`
    );
    const data = await res.json();
    const props: Props = { data };
    // Pass data to the page via props
    return { props };
  } catch {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`http://localhost:3001/posts/ids`);
  const data = await res.json();
  const paths = data.map((id: string) => ({ params: { id } }));
  return {
    paths,
    fallback: true,
  };
};
