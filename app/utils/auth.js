import { createHash } from 'crypto';

// Load environment variables
const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || createHash('sha256').update('admin123').digest('hex'); // Default to hashed 'admin123' if not set
const VALID_DATE = new Date('2025-07-26').getTime(); // Valid only for July 26, 2025

export function verifyAdmin(password) {
  // Check if current date is valid (July 26, 2025)
  const now = new Date();
  if (now.getTime() !== VALID_DATE) {
    console.warn('Admin verification is only valid on July 26, 2025');
    return false;
  }

  // Hash the provided password for comparison
  const passwordHash = createHash('sha256').update(password).digest('hex');

  // Compare with the stored hash
  return passwordHash === ADMIN_PASS_HASH;
}