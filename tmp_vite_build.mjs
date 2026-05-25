import { build } from 'vite';
import { writeFileSync } from 'fs';

async function run() {
  try {
    await build({ configFile: 'vite.config.js' });
    writeFileSync('build.status', '0');
  } catch (error) {
    const message = error && error.stack ? error.stack : String(error);
    writeFileSync('build.log', message);
    writeFileSync('build.status', '1');
    process.exit(1);
  }
}

run();
