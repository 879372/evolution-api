const fs = require('node:fs');

const target = process.argv[2];

if (!target) {
  throw new Error('Usage: node patch-message-logging.cjs <compiled-entrypoint>');
}

const source = fs.readFileSync(target, 'utf8');
const noisyMessageLog = /console\.log\(([\w$]+)\),this\.sendDataWebhook\("messages\.upsert",\1\)/g;
const matches = [...source.matchAll(noisyMessageLog)];

if (matches.length !== 1) {
  throw new Error(
    `Expected exactly one inbound message payload log in ${target}, found ${matches.length}`,
  );
}

const patched = source.replace(
  noisyMessageLog,
  'this.sendDataWebhook("messages.upsert",$1)',
);

fs.writeFileSync(target, patched);
console.log(`Removed inbound message payload logging from ${target}`);
