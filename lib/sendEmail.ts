import * as nodemailer from "nodemailer";
import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

export async function sendEmailCode(email, code) {
  try {
    const stmpEmail = new brevo.SendSmtpEmail();
    stmpEmail.subject = "Hola usuario de Modakelar";
    stmpEmail.to = [{ email: email, name: "Usuario de Modakelar" }];

    stmpEmail.htmlContent = `
      <html>
        <head>
        <style>
           @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
            body {
              font-family: "Poppins", sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 20px;
            }

            .container {
              background-color: #f2f2f2;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              text-align: center;
            }

            h1 {
              color: #333333;
            }

            .code {
              font-size: 24px;
              font-weight: 600;
              color: #ff6600;
            }

            .logo {
              margin-bottom: 20px;
            }
          </style>
        </head>
      <body>
          <div class="container">
            <!-- Logo o imagen -->
            <img src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1729558762/Ecommerce%20logo%20send%20email/levo3bzftblnc2icczlc.png" alt="Modakelar Logo" class="logo" width="150" />

            <!-- Contenido del correo -->
            <h1>Tu código para ingresar:</h1>
            <h3 class="code">${code}</h3>
          </div>
      </body>
  </html>
    `;
    stmpEmail.sender = {
      name: "Modakelar",
      email: "ezequielezequiel9@gmail.com",
    };
    await apiInstance.sendTransacEmail(stmpEmail);
  } catch (error) {
    return {
      success: false,
      message:
        "No se pudo enviar el correo. Por favor, inténtelo de nuevo más tarde." +
        error,
    };
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail", // o el servicio que estés usando
  auth: {
    user: "ezequielezequiel9@gmail.com",
    pass: process.env.MY_PASS as string,
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
      html: `
                <head>
        <style>
           @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap");
            body {
              font-family: "Poppins", sans-serif;
              background-color: #f0f0f0;
              margin: 0;
              padding: 20px;
            }

            .container {
              background-color: #f2f2f2;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              text-align: center;
            }

            h1 {
              color: #333333;
            }

            .code {
              font-size: 24px;
              font-weight: 600;
              color: #ff6600;
            }

            .logo {
              margin-bottom: 20px;
            }
          </style>
        </head>
      <body>
          <div class="container">
            <!-- Logo o imagen -->
            <img src="https://res.cloudinary.com/dkzmrfgus/image/upload/v1729558762/Ecommerce%20logo%20send%20email/levo3bzftblnc2icczlc.png" alt="Modakelar Logo" class="logo" width="150" />

            <!-- Contenido del correo -->
            <h1>Tu código para ingresar:</h1>
            <h3 class="code">${code}</h3>
          </div>
      </body>
      `,
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
