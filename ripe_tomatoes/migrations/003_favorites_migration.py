steps = [

    [
        """
        CREATE TABLE favorites (
            id SERIAL PRIMARY KEY NOT NULL,
            imdb TEXT NOT NULL,
            username VARCHAR(50) NOT NULL
        );
        """,
        """
        DROP TABLE favorites;
        """
    ]

]
