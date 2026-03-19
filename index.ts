import app from './src/app';
import { connectToDB } from './src/config/mongoose';

const port = process.env.PORT || 5000;

connectToDB();
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});