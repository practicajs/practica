const isPortReachable = require("is-port-reachable");
const path = require("path");
const dockerCompose = require("docker-compose");
const { execSync } = require("child_process");

module.exports = async () => {
  console.time("global-setup");

  {{#unless emitBestPractices}}
  // ️️️✅ Best Practice: Speed up during development, if already live then do nothing
  {{/unless}}
  const isDBReachable = await isPortReachable(54310);
  if (!isDBReachable) {
    {{#unless emitBestPractices}}
    // ️️️✅ Best Practice: Start the infrastructure within a test hook - No failures occur because the DB is down
    {{/unless}}
    await dockerCompose.upAll({
      cwd: path.join(__dirname),
      log: true,
    });

    await dockerCompose.exec(
      "database",
      ["sh", "-c", "until pg_isready ; do sleep 1; done"],
      {
        cwd: path.join(__dirname),
      }
    );

    {{#unless emitBestPractices}}
    // ️️️✅ Best Practice: Use npm script for data seeding and migrations
    {{/unless}}
    execSync("npm run db:migrate");
    {{#unless emitBestPractices}}
    // ✅ Best Practice: Seed only metadata and not test record, read "Dealing with data" section for further information
    {{/unless}}
    execSync("npm run db:seed");
  }

  // 👍🏼 We're ready
  console.timeEnd("global-setup");
};
