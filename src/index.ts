import { User } from './models/User';

const user = new User({ id: 1 });

user.set({ name: 'NEW NAME', age: 50 });
user.save();

const newUser = new User({ name: 'NEW USER', age: 33 });
newUser.save();
