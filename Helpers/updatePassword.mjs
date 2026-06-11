
//This function generates a unique password
export function generatePassword() {
  const base = Math.random().toString(36).slice(-8);
  return `Pw!${base}1`;
}
