export const postMessage = async (data) => {
  const whatsAppToken = process.env.REACT_APP_WHATSAPP_TOKEN;
  const response = await fetch(
    "https://graph.facebook.com/v13.0/105754398921732/messages",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${whatsAppToken}`,
        "Content-Type": "application/json",
      },
      body: `{ "messaging_product": "whatsapp", "to": "${process.env.REACT_APP_WHATSAPP_NUMBER}", "type": "template", "template": { "name": "order_summary", "language": { "code": "ES" },"components": [{"type": "body", "parameters": [{"type": "text", "text": "${data[0]}"},{"type": "text", "text": "${data[1]}"},{"type": "text", "text": "${data[2]}"},{"type": "text", "text": "${data[3]}"},{"type": "text", "text": "${data[4]}"},{"type": "text", "text": "${data[5]}"},{"type": "text", "text": "${data[6]}"},{"type": "text", "text": "${data[7]}"}]}] } }`,
    }
  );
  if (response.ok) {
    return true;
  }
  return false;
};
