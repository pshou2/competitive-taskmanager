import app from './app';
import { connectToDB } from './config/mongoose';

const port = process.env.PORT || 5000;

connectToDB();
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});