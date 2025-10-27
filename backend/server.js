import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Serve frontend build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// ✅ Catch-all for any non-API route
app.use((req, res, next) => {
  if (
    !req.path.startsWith("/api") &&
    !req.path.startsWith("/socket.io")
  ) {
    res.sendFile(path.join(frontendPath, "index.html"));
  } else {
    next();
  }
});


