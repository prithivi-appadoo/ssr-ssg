type Props = { data: Post[] };

export default function Ssg(props: Props) {
  return (
    <>
      <h1>SSG</h1>
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
  // Fetch data from external API
  const res = await fetch(`http://localhost:3001/posts`);
  const data = await res.json();
  const props: Props = { data };
  // Pass data to the page via props
  return { props };
}
