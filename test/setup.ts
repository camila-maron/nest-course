// Import Node.js modules for file system and path operations
import { rm } from 'fs/promises';
import { join } from 'path';

// Global beforeEach hook to run before every test
// Removes the test.sqlite database file to ensure a clean state for each test
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});
