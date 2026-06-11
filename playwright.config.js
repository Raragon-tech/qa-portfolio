
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: './.env' });

export default defineConfig({
  testDir: './Tests',

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.mjs/,
    },

    {
      name: 'auth-tests',
      testMatch: [
        'Profile/**/*.mjs',
        'Homepage/**/*.mjs',
      ],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth/existing-user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'no-auth-tests',
      testMatch: [
        'Login/**/*.mjs',
        'Registration/**/*.mjs',
        'AccountCreation/**/*.mjs'
      ],
      testIgnore: [/.*\.setup\.mjs/],
      use: {
        ...devices['Desktop Chrome'],
        storageState: undefined,
      },
    },

    {
  name: 'new-user-auth-tests',
  testMatch: [
    'AccountCreation/**/*.mjs'
  ],
  use: {
    ...devices['Desktop Chrome'],
    storageState: 'auth/newUser.json',
  },
}
  ],
});


