import { serve, build, file } from "bun";
import { renderToReadableStream } from "react-dom/server";
import index from "./index.html";
import App from "./app";

await build({
  entrypoints: [
    "./src/main.tsx",
    "./src/styles.css",
  ],
  outdir: "./public",
});

const server = serve({
  routes: {
    "/": async () =>
      new Response(
        await renderToReadableStream(<Page />, {
          bootstrapModules: ["/main.js"],
        })
      ),
  },
  fetch(req) {
  	const pathname = new URL(req.url).pathname;
    return new Response(file(`./public${pathname}`));
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

function Page() {
  return (
    <html>
      <head>
        <title>ToDo List</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div id="root">
          <App />
        </div>
      </body>
    </html>
  );
}

console.log(`Server running at ${server.url}`);
