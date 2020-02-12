import mongoose from 'mongoose';

afterEach(async () => {
  mongoose.connection.db && (await mongoose.connection.db.dropDatabase());
});
