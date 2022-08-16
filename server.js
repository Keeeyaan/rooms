import app from './app.js';
import connectDB from './config/database.js';

//connect with database
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at port: ${process.env.PORT}`);
});
