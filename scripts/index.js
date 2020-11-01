const { spawn } = require("child_process");
const path = require('path');

const emulator = spawn(path.join(process.env.ANDROID_SDK_ROOT, "tools/emulator"), ['-list-avds'])

emulator.stdout.on("data", data => {
  console.log(`stdout: ${data.toString()}`);
});


emulator.stderr.on("data", data => {
  console.log(`stderr: ${data}`);
});

emulator.on('error', (error) => {
  console.log(`error: ${error.message}`);
});

emulator.on("close", code => {
  console.log(`child process exited with code ${code}`);
});