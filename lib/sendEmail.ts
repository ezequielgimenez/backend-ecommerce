import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // o el servicio que estés usando
  auth: {
    user: "ezequielezequiel9@gmail.com",
    pass: "yrax mnig bkxz hjwm",
  },
});

// Función para validar email
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export async function sendEmail(email, code) {
  if (!email || !isValidEmail(email)) {
    return {
      success: false,
      message: "Debe proporcionar un email válido",
    };
  } else {
    return await transporter.sendMail({
      to: email,
      subject: "Tu código para ingresar",
      text: `Tu código para ingresar es: ${code}`,
    });
  }
}

export async function sendEmailPayment(email, title, price, img) {
  if (!email || !isValidEmail(email)) {
    return {
      success: false,
      message: "Debe proporcionar un email válido",
    };
  } else {
    return await transporter.sendMail({
      to: email,
      subject: "Tu pago se realizó correctamente, compraste:",
      html: `
      <head>
        <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }
            tr {
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 500px;
              background-color: #272727;
              padding: 20px;
              color: white;
            }
            .container p {
              text-align: center;
              font-size: 25px;
              margin: 10px 0;
            }
            .header-row {
              background-color: #bb6327; /* Color de la fila */
              height: 35px; /* Altura de la fila */
              width: 400px;
            }
            .my-content {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            img {
              display: block;
              margin: 0 auto;
              max-width: 100%;
              height: 200px;
            }
            table {
              width: 400px;
              border-collapse: collapse;
            }
     </style>
     <body>
        <table>
          <!-- Fila de encabezado -->
          <tr class="header-row">
            <td></td>
          </tr>
          <!-- Contenedor principal -->
          <tr class="my-content">
            <td>
              <div class="container">
                <p>Compraste ${title}</p>
                <p>$ ${price}</p>
                <img
                  src="${img}"
                  alt="Producto"
                />
              </div>
            </td>
          </tr>

          <tr class="header-row">
            <td></td>
          </tr>
        </table>
      </body>
   </head>
      `,
    });
  }
}
