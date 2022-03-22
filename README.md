# Flood Disney API
API to explore the world of Disney, which allows knowing and modifying the characters that compose it and understand in which films they participated.
Alkemy's Backend Challenge by Patricio Tomás Flood.

Full Api Docs: https://flood-disney-api.herokuapp.com/api-docs

## Endpoints

Base Url: https://flood-disney-api.herokuapp.com/
### Open endpoints

**Auth**
<ul>
  <li><b>POST</b> <code>/register</code> -> Register a new User
  <li><b>POST</b> <code>/login</code> -> Login with Email and Password
</ul>

### Endpoints that require Authentication

**Characters**
<ul>
  <li><b>GET</b> <code>/characters</code> -> Get all Characters or Filter Characters
  <li><b>POST</b> <code>/characters</code> -> Create a new Character
  <li><b>GET</b> <code>/characters/{characterId}</code> -> Get Character By ID
  <li><b>PUT</b> <code>/characters/{characterId}</code> -> Update Character by ID
  <li><b>DELETE</b> <code>/characters/{characterId}</code> -> Delete Character by ID
  <li><b>POST</b> <code>/characters/{characterId}/uploadImage</code> -> Upload Image to Character by ID
</ul>

**Movies**
<ul>
  <li><b>GET</b> <code>/movies</code> -> Get all Movies or Filter movies
  <li><b>POST</b> <code>/movies</code> -> Create a new Movie
  <li><b>GET</b> <code>/movies/{characterId}</code> -> Get Movie By ID
  <li><b>PUT</b> <code>/movies/{movieId}</code> -> Update Movie by ID
  <li><b>DELETE</b> <code>/movies/{movieId}</code> -> Delete Movie by ID
  <li><b>POST</b> <code>/movies/{movieId}/uploadImage</code> -> Upload Image to Movie by ID
  <li><b>POST</b> <code>/movies/{movieId}/asociateCharacter</code> -> Asociate Character to Movie by ID
  <li><b>DELETE</b> <code>/movies/{movieId}/asociateCharacter/{characterId}</code> -> Desasociate Character to Movie by Movie ID and Character ID
</ul>

**Genres**
<ul>
  <li><b>GET</b> <code>/genres</code> -> Get all Genres or Filter Genres
  <li><b>POST</b> <code>/genres</code> -> Create a new Genre
  <li><b>GET</b> <code>/genres/{genreId}</code> -> Get Genre By ID
  <li><b>PUT</b> <code>/genres/{genreId}</code> -> Update Genre by ID
  <li><b>DELETE</b> <code>/genres/{genreId}</code> -> Delete Genre by ID
  <li><b>POST</b> <code>/genres/{genreId}/uploadImage</code> -> Upload Image to Genre by ID
</ul>

## Environment Variables (.env)

<ul>
  <li><code>PORT</code> (Server Port)
  <li><code>DATABASE_URL, TEST_DATABASE_URL</code> (PostgreSQL DataBase URLs for production, and testing)
  <li><code>SECRET</code> (Secret String - JsonWebToken)
  <li><code>SENDGRID_API_KEY, SENDGRID_EMAIL_FROM</code> (Sendgrid Credentials - Email Service)
  <li><code>AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY</code> (AWS S3 credentials - Upload Images)
  <li><code>TEST_USER_EMAIL, TEST_USER_PASSWORD</code> (Test User registered in Test Database)
<ul>

