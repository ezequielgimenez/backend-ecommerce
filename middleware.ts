import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST", "OPTIONS"],
  origin: "http://localhost:3000", // Cambia esto según tu origen
});

// Función para ejecutar el middleware
const runMiddleware = (req, res) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Middleware que se ejecuta para cada solicitud
export async function middleware(req, res) {
  await runMiddleware(req, res);
  return res; // Asegúrate de retornar la respuesta
}
