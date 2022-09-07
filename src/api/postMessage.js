export const postMessage = async (data) => {
  const whatsAppToken = process.env.REACT_APP_WHATSAPP_TOKEN;
  const whatsAppNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
  const response = await fetch(
    "https://graph.facebook.com/v13.0/105754398921732/messages",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${whatsAppToken}`,
        "Content-Type": "application/json",
      },
      body: `{ "messaging_product": "whatsapp", "to": "${whatsAppNumber}", "type": "template", "template": { "name": "order_summary", "language": { "code": "ES" },"components": [{"type": "body", "parameters": [{"type": "text", "text": "${data[0]}"},{"type": "text", "text": "${data[1]}"},{"type": "text", "text": "${data[2]}"},{"type": "text", "text": "${data[3]}"},{"type": "text", "text": "${data[4]}"},{"type": "text", "text": "${data[5]}"},{"type": "text", "text": "${data[6]}"},{"type": "text", "text": "${data[7]}"}]}] } }`,
    }
  );
  if (response.ok) {
    console.log("Mensaje enviado con éxito");
    return true;
  }
  console.log("El mensaje no fue enviado");
  console.log("Respuesta: ",response);
  console.log("Resumen de la orden");
  console.log(`
  ALMUERZO 
  - Almuerzos normales: ${data[0]}
  - Almuerzos veganos: ${data[1]}
  - Para llevar normales: ${data[2]}
  - Para llevar veganos: ${data[3]}
  
  CENA 
  - Cenas normales: ${data[4]}
  - Cenas veganas: ${data[5]}
  - Para llevar normales: ${data[6]}
  - Para llevar veganos: ${data[7]}`);
  return false;
};
