/* Codigo copiado de GataBot-MD */

import { sticker } from '../lib/sticker.js';
import axios from 'axios';
const handler = async (m, {conn, args, usedPrefix, command}) => {
let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else throw "*[❗️] Uso incorrecto del comando, agregue un texto*";
   if (!text) return m.reply('*[❗️] Uso incorrecto del comando, agregue un texto*');
   if (text.length > 30) return m.reply('*[❗️] El texto no puede tener mas de 30 caracteres*');
  
    const pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/a2ae6cbfa40f6eeea0cf1.jpg');
    const obj = {"type": "quote", "format": "png", "backgroundColor": "#000000", "width": 512, "height": 768, "scale": 2, "messages": [{"entities": [], "avatar": true, "from": {"id": 1, "name": m.name, "photo": {"url": pp}}, "text": text, "replyMessage": {}}]};
    const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {headers: {'Content-Type': 'application/json'}});
    const buffer = Buffer.from(json.data.result.image, 'base64');
  
let stiker = await sticker(buffer, false, global.packname, global.author);
    if (stiker) return conn.sendFile(m.chat, stiker, 'error.webp', '', m);
}
handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(qc)$/i;
export default handler;
