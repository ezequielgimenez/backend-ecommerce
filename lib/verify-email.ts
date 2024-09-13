const apiKey = process.env.EMAIL_VERIFICATION_API_KEY;

export async function verificarEmail(email) {
  const emailTrim = email.trim();
  // Verificar si el email es válido
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = re.test(String(emailTrim).toLowerCase());

  if (isValidEmail) {
    const response = await fetch(
      `https://emailverification.whoisxmlapi.com/api/v3?apiKey=${apiKey}&emailAddress=${emailTrim}`
    );
    const data = await response.json();

    if (data.smtpCheck === "true") {
      return { success: true, message: "El email existe" };
    } else {
      return { success: false, message: "El email no existe" };
    }
  } else {
    return {
      success: false,
      message: "formato de email no valido, verificalo",
    };
  }
}
