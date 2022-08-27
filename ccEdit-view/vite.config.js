import { defineConfig } from "vite";
// import basicSsl from "@vitejs/plugin-basic-ssl";

// import fs from "fs";

export default defineConfig({
  server: {
    port: 3002,
    // key: fs.readFileSync("./.cert/key.pem"),
    // cert: fs.readFileSync("./.cert/cert.pem"),
  },
  // plugins: [basicSsl()],
});
