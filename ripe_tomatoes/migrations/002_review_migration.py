steps = [

    [
        """
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY NOT NULL,
            body VARCHAR(500) NOT NULL,
            imdb TEXT NOT NULL,
            posted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            username VARCHAR(50) NOT NULL
        );
        """,
        """
        DROP TABLE reviews;
        """
    ]

]
