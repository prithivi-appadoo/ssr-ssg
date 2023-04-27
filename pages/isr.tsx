type Props = { data: Post[] };

export default function Isr(props: Props) {
  return (
    <>
      <h1>SSR</h1>
      <ul>
        {props.data.map((d: Post) => (
          <li key={d.id}>
            <a>{d.author.username}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3001/posts`);
  const data = await res.json();
  const props: Props = { data };

  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 20, // In seconds
  };
}
