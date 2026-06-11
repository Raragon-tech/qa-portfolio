import fs from 'fs';

//this function reads the .env file and stores it for use in tests
function updateEnvVariable(key, value) {
  const envPath = '.env';

  let envContent = fs.readFileSync(envPath, 'utf-8');

  const regex = new RegExp(`^${key}=.*`, 'm');

  if (envContent.match(regex)) {
    envContent = envContent.replace(regex, `${key}=${value}`);
  } else {
    envContent += `\n${key}=${value}`;
  }

  fs.writeFileSync(envPath, envContent);
}
