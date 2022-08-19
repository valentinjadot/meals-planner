
const whatsAppToken = process.env.REACT_APP_API_KEY

export const postWhatsapp = async (data) => {

    const response = await fetch(
      "https://rent-bike-go.herokuapp.com/upload_code_to_s3",
      {
        method: "POST",
        headers: {
          accept: "application/json"},
        body: form,
      }
    );
    const postResponse = await response.json();
    return postResponse;
  };