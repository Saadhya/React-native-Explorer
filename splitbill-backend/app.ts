import express from 'express';
import userRoutes from './routes/users';
import groupRoutes from './routes/groups';
import expenseRoutes from './routes/expenses';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/expenses', expenseRoutes);

app.listen(PORT, () => {
  console.log(`Splitwise backend running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Splitwise Backend is running!');
});
