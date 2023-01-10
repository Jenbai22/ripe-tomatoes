import { useEffect, useState } from "react";

function Home() {
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

export default Home;
