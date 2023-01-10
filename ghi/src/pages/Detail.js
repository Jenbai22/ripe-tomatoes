import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [example, setExample] = useState(true);
  let { imdb } = useParams();

  useEffect(() => {
    async function getData() {
      setExample(false);
      console.log(imdb);
    }
    getData();
  }, []);

  return (
    <>
      <div>detail page || imdb is "{imdb}"</div>
    </>
  );
}

export default Detail;
