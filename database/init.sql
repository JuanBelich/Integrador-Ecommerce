CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    user VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
);

ALTER TABLE usuarios ADD COLUMN gravatar VARCHAR(255)