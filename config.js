/**
 * Create By Dika Ardnt.
 * Contact Me on wa.me/6288292024190
 * Follow https://github.com/DikaArdnt
 */

const fs = require("fs");
const chalk = require("chalk");

// Website Api
global.APIs = {
  zenz: "https://api.razan.my.id",
};

// Apikey Website Api
global.APIKeys = {
  "https://api.razan.my.id": "Razan123",
};

// Razan Apikey
global.apikey = {
  apikey: "Razan123",
};

// Other
global.owner = ["6285736800927"];
global.ownername = "Razan";
global.footer = "© Razan";
global.premium = ["6285736800927"];
global.packname = "Razanbot - MD";
global.author = "WhatsApp Bot";
global.sessionName = "razan";
global.prefa = ["", "!", ".", "🐦", "🐤", "🗿"];
global.sp = "あ";
global.mess = {
  success: "✓ Success",
  admin: "Fitur Khusus Admin Group!",
  botAdmin: "Bot Harus Menjadi Admin Terlebih Dahulu!",
  owner: "Fitur Khusus Owner Bot",
  group: "Fitur Digunakan Hanya Untuk Group!",
  private: "Fitur Digunakan Hanya Untuk Private Chat!",
  bot: "Fitur Khusus Pengguna Nomor Bot",
  wait: "Loading...",
  endLimit: "Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Jam 12",
};
global.limitawal = {
  premium: "Infinity",
  free: 100,
};
global.thumb = { url: "https://telegra.ph/file/3b03a2eecca3a9579987e.jpg" };
global.visoka = { url: "https://telegra.ph/file/15209657f9d4f59c7ca1e.mp4" };

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
