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
      body: '{ "messaging_product": "whatsapp", "to": "56992003400", "type": "template", "template": { "name": "order_request", "language": { "code": "ES" } } }',
    }
  );
  if (response.ok) {
    return;
  }
  console.log("ERROR");
};
