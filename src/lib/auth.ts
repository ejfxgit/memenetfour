export async function login(username: string, password: string) {
  const ADMIN_USER = 'EJDAV';
  const ADMIN_PASS = '123456';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return {
      username: ADMIN_USER,
      role: 'admin',
    };
  }

  throw new Error('Invalid credentials');
}
