import { serve } from '@hono/node-server';
import { Hono } from 'hono';
const api_url = process.env.TMDB_API_URL;
const api_token = process.env.TMDB_API_TOKEN;


const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.get<'/top-rated'>('/top-rated', async (c) => {
  const page = c.req.query('page') || 1;

  const result = await (await fetch(`${api_url}/movie/top_rated?language=en-US&page=${page}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${api_token}`
    }
  })).json();

  return c.json(result);
});

const port = 3000;

console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
});
