const { spawn, exec } = require("child_process");
const path = require("path");
const { stdout } = require("process");
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


if (!process.env.ANDROID_SDK_ROOT) {
  throw new Error("Please set ANDROID_SDK_ROOT at your env")
}

const listEmulator = spawn(
  path.join("emulator"),
  ["-list-avds"]
);

let emulators = []

listEmulator.stdout.on("data", (data) => {
  emulators.push(data.toString().trim())
});

listEmulator.on("close", () => {
  for (let i = 0; i < emulators.length; i++) {
    console.log(`${i}: ${emulators[i]}\n`)
  }
  readResponse()
})

function readResponse() {
  rl.question("Which emulator you would like to choose? ", (answer) => {
    exec(`emulator @${emulators[answer]}`, (stdout, error) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      console.log(stdout)
    })
    rl.close()
  })
}
