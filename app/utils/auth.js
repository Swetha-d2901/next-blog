export function verifyAdmin(password) {
  const ADMIN_PASS = 'admin123';
  return password === ADMIN_PASS;
}
