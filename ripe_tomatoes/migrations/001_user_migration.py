steps = [

    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY UNIQUE NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            email VARCHAR(300) UNIQUE NOT NULL,
            hashed_password VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE users;
        """
    ]

]
