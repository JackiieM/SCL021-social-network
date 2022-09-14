/* eslint-disable */
import {newUser} from '../src/firebase.js';
const USERS = [
  {
    email: 'test@elcorreo.it',
    password: '123456',
  },
];

global.firebase = {
  auth: () => ({
    createUserWithEmailAndPassword: (email, password) => {
      const user = USERS.find((user) => user.email === email);
      if (user) {
        if (user.password === password) {
          return Promise.resolve({ user });
        } if (user.password.length < 6) {
          return Promise.reject({ code: 'auth/weak-password' });
        }
      } else {
        return Promise.reject({ code: 'auth/missing-email' });
      }
    },
  }),
};
describe('newUser', () => {
  it('Esperamos un error si la contraseña tiene menos de 6 caracteres', () => newUser('testing@google.com', 'ab12').catch((error) => {
    expect(error).toBe('auth/weak-password');
  }));
});
/* eslint-enable */
