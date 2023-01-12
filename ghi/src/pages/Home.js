import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch(`${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/searchname/spiderman`)
      if (response.ok) {
        const data = await response.json()
        setMovies(data.Search)
      }
    }
    getData();
  }, []);

  const handleFormChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_RIPE_TOMATOES_API_HOST}/searchname/${search}`);
    if (response.ok) {
      const data = await response.json();
      setMovies(data.Search);
    }
  }



  return (
    <main style={{backgroundColor: "rgb(61,72,73)"}}>
      <form  onSubmit={handleSearch}>
        <div style={{width: '100%', textAlign:'center'}}>
          <input className="my-4" style={{backgroundColor:"grey"}} onChange={handleFormChange} name="search" type="text" />
          <button style={{backgroundColor:"grey"}} type="submit">Search</button>
        </div>
      </form>
      <Row md={4}>
        {movies.map(movie =>
          <Col key={movie.imdbID}>
            <div className="m-3">
              <Card border='danger'>
                <Link to={`/${movie.imdbID}`}>
                  <Card.Img variant="top" src={movie.Poster !== 'N/A' ? movie.Poster : 'https://i2.cdn.turner.com/money/galleries/2010/news/1001/gallery.americas_biggest_ripoffs/images/movie_popcorn.ju.jpg'} alt={movie.Title}/>
                </Link>
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">{movie.Year}</small>
                </Card.Footer>
              </Card>
            </div>
          </Col>
        )}
      </Row>
    </main>
  );
}
