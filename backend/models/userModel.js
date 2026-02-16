const users = [];
let nextId = 1;

export async function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

export async function createUser({ full_name, email, password_hash, role, subscription_type }) {
  const user = {
    user_id: nextId++,
    full_name,
    email,
    password_hash,
    role,
    subscription_type,
    created_at: new Date()
  };
  users.push(user);
  return user;
}
