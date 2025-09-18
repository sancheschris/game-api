import { createApp } from "./app";

async function startServer() {
  const server = createApp();

  // Start the server
  server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
