import { useEffect, useState } from "react";

export default function Home() {
  const [example, setExample] = useState(true);

  useEffect(() => {
    async function getData() {
      setExample(false);
    }
    getData();
  }, []);

  return (
    <>
      <div>home page</div>
    </>
  );
}
