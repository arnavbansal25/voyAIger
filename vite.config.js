import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { generateGeminiContent } from "./server/gemini-generate.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "gemini-api-dev-proxy",
        configureServer(server) {
          server.middlewares.use("/api/gemini/generate", async (req, res) => {
            if (req.method === "OPTIONS") {
              res.statusCode = 204;
              res.end();
              return;
            }

            if (req.method !== "POST") {
              res.statusCode = 405;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Method not allowed" }));
              return;
            }

            const chunks = [];
            for await (const chunk of req) {
              chunks.push(chunk);
            }

            let body;
            try {
              body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
            } catch {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Invalid JSON body" }));
              return;
            }

            try {
              const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
              const text = await generateGeminiContent(body.prompt, apiKey);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ text }));
            } catch (error) {
              const status =
                error.status && error.status >= 400 ? error.status : 500;
              res.statusCode = status;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  error: error.message || "Generation failed",
                })
              );
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
