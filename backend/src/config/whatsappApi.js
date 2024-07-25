const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID= process.env.PHONE_NUMBER_ID;
const MP4_ENCODER_KEY= process.env.MP4_ENCODER_KEY;

module.exports ={
    developement :{
      verify_token: VERIFY_TOKEN,
      whatsapp_token: WHATSAPP_TOKEN,
      phone_number_id:PHONE_NUMBER_ID,
      mp4_encoder_key: MP4_ENCODER_KEY
    }
}