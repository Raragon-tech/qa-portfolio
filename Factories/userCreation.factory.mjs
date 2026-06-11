// Generates randomized user data for test automation
const ROLES = [
  'Manager',
  'Analyst',
  'Coordinator',
  'Specialist',
  'Director',
];

const STATES = [
  { state: 'AZ', cities: ['Phoenix', 'Tucson', 'Mesa'] },
  { state: 'TX', cities: ['Austin', 'Dallas', 'Houston'] },
  { state: 'CA', cities: ['San Diego', 'Sacramento', 'Fresno'] },
];


function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomRole() {
  return getRandomItem(ROLES);
}

export function getRandomStateAndCity() {
  const stateEntry = getRandomItem(STATES);
  return {
    state: stateEntry.state,
    city: getRandomItem(stateEntry.cities),
  };
}

export function getRandomPhoneNumber() {
  return `555${Math.floor(1000000 + Math.random() * 9000000)}`;
}

export function createUser(overrides = {}) {
  const newFirstName = getRandomItem([
    'Alex', 'Jordan', 'Tyler', 'Casey', 'Morgan',
    'Riley', 'Avery', 'Cameron', 'Quinn', 'Parker',
  ]);

  const newLastName = getRandomItem([
    'Johnson', 'Martinez', 'Nguyen', 'Patel', 'Garcia',
    'Brown', 'Kim', 'Lopez', 'Williams', 'Hernandez',
  ]);

  const { state, city } = getRandomStateAndCity();
  const newPhone = getRandomPhoneNumber();
  const suffix = Math.floor(100000 + Math.random() * 900000);
  const newUsername = `edu${suffix}`;

  return {
    newFirstName,
    newLastName,
    newUsername,
    newEmail: `${newUsername}@mailinator.com`,
    newPassword: process.env.PASSWORD || 'Password123!',
    role: getRandomRole(),
    newPhone,
    state,
    city,
    ...overrides,
  };
}