/**
 * RECODE BY RAZAN
 * This Script Recode From : https://github.com/AzzBott679/SC10
 */

require("./config");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const path = require("path");
const os = require("os");
const hx = require("hxz-api");
const xa = require("xfarr-api");
const { facebook, facebook2 } = require("./lib/scrapedl.js");
const moment = require("moment-timezone");
const { JSDOM } = require("jsdom");
const Jimp = require("jimp");
const speed = require("performance-now");
const { performance } = require("perf_hooks");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon();
const {
  smsg,
  formatp,
  tanggal,
  formatDate,
  getTime,
  isUrl,
  sleep,
  clockString,
  runtime,
  fetchJson,
  getBuffer,
  jsonformat,
  format,
  parseMention,
  getRandom,
} = require("./lib/myfunc");
global.prem = require("./lib/premium");

//Apikey
let _cmd = JSON.parse(fs.readFileSync("./database/command.json"));
let _cmdUser = JSON.parse(fs.readFileSync("./database/commandUser.json"));
let setting = JSON.parse(fs.readFileSync("./apikey.json"));

//limit
limitawal = "10";
botname = "Razanbot - Md";
wm = "*© Razanbot - MD*";

// read database
let tebaklagu = (db.data.game.tebaklagu = []);
let _family100 = (db.data.game.family100 = []);
let kuismath = (db.data.game.math = []);
let tebakgambar = (db.data.game.tebakgambar = []);
let tebakkata = (db.data.game.tebakkata = []);
let caklontong = (db.data.game.lontong = []);
let caklontong_desk = (db.data.game.lontong_desk = []);
let tebakkalimat = (db.data.game.kalimat = []);
let tebaklirik = (db.data.game.lirik = []);
let tebaktebakan = (db.data.game.tebakan = []);
let vote = (db.data.others.vote = []);

module.exports = razan = async (razan, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    var prefix = prefa
      ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body)
        ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0]
        : ""
      : prefa ?? global.prefix;
    const isCmd = body.startsWith(prefix);
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const arg = body.substring(body.indexOf(" ") + 1);
    const nyoutube = "© Razan";
    const pushname = m.pushName || "No Name";
    const from = m.chat;
    const tanggal = moment.tz("Asia/Jakarta").format("DD/MM/YY");
    const waktu = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    const botNumber = await razan.decodeJid(razan.user.id);
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const itsMe = m.sender == botNumber ? true : false;
    const text = (q = url = args.join(" "));
    const sender = m.sender;
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const isMedia = /image|video|sticker|audio/.test(mime);

    // Group
    const groupMetadata = m.isGroup
      ? await razan.groupMetadata(from).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup
      ? await participants.filter((v) => v.admin !== null).map((v) => v.id)
      : "";
    const groupOwner = m.isGroup ? groupMetadata.owner : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isPremium = isCreator || prem.checkPremiumUser(m.sender, premium);

    try {
      let isNumber = (x) => typeof x === "number" && !isNaN(x);
      let limitUser = isPremium
        ? global.limitawal.premium
        : global.limitawal.free;
      let user = global.db.data.users[m.sender];
      if (typeof user !== "object") global.db.data.users[m.sender] = {};
      if (user) {
        if (!isNumber(user.afkTime)) user.afkTime = -1;
        if (!("afkReason" in user)) user.afkReason = "";
        if (!isNumber(user.limit)) user.limit = limitUser;
      } else
        global.db.data.users[m.sender] = {
          afkTime: -1,
          afkReason: "",
          limit: limitUser,
        };

      let chats = global.db.data.chats[from];
      if (typeof chats !== "object") global.db.data.chats[from] = {};
      if (chats) {
        if (!("mute" in chats)) chats.mute = false;
        if (!("antilink" in chats)) chats.antilink = false;
      } else
        global.db.data.chats[from] = {
          mute: false,
          antilink: false,
        };

      let setting = global.db.data.settings[botNumber];
      if (typeof setting !== "object") global.db.data.settings[botNumber] = {};
      if (setting) {
        if (!isNumber(setting.status)) setting.status = 0;
        if (!("autobio" in setting)) setting.autobio = false;
        if (!("templateImage" in setting)) setting.templateImage = true;
        if (!("templateVideo" in setting)) setting.templateVideo = false;
        if (!("templateGif" in setting)) setting.templateGif = false;
        if (!("templateMsg" in setting)) setting.templateMsg = false;
      } else
        global.db.data.settings[botNumber] = {
          status: 0,
          autobio: false,
          templateImage: true,
          templateVideo: false,
          templateGif: false,
          templateMsg: false,
        };
    } catch (err) {
      console.error(err);
    }

    //itung mundor fax
    const hariRaya = new Date("6 1, 2022 00:00:00");
    const sekarang = new Date().getTime();
    const Selisih = hariRaya - sekarang;
    const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
    const jjam = Math.floor(
      (Selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mmmenit = Math.floor((Selisih % (1000 * 60 * 60)) / (1000 * 60));
    const ddetik = Math.floor((Selisih % (1000 * 60)) / 1000);
    const ultah = `${jhari}Hari ${jjam}Jam ${mmmenit}Menit ${ddetik}Detik`;

    async function hitungmundur(bulan, tanggal) {
      //By Fax Ngk Usah Di Ubah
      let from = new Date(`${bulan} ${tanggal}, 2022 00:00:00`).getTime();
      let now = Date.now();
      let distance = from - now;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      return (
        days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
      );
    }

    // Public & Self
    if (!razan.public) {
      if (!m.key.fromMe) return;
    }

    //sayying time
    const hours = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    if (hours < "23:59:00") {
      var sayyingTime = "Selamat Malam 🌃";
    }
    if (hours < "19:00:00") {
      var sayyingTime = "Selamat Malam 🌆";
    }
    if (hours < "17:00:00") {
      var sayyingTime = "Selamat Sore 🌅";
    }
    if (hours < "15:00:00") {
      var sayyingTime = "Selamat Siang 🏙";
    }
    if (hours < "10:00:00") {
      var sayyingTime = "Selamat Pagi 🌄";
    }
    if (hours < "05:00:00") {
      var sayyingTime = "Selamat Pagi 🌉";
    }
    if (hours < "03:00:00") {
      var sayyingTime = "Selamat Malam 🌌";
    }

    // Push Message To Console && Auto Read
    if (m.message) {
      razan.readMessages([m.key]);
      console.log(
        chalk.black(chalk.bgWhite("[ PESAN ]")),
        chalk.black(chalk.bgGreen(new Date())),
        chalk.black(chalk.bgBlue(budy || m.mtype)) +
          "\n" +
          chalk.magenta("=> Dari"),
        chalk.green(pushname),
        chalk.yellow(m.sender) + "\n" + chalk.blueBright("=> Di"),
        chalk.green(m.isGroup ? pushname : "Private Chat", from)
      );
    }

    const reSize = async (buffer, ukur1, ukur2) => {
      return new Promise(async (resolve, reject) => {
        var baper = await Jimp.read(buffer);
        var ab = await baper
          .resize(ukur1, ukur2)
          .getBufferAsync(Jimp.MIME_JPEG);
        resolve(ab);
      });
    };
    // write database every 1 minute0
    setInterval(() => {
      fs.writeFileSync(
        "./src/database.json",
        JSON.stringify(global.db, null, 2)
      );
    }, 60 * 1000);

    async function addCountCmd(nama, sender, _db) {
      addCountCmdUser(nama, sender, _cmdUser);
      var posi = null;
      Object.keys(_db).forEach((i) => {
        if (_db[i].nama === nama) {
          posi = i;
        }
      });
      if (posi === null) {
        _db.push({ nama: nama, count: 1 });
        fs.writeFileSync(
          "./database/command.json",
          JSON.stringify(_db, null, 2)
        );
      } else {
        _db[posi].count += 1;
        fs.writeFileSync(
          "./database/command.json",
          JSON.stringify(_db, null, 2)
        );
      }
    }

    async function addCountCmdUser(nama, sender, u) {
      var posi = null;
      var pos = null;
      Object.keys(u).forEach((i) => {
        if (u[i].jid === sender) {
          posi = i;
        }
      });
      if (posi === null) {
        u.push({ jid: sender, db: [{ nama: nama, count: 0 }] });
        fs.writeFileSync(
          "./database/commandUser.json",
          JSON.stringify(u, null, 2)
        );
        Object.keys(u).forEach((i) => {
          if (u[i].jid === sender) {
            posi = i;
          }
        });
      }
      if (posi !== null) {
        Object.keys(u[posi].db).forEach((i) => {
          if (u[posi].db[i].nama === nama) {
            pos = i;
          }
        });
        if (pos === null) {
          u[posi].db.push({ nama: nama, count: 1 });
          fs.writeFileSync(
            "./database/commandUser.json",
            JSON.stringify(u, null, 2)
          );
        } else {
          u[posi].db[pos].count += 1;
          fs.writeFileSync(
            "./database/commandUser.json",
            JSON.stringify(u, null, 2)
          );
        }
      }
    }

    async function getPosiCmdUser(sender, _db) {
      var posi = null;
      Object.keys(_db).forEach((i) => {
        if (_db[i].jid === sender) {
          posi = i;
        }
      });
      return posi;
    }

    // reset limit every 12 hours
    let cron = require("node-cron");
    cron.schedule(
      "00 12 * * *",
      () => {
        let user = Object.keys(global.db.data.users);
        let limitUser = isPremium
          ? global.limitawal.premium
          : global.limitawal.free;
        for (let jid of user) global.db.data.users[jid].limit = limitUser;
        console.log("Reseted Limit");
      },
      {
        scheduled: true,
        timezone: "Asia/Jakarta",
      }
    );

    // auto set bio
    if (db.data.settings[botNumber].autobio) {
      let setting = global.db.data.settings[botNumber];
      if (new Date() * 1 - setting.status > 1000) {
        let uptime = await runtime(process.uptime());
        await razan.setStatus(
          `${razan.user.name} | Runtime : ${runtime(uptime)}`
        );
        setting.status = new Date() * 1;
      }
    }

    const listmsg = (from, title, desc, list) => {
      // ngeread nya pake rowsId, jadi command nya ga keliatan
      let po = razan.prepareMessageFromContent(
        from,
        {
          listMessage: {
            title: title,
            description: desc,
            buttonText: "Pilih Disini",
            footerText: "RazanBot•MD",
            listType: "SINGLE_SELECT",
            sections: list,
            quoted: mek,
          },
        },
        {}
      );
      return razan.relayWAMessage(po, { waitForAck: true, quoted: mek });
    };

    // Anti Link
    if (db.data.chats[from].antilink) {
      if (budy.match(`chat.whatsapp.com`)) {
        m.reply(
          `「 ANTI LINK 」\n\nKamu terdeteksi mengirim link group, maaf kamu akan di kick !`
        );
        if (!isBotAdmins) return m.reply(`Ehh bot gak admin T_T`);
        let gclink =
          `https://chat.whatsapp.com/` + (await razan.groupInviteCode(from));
        let isLinkThisGc = new RegExp(gclink, "i");
        let isgclink = isLinkThisGc.test(m.text);
        if (isgclink)
          return m.reply(
            `Ehh maaf gak jadi, karena kamu ngirim link group ini`
          );
        if (isAdmins) return m.reply(`Ehh maaf kamu admin`);
        if (isCreator) return m.reply(`Ehh maaf kamu owner bot ku`);
        razan.groupParticipantsUpdate(from, [m.sender], "remove");
      }
    }

    // Mute Chat
    if (db.data.chats[from].mute && !isAdmins && !isCreator) {
      return;
    }

    // Respon Cmd with media
    if (
      isMedia &&
      m.msg.fileSha256 &&
      m.msg.fileSha256.toString("base64") in global.db.data.sticker
    ) {
      let hash = global.db.data.sticker[m.msg.fileSha256.toString("base64")];
      let { text, mentionedJid } = hash;
      let messages = await generateWAMessage(
        from,
        { text: text, mentions: mentionedJid },
        {
          userJid: razan.user.id,
          quoted: m.quoted && m.quoted.fakeObj,
        }
      );
      messages.key.fromMe = areJidsSameUser(m.sender, razan.user.id);
      messages.key.id = m.key.id;
      messages.pushName = m.pushName;
      if (m.isGroup) messages.participant = m.sender;
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: "append",
      };
      razan.ev.emit("messages.upsert", msg);
    }

    if ("family100" + from in _family100 && isCmd) {
      kuis = true;
      let room = _family100["family100" + from];
      let teks = budy.toLowerCase().replace(/[^\w\s\-]+/, "");
      let isSurender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
      if (!isSurender) {
        let index = room.jawaban.findIndex(
          (v) => v.toLowerCase().replace(/[^\w\s\-]+/, "") === teks
        );
        if (room.terjawab[index]) return !0;
        room.terjawab[index] = m.sender;
      }
      let isWin =
        room.terjawab.length === room.terjawab.filter((v) => v).length;
      let caption = `
Jawablah Pertanyaan Berikut :\n${room.soal}\n\n\nTerdapat ${
        room.jawaban.length
      } Jawaban ${
        room.jawaban.find((v) => v.includes(" "))
          ? `(beberapa Jawaban Terdapat Spasi)`
          : ""
      }
${isWin ? `Semua Jawaban Terjawab` : isSurender ? "Menyerah!" : ""}
${Array.from(room.jawaban, (jawaban, index) => {
  return isSurender || room.terjawab[index]
    ? `(${index + 1}) ${jawaban} ${
        room.terjawab[index] ? "@" + room.terjawab[index].split("@")[0] : ""
      }`.trim()
    : false;
})
  .filter((v) => v)
  .join("\n")}
${isSurender ? "" : `Perfect Player`}`.trim();
      razan
        .sendText(from, caption, m, {
          contextInfo: { mentionedJid: parseMention(caption) },
        })
        .then((mes) => {
          return (_family100["family100" + from].pesan = mesg);
        })
        .catch((_) => _);
      if (isWin || isSurender) delete _family100["family100" + from];
    }

    if (tebaklagu.hasOwnProperty(m.sender.split("@")[0]) && isCmd) {
      kuis = true;
      jawaban = tebaklagu[m.sender.split("@")[0]];
      if (budy.toLowerCase() == jawaban) {
        await razan.sendButtonText(
          from,
          [
            {
              buttonId: "tebak lagu",
              buttonText: { displayText: "Tebak Lagu" },
              type: 1,
            },
          ],
          `🎮 Tebak Lagu 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`,
          razan.user.name,
          m
        );
        delete tebaklagu[m.sender.split("@")[0]];
      } else m.reply("*Jawaban Salah!*");
    }

    if (kuismath.hasOwnProperty(m.sender.split("@")[0]) && isCmd) {
      kuis = true;
      jawaban = kuismath[m.sender.split("@")[0]];
      if (budy.toLowerCase() == jawaban) {
        await m.reply(
          `🎮 Kuis Matematika  🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? kirim ${prefix}math mode`
        );
        delete kuismath[m.sender.split("@")[0]];
      } else m.reply("*Jawaban Salah!*");
    }

    if (tebakgambar.hasOwnProperty(m.sender.split("@")[0]) && isCmd) {
      kuis = true;
      jawaban = tebakgambar[m.sender.split("@")[0]];
      if (budy.toLowerCase() == jawaban) {
        await razan.sendButtonText(
          from,
          [
            {
              buttonId: "tebak gambar",
              buttonText: { displayText: "Tebak Gambar" },
              type: 1,
            },
          ],
          `🎮 Tebak Gambar 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`,
          razan.user.name,
          m
        );
        delete tebakgambar[m.sender.split("@")[0]];
      } else m.reply("*Jawaban Salah!*");
    }

    if (tebakkata.hasOwnProperty(m.sender.split("@")[0]) && isCmd) {
      kuis = true;
      jawaban = tebakkata[m.sender.split("@")[0]];
      if (budy.toLowerCase() == jawaban) {
        await razan.sendButtonText(
          from,
          [
            {
              buttonId: "tebak kata",
              buttonText: { displayText: "Tebak Kata" },
              type: 1,
            },
          ],
          `🎮 Tebak Kata 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`,
          razan.user.name,
          m
        );
        delete tebakkata[m.sender.split("@")[0]];
      } else m.reply("*Jawaban Salah!*");
    }

    if (caklontong.hasOwnProperty(m.sender.split("@")[0]) && isCmd) {
      kuis = true;
      jawaban = caklontong[m.sender.split("@")[0]];
      deskripsi = caklontong_desk[m.sender.split("@")[0]];
      if (budy.toLowerCase() == jawaban) {
        await razan.sendButtonText(
          from,
          [
            {
              buttonId: "tebak lontong",
              buttonText: { displayText: "Tebak Lontong" },
              type: 1,
            },
          ],
          `🎮 Cak Lontong 🎮\n\nJawaban Benar 🎉\n*${deskripsi}*\n\nIngin bermain lagi? tekan button dibawah`,
          razan.user.name,
          m
        );
        delete caklontong[m.sender.split("@")[0]];
        delete caklontong_desk[m.sender.split("@")[0]];
      } else m.reply("*Jawaban Salah!*");
    }

    if (tebakkalimat.hasOwnProperty(m.sender.split("@")[0]) && isCmd) {
      kuis = true;
      jawaban = tebakkalimat[m.sender.split("@")[0]];
      if (budy.toLowerCase() == jawaban) {
        await razan.sendButtonText(
          from,
          [
            {
              buttonId: "tebak kalimat",
              buttonText: { displayText: "Tebak Kalimat" },
              type: 1,
            },
          ],
          `🎮 Tebak Kalimat 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`,
          razan.user.name,
          m
        );
        delete tebakkalimat[m.sender.split("@")[0]];
      } else m.reply("*Jawaban Salah!*");
    }

    if (tebaklirik.hasOwnProperty(m.sender.split("@")[0]) && isCmd) {
      kuis = true;
      jawaban = tebaklirik[m.sender.split("@")[0]];
      if (budy.toLowerCase() == jawaban) {
        await razan.sendButtonText(
          from,
          [
            {
              buttonId: "tebak lirik",
              buttonText: { displayText: "Tebak Lirik" },
              type: 1,
            },
          ],
          `🎮 Tebak Lirik 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`,
          razan.user.name,
          m
        );
        delete tebaklirik[m.sender.split("@")[0]];
      } else m.reply("*Jawaban Salah!*");
    }

    if (tebaktebakan.hasOwnProperty(m.sender.split("@")[0]) && isCmd) {
      kuis = true;
      jawaban = tebaktebakan[m.sender.split("@")[0]];
      if (budy.toLowerCase() == jawaban) {
        await razan.sendButtonText(
          from,
          [
            {
              buttonId: "tebak tebakan",
              buttonText: { displayText: "Tebak Tebakan" },
              type: 1,
            },
          ],
          `🎮 Tebak Tebakan 🎮\n\nJawaban Benar 🎉\n\nIngin bermain lagi? tekan button dibawah`,
          razan.user.name,
          m
        );
        delete tebaktebakan[m.sender.split("@")[0]];
      } else m.reply("*Jawaban Salah!*");
    }

    //TicTacToe
    this.game = this.game ? this.game : {};
    let room = Object.values(this.game).find(
      (room) =>
        room.id &&
        room.game &&
        room.state &&
        room.id.startsWith("tictactoe") &&
        [room.game.playerX, room.game.playerO].includes(m.sender) &&
        room.state == "PLAYING"
    );
    if (room) {
      let ok;
      let isWin = !1;
      let isTie = !1;
      let isSurrender = !1;
      // m.reply(`[DEBUG]\n${parseInt(m.text)}`)
      if (!/^([1-9]|(me)?nyerah|surr?ender|off|skip)$/i.test(m.text)) return;
      isSurrender = !/^[1-9]$/.test(m.text);
      if (m.sender !== room.game.currentTurn) {
        // nek wayahku
        if (!isSurrender) return !0;
      }
      if (
        !isSurrender &&
        1 >
          (ok = room.game.turn(
            m.sender === room.game.playerO,
            parseInt(m.text) - 1
          ))
      ) {
        m.reply(
          {
            "-3": "Game telah berakhir",
            "-2": "Invalid",
            "-1": "Posisi Invalid",
            0: "Posisi Invalid",
          }[ok]
        );
        return !0;
      }
      if (m.sender === room.game.winner) isWin = true;
      else if (room.game.board === 511) isTie = true;
      let arr = room.game.render().map((v) => {
        return {
          X: "❌",
          O: "⭕",
          1: "1️⃣",
          2: "2️⃣",
          3: "3️⃣",
          4: "4️⃣",
          5: "5️⃣",
          6: "6️⃣",
          7: "7️⃣",
          8: "8️⃣",
          9: "9️⃣",
        }[v];
      });
      if (isSurrender) {
        room.game._currentTurn = m.sender === room.game.playerX;
        isWin = true;
      }
      let winner = isSurrender ? room.game.currentTurn : room.game.winner;
      let str = `Room ID: ${room.id}

${arr.slice(0, 3).join("")}
${arr.slice(3, 6).join("")}
${arr.slice(6).join("")}

${
  isWin
    ? `@${winner.split("@")[0]} Menang!`
    : isTie
    ? `Game berakhir`
    : `Giliran ${["❌", "⭕"][1 * room.game._currentTurn]} (@${
        room.game.currentTurn.split("@")[0]
      })`
}
❌: @${room.game.playerX.split("@")[0]}
⭕: @${room.game.playerO.split("@")[0]}

Ketik *nyerah* untuk menyerah dan mengakui kekalahan`;
      if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== from)
        room[room.game._currentTurn ^ isSurrender ? "x" : "o"] = from;
      if (room.x !== room.o)
        await razan.sendText(room.x, str, m, { mentions: parseMention(str) });
      await razan.sendText(room.o, str, m, { mentions: parseMention(str) });
      if (isTie || isWin) {
        delete this.game[room.id];
      }
    }

    //Suit PvP
    this.suit = this.suit ? this.suit : {};
    let roof = Object.values(this.suit).find(
      (roof) => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender)
    );
    if (roof) {
      let win = "";
      let tie = false;
      if (
        m.sender == roof.p2 &&
        /^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(
          m.text
        ) &&
        m.isGroup &&
        roof.status == "wait"
      ) {
        if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
          razan.sendTextWithMentions(
            from,
            `@${roof.p2.split`@`[0]} menolak suit, suit dibatalkan`,
            m
          );
          delete this.suit[roof.id];
          return !0;
        }
        roof.status = "play";
        roof.asal = from;
        clearTimeout(roof.waktu);
        //delete roof[roof.id].waktu
        razan.sendText(
          from,
          `Suit telah dikirimkan ke chat

@${roof.p.split`@`[0]} dan 
@${roof.p2.split`@`[0]}

Silahkan pilih suit di chat masing"
klik https://wa.me/${botNumber.split`@`[0]}`,
          m,
          { mentions: [roof.p, roof.p2] }
        );
        if (!roof.pilih)
          razan.sendText(
            roof.p,
            `Silahkan pilih \n\nBatu🗿\nKertas📄\nGunting✂️`,
            m
          );
        if (!roof.pilih2)
          razan.sendText(
            roof.p2,
            `Silahkan pilih \n\nBatu🗿\nKertas📄\nGunting✂️`,
            m
          );
        roof.waktu_milih = setTimeout(() => {
          if (!roof.pilih && !roof.pilih2)
            razan.sendText(
              from,
              `Kedua pemain tidak niat main,\nSuit dibatalkan`
            );
          else if (!roof.pilih || !roof.pilih2) {
            win = !roof.pilih ? roof.p2 : roof.p;
            razan.sendTextWithMentions(
              from,
              `@${
                (roof.pilih ? roof.p2 : roof.p).split`@`[0]
              } tidak memilih suit, game berakhir`,
              m
            );
          }
          delete this.suit[roof.id];
          return !0;
        }, roof.timeout);
      }
      let jwb = m.sender == roof.p;
      let jwb2 = m.sender == roof.p2;
      let g = /gunting/i;
      let b = /batu/i;
      let k = /kertas/i;
      let reg = /^(gunting|batu|kertas)/i;
      if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
        roof.pilih = reg.exec(m.text.toLowerCase())[0];
        roof.text = m.text;
        m.reply(
          `Kamu telah memilih ${m.text} ${
            !roof.pilih2 ? `\n\nMenunggu lawan memilih` : ""
          }`
        );
        if (!roof.pilih2)
          razan.sendText(
            roof.p2,
            "_Lawan sudah memilih_\nSekarang giliran kamu",
            0
          );
      }
      if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
        roof.pilih2 = reg.exec(m.text.toLowerCase())[0];
        roof.text2 = m.text;
        m.reply(
          `Kamu telah memilih ${m.text} ${
            !roof.pilih ? `\n\nMenunggu lawan memilih` : ""
          }`
        );
        if (!roof.pilih)
          razan.sendText(
            roof.p,
            "_Lawan sudah memilih_\nSekarang giliran kamu",
            0
          );
      }
      let stage = roof.pilih;
      let stage2 = roof.pilih2;
      if (roof.pilih && roof.pilih2) {
        clearTimeout(roof.waktu_milih);
        if (b.test(stage) && g.test(stage2)) win = roof.p;
        else if (b.test(stage) && k.test(stage2)) win = roof.p2;
        else if (g.test(stage) && k.test(stage2)) win = roof.p;
        else if (g.test(stage) && b.test(stage2)) win = roof.p2;
        else if (k.test(stage) && b.test(stage2)) win = roof.p;
        else if (k.test(stage) && g.test(stage2)) win = roof.p2;
        else if (stage == stage2) tie = true;
        razan.sendText(
          roof.asal,
          `_*Hasil Suit*_${tie ? "\nSERI" : ""}

@${roof.p.split`@`[0]} (${roof.text}) ${
            tie ? "" : roof.p == win ? ` Menang \n` : ` Kalah \n`
          }
@${roof.p2.split`@`[0]} (${roof.text2}) ${
            tie ? "" : roof.p2 == win ? ` Menang \n` : ` Kalah \n`
          }
`.trim(),
          m,
          { mentions: [roof.p, roof.p2] }
        );
        delete this.suit[roof.id];
      }
    }

    let mentionUser = [
      ...new Set([
        ...(m.mentionedJid || []),
        ...(m.quoted ? [m.quoted.sender] : []),
      ]),
    ];
    for (let jid of mentionUser) {
      let user = global.db.data.users[jid];
      if (!user) continue;
      let afkTime = user.afkTime;
      if (!afkTime || afkTime < 0) continue;
      let reason = user.afkReason || "";
      m.reply(
        `
Jangan tag dia!
Dia sedang AFK ${reason ? "dengan alasan " + reason : "tanpa alasan"}
Selama ${clockString(new Date() - afkTime)}
`.trim()
      );
    }

    if (db.data.users[m.sender].afkTime > -1) {
      let user = global.db.data.users[m.sender];
      m.reply(
        `
Kamu berhenti AFK${user.afkReason ? " setelah " + user.afkReason : ""}
Selama ${clockString(new Date() - user.afkTime)}
`.trim()
      );
      user.afkTime = -1;
      user.afkReason = "";
    }

    switch (command) {
      case "afk":
        {
          let user = global.db.data.users[m.sender];
          user.afkTime = +new Date();
          user.afkReason = text;
          m.reply(`${m.pushName} Telah Afk${text ? ": " + text : ""}`);
        }
        break;
      case "ttc":
      case "ttt":
      case "tictactoe":
        {
          let TicTacToe = require("./lib/tictactoe");
          this.game = this.game ? this.game : {};
          if (
            Object.values(this.game).find(
              (room) =>
                room.id.startsWith("tictactoe") &&
                [room.game.playerX, room.game.playerO].includes(m.sender)
            )
          )
            throw "Kamu masih didalam game";
          let room = Object.values(this.game).find(
            (room) =>
              room.state === "WAITING" && (text ? room.name === text : true)
          );
          if (room) {
            m.reply("Partner ditemukan!");
            room.o = from;
            room.game.playerO = m.sender;
            room.state = "PLAYING";
            let arr = room.game.render().map((v) => {
              return {
                X: "❌",
                O: "⭕",
                1: "1️⃣",
                2: "2️⃣",
                3: "3️⃣",
                4: "4️⃣",
                5: "5️⃣",
                6: "6️⃣",
                7: "7️⃣",
                8: "8️⃣",
                9: "9️⃣",
              }[v];
            });
            let str = `Room ID: ${room.id}

${arr.slice(0, 3).join("")}
${arr.slice(3, 6).join("")}
${arr.slice(6).join("")}

Menunggu @${room.game.currentTurn.split("@")[0]}

Ketik *nyerah* untuk menyerah dan mengakui kekalahan`;
            if (room.x !== room.o)
              await razan.sendText(room.x, str, m, {
                mentions: parseMention(str),
              });
            await razan.sendText(room.o, str, m, {
              mentions: parseMention(str),
            });
          } else {
            room = {
              id: "tictactoe-" + +new Date(),
              x: from,
              o: "",
              game: new TicTacToe(m.sender, "o"),
              state: "WAITING",
            };
            if (text) room.name = text;
            m.reply(
              "Menunggu partner" +
                (text
                  ? ` mengetik command dibawah ini ${prefix}${command} ${text}`
                  : "")
            );
            this.game[room.id] = room;
          }
        }
        break;
      case "delttc":
      case "delttt":
        {
          this.game = this.game ? this.game : {};
          try {
            if (this.game) {
              delete this.game;
              razan.sendText(from, `Berhasil delete session TicTacToe`, m);
            } else if (!this.game) {
              m.reply(`Session TicTacToe🎮 tidak ada`);
            } else throw "?";
          } catch (e) {
            m.reply("rusak");
          }
        }
        break;
      case "suitpvp":
      case "suit":
        {
          this.suit = this.suit ? this.suit : {};
          let poin = 10;
          let poin_lose = 10;
          let timeout = 60000;
          if (
            Object.values(this.suit).find(
              (roof) =>
                roof.id.startsWith("suit") &&
                [roof.p, roof.p2].includes(m.sender)
            )
          )
            m.reply(`Selesaikan suit mu yang sebelumnya`);
          if (m.mentionedJid[0] === m.sender)
            return m.reply(`Tidak bisa bermain dengan diri sendiri !`);
          if (!m.mentionedJid[0])
            return m.reply(
              `_Siapa yang ingin kamu tantang?_\nTag orangnya..\n\nContoh : ${prefix}suit @${owner[1]}`,
              from,
              { mentions: [owner[1] + "@s.whatsapp.net"] }
            );
          if (
            Object.values(this.suit).find(
              (roof) =>
                roof.id.startsWith("suit") &&
                [roof.p, roof.p2].includes(m.mentionedJid[0])
            )
          )
            throw `Orang yang kamu tantang sedang bermain suit bersama orang lain :(`;
          let id = "suit_" + new Date() * 1;
          let caption = `_*SUIT PvP*_

@${m.sender.split`@`[0]} menantang @${
            m.mentionedJid[0].split`@`[0]
          } untuk bermain suit

Silahkan @${m.mentionedJid[0].split`@`[0]} untuk ketik terima/tolak`;
          this.suit[id] = {
            chat: await razan.sendText(from, caption, m, {
              mentions: parseMention(caption),
            }),
            id: id,
            p: m.sender,
            p2: m.mentionedJid[0],
            status: "wait",
            waktu: setTimeout(() => {
              if (this.suit[id]) razan.sendText(from, `_Waktu suit habis_`, m);
              delete this.suit[id];
            }, 60000),
            poin,
            poin_lose,
            timeout,
          };
        }
        break;
      case "donasi":
      case "sewabot":
      case "sewa":
      case "buypremium":
      case "donate":
        {
          razan.sendMessage(
            from,
            {
              text: `*Hai Kak ${m.pushName}*\n\nPremium Price Bot\n⌕ 10k per User 1 bulan\n\nPayment can be via Paypal/link aja/pulsa\n\nFor more details, you can chat with the owner\nhttps://wa.me/6285736800927 (Owner)\n\nDonate For Me : \n\n⌕ Saweria : https://saweria.co/raznaaq\n⌕ Paypal : Kaga ada`,
            },
            {
              quoted: m,
            }
          );
        }
        break;
      case "sc":
      case "sourcecode":
        {
          addCountCmd(`#${command.slice(1)}`, sender, _cmd);
          anu = `
⌕ Script : https://github.com/AzzBott679

Jangan lupa kasih bintang.
⌕ Donate : 08573680927 (Dana / gopay)
⌕ Saweria : Kaga ada
⌕ Paypal : kaga ada

Dont Forget Donate
`;
          let btn = [
            {
              urlButton: {
                displayText: "Instagram",
                url: "https://instagram.com/raznnaa_",
              },
            },
          ];
          razan.send5ButImg(from, anu, botname, global.sc, btn);
        }
        break;

      case "tqto":
      case "tq":
      case "credits":
        {
          anu = `Terima kasih

Allah SWT
Razan
Danzz Coding
DikaArdnt
Yahya Ganzz
ALL Of Razan Dev Team
`;
          razan.sendMessage(from, { text: anu }, { quoted: m });
        }
        break;

      case "chat":
        {
          addCountCmd(`#${command.slice(1)}`, sender, _cmd);
          if (!isCreator) throw mess.owner;
          if (!q)
            throw "Option : 1. mute\n2. unmute\n3. archive\n4. unarchive\n5. read\n6. unread\n7. delete";
          if (args[0] === "mute") {
            razan
              .chatModify({ mute: "Infinity" }, from, [])
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "unmute") {
            razan
              .chatModify({ mute: null }, from, [])
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "archive") {
            razan
              .chatModify({ archive: true }, from, [])
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "unarchive") {
            razan
              .chatModify({ archive: false }, from, [])
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "read") {
            razan
              .chatModify({ markRead: true }, from, [])
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "unread") {
            razan
              .chatModify({ markRead: false }, from, [])
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "delete") {
            razan
              .chatModify(
                { clear: { message: { id: m.quoted.id, fromMe: true } } },
                from,
                []
              )
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          }
        }
        break;
      case "family100":
        {
          if ("family100" + from in _family100) {
            m.reply("Masih Ada Sesi Yang Belum Diselesaikan!");
            throw false;
          }
          let anu = await fetchJson(
            "https://raw.githubusercontent.com/BochilTeam/database/master/games/family100.json"
          );
          let random = anu[Math.floor(Math.random() * anu.length)];
          let hasil = `*Jawablah Pertanyaan Berikut :*\n${
            random.soal
          }\n\nTerdapat *${random.jawaban.length}* Jawaban ${
            random.jawaban.find((v) => v.includes(" "))
              ? `(beberapa Jawaban Terdapat Spasi)`
              : ""
          }`.trim();
          _family100["family100" + from] = {
            id: "family100" + from,
            pesan: await razan.sendText(from, hasil, m),
            ...random,
            terjawab: Array.from(random.jawaban, () => false),
            hadiah: 6,
          };
        }
        break;
      case "halah":
      case "hilih":
      case "huluh":
      case "heleh":
      case "holoh":
        if (!m.quoted && !text)
          throw `Kirim/reply text dengan caption ${prefix + command}`;
        ter = command[1].toLowerCase();
        tex = m.quoted
          ? m.quoted.text
            ? m.quoted.text
            : q
            ? q
            : m.text
          : q
          ? q
          : m.text;
        m.reply(
          tex.replace(/[aiueo]/g, ter).replace(/[AIUEO]/g, ter.toUpperCase())
        );
        break;
      case "tebak":
        {
          if (!text)
            throw `Example : ${
              prefix + command
            } lagu\n\nOption : \n1. lagu\n2. gambar\n3. kata\n4. kalimat\n5. lirik\n6.lontong`;
          if (args[0] === "lagu") {
            if (tebaklagu.hasOwnProperty(m.sender.split("@")[0]))
              throw "Masih Ada Sesi Yang Belum Diselesaikan!";
            let anu = await fetchJson(
              "https://fatiharridho.github.io/tebaklagu.json"
            );
            let result = anu[Math.floor(Math.random() * anu.length)];
            let msg = await razan.sendMessage(
              from,
              { audio: { url: result.link_song }, mimetype: "audio/mpeg" },
              { quoted: m }
            );
            razan
              .sendText(
                from,
                `Lagu Tersebut Adalah Lagu dari?\n\nArtist : ${result.artist}\nWaktu : 60s`,
                msg
              )
              .then(() => {
                tebaklagu[m.sender.split("@")[0]] =
                  result.jawaban.toLowerCase();
              });
            await sleep(60000);
            if (tebaklagu.hasOwnProperty(m.sender.split("@")[0])) {
              console.log("Jawaban: " + result.jawaban);
              razan.sendButtonText(
                from,
                [
                  {
                    buttonId: "tebak lagu",
                    buttonText: { displayText: "Tebak Lagu" },
                    type: 1,
                  },
                ],
                `Waktu Habis\nJawaban:  ${
                  tebaklagu[m.sender.split("@")[0]]
                }\n\nIngin bermain? tekan button dibawah`,
                razan.user.name,
                m
              );
              delete tebaklagu[m.sender.split("@")[0]];
            }
          } else if (args[0] === "gambar") {
            if (tebakgambar.hasOwnProperty(m.sender.split("@")[0]))
              throw "Masih Ada Sesi Yang Belum Diselesaikan!";
            let anu = await fetchJson(
              "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json"
            );
            let result = anu[Math.floor(Math.random() * anu.length)];
            razan
              .sendImage(
                from,
                result.img,
                `Silahkan Jawab Soal Di Atas Ini\n\nDeskripsi : ${result.deskripsi}\nWaktu : 60s`,
                m
              )
              .then(() => {
                tebakgambar[m.sender.split("@")[0]] =
                  result.jawaban.toLowerCase();
              });
            await sleep(60000);
            if (tebakgambar.hasOwnProperty(m.sender.split("@")[0])) {
              console.log("Jawaban: " + result.jawaban);
              razan.sendButtonText(
                from,
                [
                  {
                    buttonId: "tebak gambar",
                    buttonText: { displayText: "Tebak Gambar" },
                    type: 1,
                  },
                ],
                `Waktu Habis\nJawaban:  ${
                  tebakgambar[m.sender.split("@")[0]]
                }\n\nIngin bermain? tekan button dibawah`,
                razan.user.name,
                m
              );
              delete tebakgambar[m.sender.split("@")[0]];
            }
          } else if (args[0] === "kata") {
            if (tebakkata.hasOwnProperty(m.sender.split("@")[0]))
              throw "Masih Ada Sesi Yang Belum Diselesaikan!";
            let anu = await fetchJson(
              "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkata.json"
            );
            let result = anu[Math.floor(Math.random() * anu.length)];
            razan
              .sendText(
                from,
                `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : 60s`,
                m
              )
              .then(() => {
                tebakkata[m.sender.split("@")[0]] =
                  result.jawaban.toLowerCase();
              });
            await sleep(60000);
            if (tebakkata.hasOwnProperty(m.sender.split("@")[0])) {
              console.log("Jawaban: " + result.jawaban);
              razan.sendButtonText(
                from,
                [
                  {
                    buttonId: "tebak kata",
                    buttonText: { displayText: "Tebak Kata" },
                    type: 1,
                  },
                ],
                `Waktu Habis\nJawaban:  ${
                  tebakkata[m.sender.split("@")[0]]
                }\n\nIngin bermain? tekan button dibawah`,
                razan.user.name,
                m
              );
              delete tebakkata[m.sender.split("@")[0]];
            }
          } else if (args[0] === "kalimat") {
            if (tebakkalimat.hasOwnProperty(m.sender.split("@")[0]))
              throw "Masih Ada Sesi Yang Belum Diselesaikan!";
            let anu = await fetchJson(
              "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakkalimat.json"
            );
            let result = anu[Math.floor(Math.random() * anu.length)];
            razan
              .sendText(
                from,
                `Silahkan Jawab Pertanyaan Berikut\n\n${result.soal}\nWaktu : 60s`,
                m
              )
              .then(() => {
                tebakkalimat[m.sender.split("@")[0]] =
                  result.jawaban.toLowerCase();
              });
            await sleep(60000);
            if (tebakkalimat.hasOwnProperty(m.sender.split("@")[0])) {
              console.log("Jawaban: " + result.jawaban);
              razan.sendButtonText(
                from,
                [
                  {
                    buttonId: "tebak kalimat",
                    buttonText: { displayText: "Tebak Kalimat" },
                    type: 1,
                  },
                ],
                `Waktu Habis\nJawaban:  ${
                  tebakkalimat[m.sender.split("@")[0]]
                }\n\nIngin bermain? tekan button dibawah`,
                razan.user.name,
                m
              );
              delete tebakkalimat[m.sender.split("@")[0]];
            }
          } else if (args[0] === "lirik") {
            if (tebaklirik.hasOwnProperty(m.sender.split("@")[0]))
              throw "Masih Ada Sesi Yang Belum Diselesaikan!";
            let anu = await fetchJson(
              "https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaklirik.json"
            );
            let result = anu[Math.floor(Math.random() * anu.length)];
            razan
              .sendText(
                from,
                `Ini Adalah Lirik Dari Lagu? : *${result.soal}*?\nWaktu : 60s`,
                m
              )
              .then(() => {
                tebaklirik[m.sender.split("@")[0]] =
                  result.jawaban.toLowerCase();
              });
            await sleep(60000);
            if (tebaklirik.hasOwnProperty(m.sender.split("@")[0])) {
              console.log("Jawaban: " + result.jawaban);
              razan.sendButtonText(
                from,
                [
                  {
                    buttonId: "tebak lirik",
                    buttonText: { displayText: "Tebak Lirik" },
                    type: 1,
                  },
                ],
                `Waktu Habis\nJawaban:  ${
                  tebaklirik[m.sender.split("@")[0]]
                }\n\nIngin bermain? tekan button dibawah`,
                razan.user.name,
                m
              );
              delete tebaklirik[m.sender.split("@")[0]];
            }
          } else if (args[0] === "lontong") {
            if (caklontong.hasOwnProperty(m.sender.split("@")[0]))
              throw "Masih Ada Sesi Yang Belum Diselesaikan!";
            let anu = await fetchJson(
              "https://raw.githubusercontent.com/BochilTeam/database/master/games/caklontong.json"
            );
            let result = anu[Math.floor(Math.random() * anu.length)];
            razan
              .sendText(
                from,
                `*Jawablah Pertanyaan Berikut :*\n${result.soal}*\nWaktu : 60s`,
                m
              )
              .then(() => {
                caklontong[m.sender.split("@")[0]] =
                  result.jawaban.toLowerCase();
                caklontong_desk[m.sender.split("@")[0]] = result.deskripsi;
              });
            await sleep(60000);
            if (caklontong.hasOwnProperty(m.sender.split("@")[0])) {
              console.log("Jawaban: " + result.jawaban);
              razan.sendButtonText(
                from,
                [
                  {
                    buttonId: "tebak lontong",
                    buttonText: { displayText: "Tebak Lontong" },
                    type: 1,
                  },
                ],
                `Waktu Habis\nJawaban:  ${
                  caklontong[m.sender.split("@")[0]]
                }\nDeskripsi : ${
                  caklontong_desk[m.sender.split("@")[0]]
                }\n\nIngin bermain? tekan button dibawah`,
                razan.user.name,
                m
              );
              delete caklontong[m.sender.split("@")[0]];
              delete caklontong_desk[m.sender.split("@")[0]];
            }
          }
        }
        break;
      case "kuismath":
      case "math":
        {
          if (kuismath.hasOwnProperty(m.sender.split("@")[0]))
            throw "Masih Ada Sesi Yang Belum Diselesaikan!";
          let { genMath, modes } = require("./src/math");
          if (!text)
            throw `Mode: ${Object.keys(modes).join(
              " | "
            )}\nContoh penggunaan: ${prefix}math medium`;
          let result = await genMath(text.toLowerCase());
          razan
            .sendText(
              from,
              `*Berapa hasil dari: ${result.soal.toLowerCase()}*?\n\nWaktu: ${(
                result.waktu / 1000
              ).toFixed(2)} detik`,
              m
            )
            .then(() => {
              kuismath[m.sender.split("@")[0]] = result.jawaban;
            });
          await sleep(result.waktu);
          if (kuismath.hasOwnProperty(m.sender.split("@")[0])) {
            console.log("Jawaban: " + result.jawaban);
            m.reply(
              "Waktu Habis\nJawaban: " + kuismath[m.sender.split("@")[0]]
            );
            delete kuismath[m.sender.split("@")[0]];
          }
        }
        break;
      case "jodohku":
        {
          if (!m.isGroup) throw mess.group;
          let member = participants.map((u) => u.id);
          let me = m.sender;
          let jodoh = member[Math.floor(Math.random() * member.length)];
          let jawab = `👫Jodoh mu adalah

@${me.split("@")[0]} ❤️ @${jodoh.split("@")[0]}`;
          let ments = [me, jodoh];
          let buttons = [
            {
              buttonId: "jodohku",
              buttonText: { displayText: "Jodohku" },
              type: 1,
            },
          ];
          await razan.sendButtonText(from, buttons, jawab, razan.user.name, m, {
            mentions: ments,
          });
        }
        break;
      case "jadian":
        {
          if (!m.isGroup) throw mess.group;
          let member = participants.map((u) => u.id);
          let orang = member[Math.floor(Math.random() * member.length)];
          let jodoh = member[Math.floor(Math.random() * member.length)];
          let jawab = `Ciee yang Jadian💖 Jangan lupa pajak jadiannya🐤

@${orang.split("@")[0]} ❤️ @${jodoh.split("@")[0]}`;
          let menst = [orang, jodoh];
          let buttons = [
            {
              buttonId: "jadian",
              buttonText: { displayText: "Jodohku" },
              type: 1,
            },
          ];
          await razan.sendButtonText(from, buttons, jawab, razan.user.name, m, {
            mentions: menst,
          });
        }
        break;
      case "react":
        {
          if (!isCreator) throw mess.owner;
          reactionMessage = {
            react: {
              text: args[0],
              key: { remoteJid: from, fromMe: true, id: quoted.id },
            },
          };
          razan.sendMessage(from, reactionMessage);
        }
        break;
      case "join":
        {
          if (!isCreator) throw mess.owner;
          if (!text) throw "Masukkan Link Group!";
          if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
            throw "Link Invalid!";
          m.reply(mess.wait);
          let result = args[0].split("https://chat.whatsapp.com/")[1];
          await razan
            .groupAcceptInvite(result)
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "leave":
        {
          if (!isCreator) throw mess.owner;
          await razan
            .groupLeave(from)
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "setexif":
        {
          if (!isCreator) throw mess.owner;
          if (!text) throw `Example : ${prefix + command} packname|author`;
          global.packname = text.split("|")[0];
          global.author = text.split("|")[1];
          m.reply(
            `Exif berhasil diubah menjadi\n\n⌕ Packname : ${global.packname}\n⌕ Author : ${global.author}`
          );
        }
        break;
      case "kick":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await razan.groupParticipantsUpdate(from, [users], "remove");
          m.reply(`Berhasil Kick ${users}`);
        }
        break;
      case "add":
        {
          if (!m.isGroup) throw mess.group;
          m.reply("Berhasil Add User");
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await razan.groupParticipantsUpdate(from, [users], "add");
        }
        break;
      case "promote":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await razan
            .groupParticipantsUpdate(from, [users], "promote")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "demote":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await razan
            .groupParticipantsUpdate(from, [users], "demote")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "block":
        {
          if (!isCreator) throw mess.owner;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await razan
            .updateBlockStatus(users, "block")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "unblock":
        {
          if (!isCreator) throw mess.owner;
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await razan
            .updateBlockStatus(users, "unblock")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "setname":
      case "setsubject":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          await razan
            .groupUpdateSubject(from, text)
            .then((res) => m.reply(mess.success))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "setdesc":
      case "setdesk":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Text ?";
          await razan
            .groupUpdateDescription(from, text)
            .then((res) => m.reply(mess.success))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      case "setppbot":
        {
          if (!isCreator) throw mess.owner;
          if (!quoted)
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let media = await razan.downloadAndSaveMediaMessage(quoted);
          await razan
            .updateProfilePicture(botNumber, { url: media })
            .catch((err) => fs.unlinkSync(media));
          m.reply(mess.success);
        }
        break;
      case "setppgroup":
      case "setppgrup":
      case "setppgc":
        {
          if (!m.isGroup) throw mess.group;
          if (!isAdmins) throw mess.admin;
          if (!quoted)
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let media = await razan.downloadAndSaveMediaMessage(quoted);
          await razan
            .updateProfilePicture(from, { url: media })
            .catch((err) => fs.unlinkSync(media));
          m.reply(mess.success);
        }
        break;
      case "tagall":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          let teks = `══✪〘 *👥 Tag All* 〙✪══
 
 ➲ *Pesan : ${q ? q : "kosong"}*\n\n`;
          for (let mem of participants) {
            teks += `⌕ @${mem.id.split("@")[0]}\n`;
          }
          razan.sendMessage(
            from,
            { text: teks, mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        }
        break;
      case "hidetag":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          razan.sendMessage(
            from,
            { text: q ? q : "", mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        }
        break;
      case "style":
      case "styletext":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return m.reply(mess.endLimit); // respon ketika limit habis
          db.data.users[m.sender].limit -= 1; // -1 limit
          let { styletext } = require("./lib/scraper");
          if (!text) throw "Masukkan Query text!";
          let anu = await styletext(text);
          let teks = `Srtle Text From ${text}\n\n`;
          for (let i of anu) {
            teks += `⌕ *${i.name}* : ${i.result}\n\n`;
          }
          m.reply(teks);
        }
        break;
      case "vote":
        {
          if (!m.isGroup) throw mess.group;
          if (from in vote)
            throw `_Masih ada vote di chat ini!_\n\n*${prefix}hapusvote* - untuk menghapus vote`;
          if (!text)
            throw `Masukkan Alasan Melakukan Vote, Example: *${
              prefix + command
            } Owner Ganteng*`;
          m.reply(
            `Vote dimulai!\n\n*${prefix}upvote* - untuk ya\n*${prefix}devote* - untuk tidak\n*${prefix}cekvote* - untuk mengecek vote\n*${prefix}hapusvote* - untuk menghapus vote`
          );
          vote[from] = [q, [], []];
          await sleep(1000);
          upvote = vote[from][1];
          devote = vote[from][2];
          teks_vote = `*「 VOTE 」*

*Alasan:* ${vote[from][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[from][1].length}
│
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${vote[from][2].length}
│
│ 
└────

*${prefix}hapusvote* - untuk menghapus vote`;
          let buttonsVote = [
            {
              buttonId: `${prefix}upvote`,
              buttonText: { displayText: "U P V O T E" },
              type: 1,
            },
            {
              buttonId: `${prefix}devote`,
              buttonText: { displayText: "D E V O T E" },
              type: 1,
            },
          ];

          let buttonMessageVote = {
            text: teks_vote,
            footer: razan.user.name,
            buttons: buttonsVote,
            headerType: 1,
          };
          razan.sendMessage(from, buttonMessageVote);
        }
        break;
      case "upvote":
        {
          if (!m.isGroup) throw mess.group;
          if (!(from in vote))
            throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`;
          isVote = vote[from][1].concat(vote[from][2]);
          wasVote = isVote.includes(m.sender);
          if (wasVote) throw "Kamu Sudah Vote";
          vote[from][1].push(m.sender);
          menvote = vote[from][1].concat(vote[from][2]);
          teks_vote = `*「 VOTE 」*

*Alasan:* ${vote[from][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[from][1].length}
${vote[from][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${vote[from][2].length}
${vote[from][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

*${prefix}hapusvote* - untuk menghapus vote`;
          let buttonsUpvote = [
            {
              buttonId: `${prefix}upvote`,
              buttonText: { displayText: "U P V O T E" },
              type: 1,
            },
            {
              buttonId: `${prefix}devote`,
              buttonText: { displayText: "D E V O T E" },
              type: 1,
            },
          ];

          let buttonMessageUpvote = {
            text: teks_vote,
            footer: razan.user.name,
            buttons: buttonsUpvote,
            headerType: 1,
            mentions: menvote,
          };
          razan.sendMessage(from, buttonMessageUpvote);
        }
        break;
      case "devote":
        {
          if (!m.isGroup) throw mess.group;
          if (!(from in vote))
            throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`;
          isVote = vote[from][1].concat(vote[from][2]);
          wasVote = isVote.includes(m.sender);
          if (wasVote) throw "Kamu Sudah Vote";
          vote[from][2].push(m.sender);
          menvote = vote[from][1].concat(vote[from][2]);
          teks_vote = `*「 VOTE 」*

*Alasan:* ${vote[from][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${vote[from][1].length}
${vote[from][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${vote[from][2].length}
${vote[from][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

*${prefix}hapusvote* - untuk menghapus vote`;
          let buttonsDevote = [
            {
              buttonId: `${prefix}upvote`,
              buttonText: { displayText: "U P V O T E" },
              type: 1,
            },
            {
              buttonId: `${prefix}devote`,
              buttonText: { displayText: "D E V O T E" },
              type: 1,
            },
          ];

          let buttonMessageDevote = {
            text: teks_vote,
            footer: razan.user.name,
            buttons: buttonsDevote,
            headerType: 1,
            mentions: menvote,
          };
          razan.sendMessage(from, buttonMessageDevote);
        }
        break;

      case "cekvote":
        if (!m.isGroup) throw mess.group;
        if (!(from in vote))
          throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`;
        teks_vote = `*「 VOTE 」*

*Alasan:* ${vote[from][0]}

┌〔 UPVOTE 〕
│ 
├ Total: ${upvote.length}
${vote[from][1].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

┌〔 DEVOTE 〕
│ 
├ Total: ${devote.length}
${vote[from][2].map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join("\n")}
│ 
└────

*${prefix}hapusvote* - untuk menghapus vote


©${razan.user.id}
`;
        razan.sendTextWithMentions(from, teks_vote, m);
        break;
      case "deletevote":
      case "delvote":
      case "hapusvote":
        {
          if (!m.isGroup) throw mess.group;
          if (!(from in vote))
            throw `_*tidak ada voting digrup ini!*_\n\n*${prefix}vote* - untuk memulai vote`;
          delete vote[from];
          m.reply("Berhasil Menghapus Sesi Vote Di Grup Ini");
        }
        break;
      case "group":
      case "grup":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "close") {
            await razan
              .groupSettingUpdate(from, "announcement")
              .then((res) => m.reply(`Sukses Menutup Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "open") {
            await razan
              .groupSettingUpdate(from, "not_announcement")
              .then((res) => m.reply(`Sukses Membuka Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else {
            let buttons = [
              {
                buttonId: "group open",
                buttonText: { displayText: "Open" },
                type: 1,
              },
              {
                buttonId: "group close",
                buttonText: { displayText: "Close" },
                type: 1,
              },
            ];
            await razan.sendButtonText(
              from,
              buttons,
              `Mode Group`,
              razan.user.name,
              m
            );
          }
        }
        break;
      case "editinfo":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "open") {
            await razan
              .groupSettingUpdate(from, "unlocked")
              .then((res) => m.reply(`Sukses Membuka Edit Info Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "close") {
            await razan
              .groupSettingUpdate(from, "locked")
              .then((res) => m.reply(`Sukses Menutup Edit Info Group`))
              .catch((err) => m.reply(jsonformat(err)));
          } else {
            let buttons = [
              {
                buttonId: "editinfo open",
                buttonText: { displayText: "Open" },
                type: 1,
              },
              {
                buttonId: "editinfo close",
                buttonText: { displayText: "Close" },
                type: 1,
              },
            ];
            await razan.sendButtonText(
              from,
              buttons,
              `Mode Edit Info`,
              razan.user.name,
              m
            );
          }
        }
        break;
      case "antilink":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "on") {
            if (db.data.chats[from].antilink)
              return m.reply(`Sudah Aktif Sebelumnya`);
            db.data.chats[from].antilink = true;
            m.reply(`Antilink Aktif !`);
          } else if (args[0] === "off") {
            if (!db.data.chats[from].antilink)
              return m.reply(`Sudah Tidak Aktif Sebelumnya`);
            db.data.chats[from].antilink = false;
            m.reply(`Antilink Tidak Aktif !`);
          } else {
            let buttons = [
              {
                buttonId: "antilink on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "antilink off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await razan.sendButtonText(
              from,
              buttons,
              `Mode Antilink`,
              razan.user.name,
              m
            );
          }
        }
        break;
      case "mute":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (args[0] === "on") {
            if (db.data.chats[from].mute)
              return m.reply(`Sudah Aktif Sebelumnya`);
            db.data.chats[from].mute = true;
            m.reply(`${razan.user.name} telah di mute di group ini !`);
          } else if (args[0] === "off") {
            if (!db.data.chats[from].mute)
              return m.reply(`Sudah Tidak Aktif Sebelumnya`);
            db.data.chats[from].mute = false;
            m.reply(`${razan.user.name} telah di unmute di group ini !`);
          } else {
            let buttons = [
              {
                buttonId: "mute on",
                buttonText: { displayText: "On" },
                type: 1,
              },
              {
                buttonId: "mute off",
                buttonText: { displayText: "Off" },
                type: 1,
              },
            ];
            await razan.sendButtonText(
              from,
              buttons,
              `Mute Bot`,
              razan.user.name,
              m
            );
          }
        }
        break;
      case "linkgroup":
      case "linkgc":
        {
          if (!m.isGroup) throw mess.group;
          let response = await razan.groupInviteCode(from);
          razan.sendText(
            from,
            `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`,
            m,
            { detectLink: true }
          );
        }
        break;
      case "ephemeral":
        {
          if (!m.isGroup) throw mess.group;
          if (!isBotAdmins) throw mess.botAdmin;
          if (!isAdmins) throw mess.admin;
          if (!text) throw "Masukkan value enable/disable";
          if (args[0] === "enable") {
            await razan
              .sendMessage(from, {
                disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL,
              })
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          } else if (args[0] === "disable") {
            await razan
              .sendMessage(from, { disappearingMessagesInChat: false })
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          }
        }
        break;
      case "delete":
      case "del":
        {
          if (!m.quoted) throw false;
          let { chat, fromMe, id, isBaileys } = m.quoted;
          if (!isBaileys) throw "Pesan tersebut bukan dikirim oleh bot!";
          razan.sendMessage(from, {
            delete: {
              remoteJid: from,
              fromMe: true,
              id: m.quoted.id,
              participant: m.quoted.sender,
            },
          });
        }
        break;
      case "bcgc":
      case "bcgroup":
        {
          if (!isCreator) throw mess.owner;
          if (!text)
            throw `Text mana?\n\nExample : ${prefix + command} fatih-san`;
          let getGroups = await razan.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          m.reply(
            `Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${
              anu.length * 1.5
            } detik`
          );
          for (let i of anu) {
            await sleep(1500);
            let btn = [
              {
                urlButton: {
                  displayText: "Source Code",
                  url: "https://github.com/DikaArdnt/razan-Morou",
                },
              },
            ];
            let txt = `「 Broadcast Bot 」\n\n${text}`;
            razan.send5ButImg(i, txt, razan.user.name, global.thumb, btn);
          }
          m.reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`);
        }
        break;
      case "bc":
      case "broadcast":
      case "bcall":
        {
          if (!isCreator) throw mess.owner;
          if (!text)
            throw `Text mana?\n\nExample : ${prefix + command} fatih-san`;
          let anu = await store.chats.all().map((v) => v.id);
          m.reply(
            `Mengirim Broadcast Ke ${anu.length} Chat\nWaktu Selesai ${
              anu.length * 1.5
            } detik`
          );
          for (let yoi of anu) {
            await sleep(1500);
            let btn = [
              {
                urlButton: {
                  displayText: "Source Code",
                  url: "https://github.com/DikaArdnt/razan-Morou",
                },
              },
            ];
            let txt = `「 Broadcast Bot 」\n\n${text}`;
            razan.send5ButImg(yoi, txt, razan.user.name, global.thumb, btn);
          }
          m.reply("Sukses Broadcast");
        }
        break;
      case "infochat":
        {
          if (!m.quoted) m.reply("Reply Pesan");
          let msg = await m.getQuotedObj();
          if (!m.quoted.isBaileys)
            throw "Pesan tersebut bukan dikirim oleh bot!";
          let teks = "";
          for (let i of msg.userReceipt) {
            let read = i.readTimestamp;
            let unread = i.receiptTimestamp;
            let waktu = read ? read : unread;
            teks += `⌕ @${i.userJid.split("@")[0]}\n`;
            teks += ` ┗━⌕ *Waktu :* ${moment(waktu * 1000).format(
              "DD/MM/YY HH:mm:ss"
            )} ⌕ *Status :* ${read ? "Dibaca" : "Terkirim"}\n\n`;
          }
          razan.sendTextWithMentions(from, teks, m);
        }
        break;
      case "q":
      case "quoted":
        {
          if (!m.quoted) return m.reply("Reply Pesannya!!");
          let wokwol = await razan.serializeM(await m.getQuotedObj());
          if (!wokwol.quoted)
            return m.reply("Pesan Yang anda reply tidak mengandung reply");
          await wokwol.quoted.copyNForward(from, true);
        }
        break;
      case "listpc":
        {
          let anu = await store.chats
            .all()
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`;
          for (let i of anu) {
            let nama = store.messages[i].array[0].pushName;
            teks += `⌕ *Nama :* ${nama}\n⌕ *User :* @${
              i.split("@")[0]
            }\n⌕ *Chat :* https://wa.me/${
              i.split("@")[0]
            }\n\n────────────────────────\n\n`;
          }
          razan.sendTextWithMentions(from, teks, m);
        }
        break;
      case "listgc":
        {
          let anu = await store.chats
            .all()
            .filter((v) => v.id.endsWith("@g.us"))
            .map((v) => v.id);
          let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`;
          for (let i of anu) {
            let metadata = await razan.groupMetadata(i);
            teks += `⌕ *Nama :* ${metadata.subject}\n⌕ *Owner :* @${
              metadata.owner.split("@")[0]
            }\n⌕ *ID :* ${metadata.id}\n⌕ *Dibuat :* ${moment(
              metadata.creation * 1000
            )
              .tz("Asia/Jakarta")
              .format("DD/MM/YYYY HH:mm:ss")}\n⌕ *Member :* ${
              metadata.participants.length
            }\n\n────────────────────────\n\n`;
          }
          razan.sendTextWithMentions(from, teks, m);
        }
        break;
      case "listonline":
      case "liston":
        {
          let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from;
          let online = [...Object.keys(store.presences[id]), botNumber];
          razan.sendText(
            from,
            "List Online:\n\n" +
              online.map((v) => "⌕ @" + v.replace(/@.+/, "")).join`\n`,
            m,
            { mentions: online }
          );
        }
        break;
      case "menfes":
      case "menfess":
      case "confess":
      case "confes":
        {
          if (m.isGroup) throw "Fitur Tidak Dapat Digunakan Di Group";
          if (!text)
            throw `Example : ${
              prefix + command
            } 6282xxxxx, nama samaran, pesan`;
          var mon = args.join(" ");
          var m1 = mon.split(",")[0] ? q.split(",")[0] : q;
          var m2 = mon.split(",")[1] ? q.split(",")[1] : q;
          var m3 = mon.split(",")[2] ? q.split(",")[2] : "";
          let kafloc = {
            key: {
              participant: "0@s.whatsapp.net",
              ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
            },
            message: {
              locationMessage: {
                name: `${global.ownername}`,
                jpegThumbnail: thumb,
              },
            },
          };
          let mq1 = m1 + "@s.whatsapp.net";
          let kawk = "PESAN RAHASIA";
          let ownernomer = global.owner;
          let ownernya = ownernomer + "@s.whatsapp.net";
          let me = m.sender;
          let ments = [mq1, ownernya, me];
          let pjtxt = `Dari : ${m2} \nUntuk : @${
            mq1.split("@")[0]
          }\n\nIsi Pesan : ${m3}`;
          let buttons = [
            {
              buttonId: `menfesconfirm ${m.sender}`,
              buttonText: { displayText: "✔️CONFIRM" },
              type: 1,
            },
          ];
          let buttons2 = [
            {
              buttonId: `heheh`,
              buttonText: { displayText: "❤️LIKE" },
              type: 1,
            },
          ];
          await razan.sendButtonText(
            m1 + "@s.whatsapp.net",
            buttons,
            pjtxt,
            kawk,
            m,
            { mentions: ments, quoted: kafloc }
          );
          let akhji = `Pesan Telah Terkirim\nKe @${mq1.split("@")[0]}`;

          await razan.sendButtonText(m.chat, buttons2, akhji, nyoutube, m, {
            mentions: ments,
          });
        }
        break;
      case "menfesconfirm":
        razan.sendMessage(q, {
          text: `Sudah Di Confirmasi Nih Menfess nyaa🤭`,
        });
        m.reply(`Terimakasih Menfess Telah Diterima.`);
        break;
      case "sticker":
      case "stiker":
      case "s":
      case "stickergif":
      case "sgif":
        {
          if (!quoted)
            throw `Balas Video/Image Dengan Caption ${prefix + command}`;
          m.reply(mess.wait);
          if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await razan.sendImageAsSticker(from, media, m, {
              packname: pushname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return m.reply("Maksimal 10 detik!");
            let media = await quoted.download();
            let encmedia = await razan.sendVideoAsSticker(from, media, m, {
              packname: pushname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else {
            throw `Kirim Gambar/Video Dengan Caption ${
              prefix + command
            }\nDurasi Video 1-9 Detik`;
          }
        }
        break;
      case "attp":
      case "ttp":
        {
          if (!text) throw `Example : ${prefix + command} text`;
          m.reply(mess.wait);
          await razan.sendMedia(
            from,
            `https://xteam.xyz/${command}?file&text=${text}`,
            "razan",
            "bot-md",
            m,
            { asSticker: true }
          );
        }
        break;
      case "ebinary":
        {
          if (!m.quoted.text && !text)
            throw `Kirim/reply text dengan caption ${prefix + command}`;
          let { eBinary } = require("./lib/binary");
          let teks = text
            ? text
            : m.quoted && m.quoted.text
            ? m.quoted.text
            : m.text;
          let eb = await eBinary(teks);
          m.reply(eb);
        }
        break;
      case "dbinary":
        {
          if (!m.quoted.text && !text)
            throw `Kirim/reply text dengan caption ${prefix + command}`;
          let { dBinary } = require("./lib/binary");
          let teks = text
            ? text
            : m.quoted && m.quoted.text
            ? m.quoted.text
            : m.text;
          let db = await dBinary(teks);
          m.reply(db);
        }
        break;
      case "emojimix":
        {
          if (!text) throw `Example : ${prefix + command} 😅+🤔`;
          let [emoji1, emoji2] = text.split`+`;
          let anu = await fetchJson(
            `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(
              emoji1
            )}_${encodeURIComponent(emoji2)}`
          );
          for (let res of anu.results) {
            let encmedia = await razan.sendImageAsSticker(from, res.url, m, {
              packname: global.packname,
              author: global.author,
              categories: res.tags,
            });
            await fs.unlinkSync(encmedia);
          }
        }
        break;
      case "toimage":
      case "toimg":
        {
          if (!quoted) throw "Reply Image";
          if (!/webp/.test(mime))
            throw `balas stiker dengan caption *${prefix + command}*`;
          m.reply(mess.wait);
          let media = await razan.downloadAndSaveMediaMessage(quoted);
          let ran = await getRandom(".png");
          exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) throw err;
            let buffer = fs.readFileSync(ran);
            razan.sendMessage(from, { image: buffer }, { quoted: m });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "tomp4":
      case "tovideo":
        {
          if (!quoted) throw "Reply Image";
          if (!/webp/.test(mime))
            throw `balas stiker dengan caption *${prefix + command}*`;
          m.reply(mess.wait);
          let { webp2mp4File } = require("./lib/uploader");
          let media = await razan.downloadAndSaveMediaMessage(quoted);
          let webpToMp4 = await webp2mp4File(media);
          await razan.sendMessage(
            from,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
            },
            { quoted: m }
          );
          await fs.unlinkSync(media);
        }
        break;
      case "toaud":
      case "toaudio":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
              prefix + command
            }`;
          if (!quoted)
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
              prefix + command
            }`;
          m.reply(mess.wait);
          let media = await quoted.download();
          let { toAudio } = require("./lib/converter");
          let audio = await toAudio(media, "mp4");
          razan.sendMessage(
            from,
            { audio: audio, mimetype: "audio/mpeg" },
            { quoted: m }
          );
        }
        break;
      case "tomp3":
        {
          if (/document/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
              prefix + command
            }`;
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
              prefix + command
            }`;
          if (!quoted)
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
              prefix + command
            }`;
          m.reply(mess.wait);
          let media = await quoted.download();
          let { toAudio } = require("./lib/converter");
          let audio = await toAudio(media, "mp4");
          razan.sendMessage(
            from,
            {
              document: audio,
              mimetype: "audio/mpeg",
              fileName: `Convert By ${razan.user.name}.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      case "tovn":
      case "toptt":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${
              prefix + command
            }`;
          if (!quoted)
            throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${
              prefix + command
            }`;
          m.reply(mess.wait);
          let media = await quoted.download();
          let { toPTT } = require("./lib/converter");
          let audio = await toPTT(media, "mp4");
          razan.sendMessage(
            from,
            { audio: audio, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;
      case "togif":
        {
          if (!quoted) throw "Reply Image";
          if (!/webp/.test(mime))
            throw `balas stiker dengan caption *${prefix + command}*`;
          m.reply(mess.wait);
          let { webp2mp4File } = require("./lib/uploader");
          let media = await razan.downloadAndSaveMediaMessage(quoted);
          let webpToMp4 = await webp2mp4File(media);
          await razan.sendMessage(
            from,
            {
              video: {
                url: webpToMp4.result,
                caption: "Convert Webp To Video",
              },
              gifPlayback: true,
            },
            { quoted: m }
          );
          await fs.unlinkSync(media);
        }
        break;
      case "tourl":
        {
          m.reply(mess.wait);
          let {
            UploadFileUgu,
            webp2mp4File,
            TelegraPh,
          } = require("./lib/uploader");
          let media = await razan.downloadAndSaveMediaMessage(quoted);
          if (/image/.test(mime)) {
            let anu = await TelegraPh(media);
            m.reply(util.format(anu));
          } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media);
            m.reply(util.format(anu));
          }
          await fs.unlinkSync(media);
        }
        break;
      case "imagenobg":
      case "removebg":
      case "remove-bg":
        {
          if (!quoted)
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (/webp/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let remobg = require("remove.bg");
          let apirnobg = [
            "q61faXzzR5zNU6cvcrwtUkRU",
            "S258diZhcuFJooAtHTaPEn4T",
            "5LjfCVAp4vVNYiTjq9mXJWHF",
            "aT7ibfUsGSwFyjaPZ9eoJc61",
            "BY63t7Vx2tS68YZFY6AJ4HHF",
            "5Gdq1sSWSeyZzPMHqz7ENfi8",
            "86h6d6u4AXrst4BVMD9dzdGZ",
            "xp8pSDavAgfE5XScqXo9UKHF",
            "dWbCoCb3TacCP93imNEcPxcL",
          ];
          let apinobg = apirnobg[Math.floor(Math.random() * apirnobg.length)];
          hmm = (await "./src/remobg-") + getRandom("");
          localFile = await razan.downloadAndSaveMediaMessage(quoted, hmm);
          outputFile = (await "./src/hremo-") + getRandom(".png");
          m.reply(mess.wait);
          remobg
            .removeBackgroundFromImageFile({
              path: localFile,
              apiKey: apinobg,
              size: "regular",
              type: "auto",
              scale: "100%",
              outputFile,
            })
            .then(async (result) => {
              razan.sendMessage(
                from,
                { image: fs.readFileSync(outputFile), caption: mess.success },
                { quoted: m }
              );
              await fs.unlinkSync(localFile);
              await fs.unlinkSync(outputFile);
            });
        }
        break;
      case "yts":
      case "ytsearch":
        {
          if (!text) throw `Example : ${prefix + command} story wa anime`;
          let yts = require("yt-search");
          let search = await yts(text);
          let teks = "YouTube Search\n\n Result From " + text + "\n\n";
          let no = 1;
          for (let i of search.all) {
            teks += `⭔ No : ${no++}\n⭔ Type : ${i.type}\n⭔ Video ID : ${
              i.videoId
            }\n⭔ Title : ${i.title}\n⭔ Views : ${i.views}\n⭔ Duration : ${
              i.timestamp
            }\n⭔ Upload At : ${i.ago}\n⭔ Author : ${i.author.name}\n⭔ Url : ${
              i.url
            }\n\n─────────────────\n\n`;
          }
          razan.sendMessage(
            from,
            { image: { url: search.all[0].thumbnail }, caption: teks },
            { quoted: m }
          );
        }
        break;
      case "google":
        {
          if (!text) throw `Example : ${prefix + command} fatih arridho`;
          let google = require("google-it");
          google({ query: text }).then((res) => {
            let teks = `Google Search From : ${text}\n\n`;
            for (let g of res) {
              teks += `⌕ *Title* : ${g.title}\n`;
              teks += `⌕ *Description* : ${g.snippet}\n`;
              teks += `⌕ *Link* : ${g.link}\n\n────────────────────────\n\n`;
            }
            m.reply(teks);
          });
        }
        break;
      case "gimage":
        {
          if (!text) throw `Example : ${prefix + command} kaori cicak`;
          let gis = require("g-i-s");
          gis(text, async (error, result) => {
            n = result;
            images = n[Math.floor(Math.random() * n.length)].url;
            let buttons = [
              {
                buttonId: `gimage ${text}`,
                buttonText: { displayText: "Next Image" },
                type: 1,
              },
            ];
            let buttonMessage = {
              image: { url: images },
              caption: `*-------「 GIMAGE SEARCH 」-------*
🤠 *Query* : ${text}
🔗 *Media Url* : ${images}`,
              footer: razan.user.name,
              buttons: buttons,
              headerType: 4,
            };
            razan.sendMessage(from, buttonMessage, { quoted: m });
          });
        }
        break;
      case "dashboard":
        addCountCmd("#dashboard", sender, _cmd);
        var posi = await getPosiCmdUser(sender, _cmdUser);
        _cmdUser[posi].db.sort((a, b) => (a.count < b.count ? 1 : -1));
        _cmd.sort((a, b) => (a.count < b.count ? 1 : -1));
        var posi = await getPosiCmdUser(sender, _cmdUser);
        var jumlahCmd = _cmd.length;
        if (jumlahCmd > 10) jumlahCmd = 10;
        var jumlah = _cmdUser[posi].db.length;
        if (jumlah > 5) jumlah = 5;
        var totalUser = 0;
        for (let x of _cmdUser[posi].db) {
          totalUser = totalUser + x.count;
        }
        var total = 0;
        for (let o of _cmd) {
          total = total + o.count;
        }
        var teks = `*RAZAN BOT DASHBOARD*\n\n*HIT*\n• GLOBAL : ${total}\n• USER : ${totalUser}\n\n`;
        teks += `*Most Command Global*\n`;
        for (let u = 0; u < jumlahCmd; u++) {
          teks += `• ${_cmd[u].nama} : ${_cmd[u].count}\n`;
        }
        teks += `\n*Most Command User*\n`;
        for (let i = 0; i < jumlah; i++) {
          teks += `• ${_cmdUser[posi].db[i].nama} : ${_cmdUser[posi].db[i].count}\n`;
        }
        m.reply(teks);
        break;
      case "play":
      case "ytplay":
        {
          if (!text) throw `Example : ${prefix + command} story wa anime`;
          let yts = require("yt-search");
          let search = await yts(text);
          let anu =
            search.videos[Math.floor(Math.random() * search.videos.length)];
          //const anu = fetchJson(`https://danzzapi.xyz/api/downloader/ytplay?query=${text}&apikey=${setting.danzzkey}`)
          let buttons = [
            {
              buttonId: `ytmp3 ${anu.url}`,
              buttonText: { displayText: "🎶 Audio" },
              type: 1,
            },
            {
              buttonId: `ytmp4 ${anu.url}`,
              buttonText: { displayText: "🎥 Video" },
              type: 1,
            },
          ];

          let buttonMessage = {
            image: { url: anu.thumbnail },
            caption: `
⭔ Title : ${anu.title}
⭔ Ext : Search
⭔ ID : ${anu.videoId}
⭔ Duration : ${anu.timestamp}
⭔ Viewers : ${anu.views}
⭔ Upload At : ${anu.ago}
⭔ Author : ${anu.author.name}
⭔ Channel : ${anu.author.url}
⭔ Description : ${anu.description}
⭔ Url : ${anu.url}`,
            footer: wm,
            buttons: buttons,
            headerType: 4,
          };
          razan.sendMessage(from, buttonMessage, { quoted: m });
        }
        break;
      case "ytmp3":
      case "ytaudio":
        {
          addCountCmd(`#${command.slice(1)}`, sender, _cmd);
          let { yta } = require("./lib/y2mate");
          if (!text)
            throw `Example : ${
              prefix + command
            } https://youtube.com/watch?v=PtFMh6Tccag%27 128kbps`;
          let quality = args[1] ? args[1] : "128kbps";
          let media = await yta(text, quality);
          if (media.filesize >= 100000)
            return m.reply(
              `File Melebihi Batas\n\n⌕ Title : ${media.title}\n⌕ File Size : ${media.filesizeF}`
            );
          razan.sendImage(
            from,
            media.thumb,
            `⌕ Title : ${media.title}\n⌕ File Size : ${
              media.filesizeF
            }\n⌕ Url : ${isUrl(text)}\n⌕ Ext : MP3\n⌕ Resolusi : ${
              args[1] || "128kbps"
            }`,
            m
          );
          razan.sendMessage(
            from,
            {
              document: await getBuffer(media.dl_link),
              mimetype: "audio/mpeg",
              fileName: `${media.title}.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      /**case 'youtubemp3': case 'ytaudio': case 'ytmp3': {
  if (!url) throw `Example : ${prefix + command} title`
     m.reply(mess.wait)
     let ytmp3 = await fetchJson(`https://danzzapi.xyz/api/downloader/ytplaymp3?query=the shade&apikey=${setting.danzz}`)
     let baper = await getBuffer(ytmp3.result.url)
      razan.sendMessage(from, { audio: { url: baper },
      mimetype: 'audio/mpeg'}, { quoted: m })
  }
break*/
      case "ytmp4":
      case "ytvideo":
        {
          addCountCmd(`#${command.slice(1)}`, sender, _cmd);
          let { ytv } = require("./lib/y2mate");
          if (!text)
            throw `Example : ${
              prefix + command
            } https://youtube.com/watch?v=PtFMh6Tccag%27 360p`;
          let quality = args[1] ? args[1] : "360p";
          let media = await ytv(text, quality);
          if (media.filesize >= 100000)
            return m.reply("File Melebihi Batas " + util.format(media));
          razan.sendMessage(
            from,
            {
              video: { url: media.dl_link },
              mimetype: "video/mp4",
              fileName: `${media.title}.mp4`,
              caption: `⌕ Title : ${media.title}\n⌕ File Size : ${
                media.filesizeF
              }\n⌕ Url : ${isUrl(text)}\n⌕ Ext : MP3\n⌕ Resolusi : ${
                args[1] || "360p"
              }`,
            },
            { quoted: m }
          );
        }
        break;
      case "getmusic":
        {
          let { yta } = require("./lib/y2mate");
          if (!text) throw `Example : ${prefix + command} 1`;
          if (!m.quoted) return m.reply("Reply Pesan");
          if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`;
          let urls = quoted.text.match(
            new RegExp(
              /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/,
              "gi"
            )
          );
          if (!urls)
            throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`;
          let quality = args[1] ? args[1] : "128kbps";
          let media = await yta(urls[text - 1], quality);
          if (media.filesize >= 100000)
            return m.reply("File Melebihi Batas " + util.format(media));
          razan.sendImage(
            from,
            media.thumb,
            `⌕ Title : ${media.title}\n⌕ File Size : ${
              media.filesizeF
            }\n⌕ Url : ${urls[text - 1]}\n⌕ Ext : MP3\n⌕ Resolusi : ${
              args[1] || "128kbps"
            }`,
            m
          );
          razan.sendMessage(
            from,
            {
              document: await getBuffer(media.dl_link),
              mimetype: "audio/mpeg",
              fileName: `${media.title}.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      case "getvideo":
        {
          let { ytv } = require("./lib/y2mate");
          if (!text) throw `Example : ${prefix + command} 1`;
          if (!m.quoted) return m.reply("Reply Pesan");
          if (!m.quoted.isBaileys) throw `Hanya Bisa Membalas Pesan Dari Bot`;
          let urls = quoted.text.match(
            new RegExp(
              /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/,
              "gi"
            )
          );
          if (!urls)
            throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`;
          let quality = args[1] ? args[1] : "360p";
          let media = await ytv(urls[text - 1], quality);
          if (media.filesize >= 100000)
            return m.reply("File Melebihi Batas " + util.format(media));
          razan.sendMessage(
            from,
            {
              video: { url: media.dl_link },
              mimetype: "video/mp4",
              fileName: `${media.title}.mp4`,
              caption: `⌕ Title : ${media.title}\n⌕ File Size : ${
                media.filesizeF
              }\n⌕ Url : ${urls[text - 1]}\n⌕ Ext : MP3\n⌕ Resolusi : ${
                args[1] || "360p"
              }`,
            },
            { quoted: m }
          );
        }
        break;
      case "pinterest":
        {
          if (!text) throw `Example : ${prefix + command}`;
          m.reply(mess.wait);
          let { pinterest } = require("./lib/scraper");
          anu = await pinterest(text);
          result = anu[Math.floor(Math.random() * anu.length)];
          let buttons = [
            {
              buttonId: `pinterest ${text}`,
              buttonText: { displayText: "► NEXT" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: result },
            caption: `*Klik Next Untuk Melanjutkan*`,
            footer: razan.user.name,
            buttons: buttons,
            headerType: 4,
          };
          razan.sendMessage(from, buttonMessage, { quoted: m });
        }
        break;
      case "anime":
      case "waifu":
      case "husbu":
      case "neko":
      case "shinobu":
        {
          const anime = await getBuffer(
            `https://zenzapis.xyz/randomanime/${command}?apikey=${global.zenzapi}`
          );
          m.reply(mess.wait);
          razan.sendMessage(
            from,
            { image: anime, caption: "Generate Random " + command },
            { quoted: m }
          );
        }
        break;
      case "couple":
        {
          m.reply(mess.wait);
          let anu = await fetchJson(
            "https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json"
          );
          let random = anu[Math.floor(Math.random() * anu.length)];
          razan.sendMessage(
            from,
            { image: { url: random.male }, caption: `Couple Male` },
            { quoted: m }
          );
          razan.sendMessage(
            from,
            { image: { url: random.female }, caption: `Couple Female` },
            { quoted: m }
          );
        }
        break;
      case "coffe":
      case "kopi":
        {
          let buttons = [
            {
              buttonId: `coffe`,
              buttonText: { displayText: "Next Image" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: "https://coffee.alexflipnote.dev/random" },
            caption: `☕ Random Coffe`,
            footer: razan.user.name,
            buttons: buttons,
            headerType: 4,
          };
          razan.sendMessage(from, buttonMessage, { quoted: m });
        }
        break;
      case "wallpaper":
        {
          if (!text) throw "Masukkan Query Title";
          let { wallpaper } = require("./lib/scraper");
          anu = await wallpaper(text);
          result = anu[Math.floor(Math.random() * anu.length)];
          let buttons = [
            {
              buttonId: `wallpaper ${text}`,
              buttonText: { displayText: "Next Image" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: result.image[0] },
            caption: `⌕ Title : ${result.title}\n⌕ Category : ${
              result.type
            }\n⌕ Detail : ${result.source}\n⌕ Media Url : ${
              result.image[2] || result.image[1] || result.image[0]
            }`,
            footer: razan.user.name,
            buttons: buttons,
            headerType: 4,
          };
          razan.sendMessage(from, buttonMessage, { quoted: m });
        }
        break;
      case "wikimedia":
        {
          if (!text) throw "Masukkan Query Title";
          let { wikimedia } = require("./lib/scraper");
          anu = await wikimedia(text);
          result = anu[Math.floor(Math.random() * anu.length)];
          let buttons = [
            {
              buttonId: `wikimedia ${text}`,
              buttonText: { displayText: "Next Image" },
              type: 1,
            },
          ];
          let buttonMessage = {
            image: { url: result.image },
            caption: `⌕ Title : ${result.title}\n⌕ Source : ${result.source}\n⌕ Media Url : ${result.image}`,
            footer: razan.user.name,
            buttons: buttons,
            headerType: 4,
          };
          razan.sendMessage(from, buttonMessage, { quoted: m });
        }
        break;
      case "quotesanime":
      case "quoteanime":
        {
          let { quotesAnime } = require("./lib/scraper");
          let anu = await quotesAnime();
          result = anu[Math.floor(Math.random() * anu.length)];
          let buttons = [
            {
              buttonId: `quotesanime`,
              buttonText: { displayText: "Next" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: `~_${result.quotes}_\n\nBy '${result.karakter}', ${result.anime}\n\n- ${result.up_at}`,
            footer: "Press The Button Below",
            buttons: buttons,
            headerType: 2,
          };
          razan.sendMessage(from, buttonMessage, { quoted: m });
        }
        break;
      case "truth":
        {
          let anu = await fetchJson(
            `https://danzzapi.xyz/api/fun/truth?apikey=razanxx`
          );
          razan.sendMessage(
            from,
            { text: `*Truthnya adalah :*\n${anu.result}` },
            { quoted: m }
          );
        }
        break;
      case "dare":
        {
          let anu = await fetchJson(
            `https://danzzapi.xyz/api/fun/dare?apikey=${setting.danzzkey}`
          );
          razan.sendMessage(
            from,
            { text: `*Darenya adalah :*\n${anu.result}` },
            { quoted: m }
          );
        }
        break;
      case "rate":
      case "Rate":
        {
          if (!text) throw `Example : ${prefix + command} text`;
          let anu = await fetchJson(
            `https://danzzapi.xyz/api/fun/rate?option=${text}&apikey=razanxx`
          );
          let temtxt = `⌈  *RATE*  ⌋

Pesan : ${text}
Rate : ${anu.result}`;
          razan.sendMessage(from, { text: temtxt }, { quoted: m });
        }
        break;
      case "motivasi":
      case "dilanquote":
      case "bucinquote":
      case "katasenja":
      case "puisi":
        {
          let anu = await fetchJson(
            `https://api.lolhuman.xyz/api/random/${command}?apikey=${setting.lolkey}`
          );
          let buttons = [
            {
              buttonId: `motivasi`,
              buttonText: { displayText: "Next" },
              type: 1,
            },
          ];
          let buttonMessage = {
            text: anu.result.message,
            footer: "Press The Button Below",
            buttons: buttons,
            headerType: 2,
          };
          razan.sendMessage(from, buttonMessage, { quoted: m });
        }
        break;

      //────────────────────[ TEXT PROO ]────────────────────

      case "neon":
      case "snowtext":
      case "cloudtext":
      case "3dluxury":
      case "3dgradient":
      case "blackpink":
      case "realisticvintage":
      case "realisticloud":
      case "cloudsky":
      case "sandsummerbeach":
      case "sandwriting":
      case "sandengraved":
      case "ballontext":
      case "3dglue":
      case "space3d":
      case "metaldarkgold":
      case "glitch":
      case "neongalaxy":
      case "1917text":
      case "minion3d":
      case "holographic3d":
      case "metalpurple":
      case "duluxesilver":
      case "bluemetal":
      case "duluxegold":
      case "glossycarbon":
      case "febric":
      case "stone":
      case "pornhub":
      case "3davengers":
      case "marvelstudios":
      case "marvel":
      case "happynewyear":
      case "newyear3d":
      case "neontext":
      case "darkgoldeffect":
      case "hollowenfire":
      case "bloodtext":
      case "xmas3d":
      case "3dmetalsilver":
      case "3drosegold":
      case "3dmetalgold":
      case "3dmetalgalaxy":
      case "lionlogo":
      case "wolflogoblack":
      case "wolflogogalaxy":
      case "ninjalogo":
      case "jokerlogo":
      case "wicker":
      case "naturalleaves":
      case "fireworksparkle":
      case "skeleton":
      case "redfoilballon":
      case "purplefoilballon":
      case "pinkfoilballon":
      case "greenfoilballon":
      case "cyanfoilballon":
      case "bluefoilballon":
      case "goldfoilballon":
      case "steel":
      case "ultragloss":
      case "denim":
      case "decorategreen":
      case "decoratepurple":
      case "peridotstone":
      case "rock":
      case "lava":
      case "yellowglass":
      case "purpleglass":
      case "orangeglass":
      case "greenglass":
      case "blueglass":
      case "redglass":
      case "purpleshinyglass":
      case "captainamerica":
      case "robotr2d2":
      case "toxic":
      case "rainbowequalizier":
      case "pinksparklingjewelry":
        {
          if (!text) throw `Example : ${prefix + command} text`;
          m.reply(mess.wait);
          anu = await getBuffer(
            `https://xteam.xyz/textpro/${command}?text=${text}&APIKEY=${global.xteam}`
          );
          razan
            .sendMessage(
              from,
              { image: anu, caption: `Text Pro ${command}` },
              { quoted: m }
            )
            .catch((err) => m.reply("Maaf server Xteam sedang down"));
        }
        break;

      //────────────────────[ PRIMBON ]────────────────────

      case "nomerhoki":
      case "nomorhoki":
        {
          if (!Number(text))
            throw `Example : ${prefix + command} 6288292024190`;
          let anu = await primbon.nomer_hoki(Number(text));
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nomor HP :* ${anu.message.nomer_hp}\n⌕ *Angka Shuzi :* ${anu.message.angka_shuzi}\n⌕ *Energi Positif :*\n- Kekayaan : ${anu.message.energi_positif.kekayaan}\n- Kesehatan : ${anu.message.energi_positif.kesehatan}\n- Cinta : ${anu.message.energi_positif.cinta}\n- Kestabilan : ${anu.message.energi_positif.kestabilan}\n- Persentase : ${anu.message.energi_positif.persentase}\n⌕ *Energi Negatif :*\n- Perselisihan : ${anu.message.energi_negatif.perselisihan}\n- Kehilangan : ${anu.message.energi_negatif.kehilangan}\n- Malapetaka : ${anu.message.energi_negatif.malapetaka}\n- Kehancuran : ${anu.message.energi_negatif.kehancuran}\n- Persentase : ${anu.message.energi_negatif.persentase}`,
            m
          );
        }
        break;
      case "artimimpi":
      case "tafsirmimpi":
        {
          if (!text) throw `Example : ${prefix + command} belanja`;
          let anu = await primbon.tafsir_mimpi(text);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Mimpi :* ${anu.message.mimpi}\n⌕ *Arti :* ${anu.message.arti}\n⌕ *Solusi :* ${anu.message.solusi}`,
            m
          );
        }
        break;
      case "ramalanjodoh":
      case "ramaljodoh":
        {
          let [nama1, nama2] = text.split`,`;
          let anu = await fetchJson(
            `https://danzzapi.xyz/api/primbon/ramalanjodoh?name1=${nama1}&name2=${nama2}&apikey=${setting.danzzkey}`
          );
          if (!text) throw `Example : ${prefix + command} Nama1, Nama2`;
          //let anu = await primbon.ramalan_jodoh(nama1, nama2)
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama Anda :* ${nama1}\n⌕ *Nama Pasangan :* ${nama2}\n\n⌕ *Positif :* ${anu.result.positif}\n⌕ *Negatif :* ${anu.result.negatif}`
          );
        }
        break;
      case "suamiistri":
        {
          if (!text)
            throw `Example : ${
              prefix + command
            } Dika, 7, 7, 2005, Novia, 16, 11, 2004`;
          let [
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2,
          ] = text.split`,`;
          let anu = await primbon.suami_istri(
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2
          );
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama Suami :* ${anu.message.suami.nama}\n⌕ *Lahir Suami :* ${anu.message.suami.tgl_lahir}\n⌕ *Nama Istri :* ${anu.message.istri.nama}\n⌕ *Lahir Istri :* ${anu.message.istri.tgl_lahir}\n⌕ *Hasil :* ${anu.message.result}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "ramalancinta":
      case "ramalcinta":
        {
          if (!text)
            throw `Example : ${
              prefix + command
            } Dika, 7, 7, 2005, Novia, 16, 11, 2004`;
          let [
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2,
          ] = text.split`,`;
          let anu = await primbon.ramalan_cinta(
            nama1,
            tgl1,
            bln1,
            thn1,
            nama2,
            tgl2,
            bln2,
            thn2
          );
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama Anda :* ${anu.message.nama_anda.nama}\n⌕ *Lahir Anda :* ${anu.message.nama_anda.tgl_lahir}\n⌕ *Nama Pasangan :* ${anu.message.nama_pasangan.nama}\n⌕ *Lahir Pasangan :* ${anu.message.nama_pasangan.tgl_lahir}\n⌕ *Sisi Positif :* ${anu.message.sisi_positif}\n⌕ *Sisi Negatif :* ${anu.message.sisi_negatif}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "artinama":
        {
          if (!text) throw `Example : ${prefix + command} Dika Ardianta`;
          let anu = await primbon.arti_nama(text);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama :* ${anu.message.nama}\n⌕ *Arti :* ${anu.message.arti}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "kecocokannama":
      case "cocoknama":
        {
          if (!text) throw `Example : ${prefix + command} Dika, 7, 7, 2005`;
          let [nama, tgl, bln, thn] = text.split`,`;
          let anu = await primbon.kecocokan_nama(nama, tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama :* ${anu.message.nama}\n⌕ *Lahir :* ${anu.message.tgl_lahir}\n⌕ *Life Path :* ${anu.message.life_path}\n⌕ *Destiny :* ${anu.message.destiny}\n⌕ *Destiny Desire :* ${anu.message.destiny_desire}\n⌕ *Personality :* ${anu.message.personality}\n⌕ *Persentase :* ${anu.message.persentase_kecocokan}`,
            m
          );
        }
        break;
      case "kecocokanpasangan":
      case "cocokpasangan":
      case "pasangan":
        {
          if (!text) throw `Example : ${prefix + command} Dika|Novia`;
          let [nama1, nama2] = text.split`|`;
          let anu = await primbon.kecocokan_nama_pasangan(nama1, nama2);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendImage(
            from,
            anu.message.gambar,
            `⌕ *Nama Anda :* ${anu.message.nama_anda}\n⌕ *Nama Pasangan :* ${anu.message.nama_pasangan}\n⌕ *Sisi Positif :* ${anu.message.sisi_positif}\n⌕ *Sisi Negatif :* ${anu.message.sisi_negatif}`,
            m
          );
        }
        break;
      case "jadianpernikahan":
      case "jadiannikah":
        {
          if (!text) throw `Example : ${prefix + command} 6, 12, 2020`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.tanggal_jadian_pernikahan(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Tanggal Pernikahan :* ${anu.message.tanggal}\n⌕ *karakteristik :* ${anu.message.karakteristik}`,
            m
          );
        }
        break;
      case "sifatusaha":
        {
          if (!ext) throw `Example : ${prefix + command} 28, 12, 2021`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.sifat_usaha_bisnis(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Lahir :* ${anu.message.hari_lahir}\n⌕ *Usaha :* ${anu.message.usaha}`,
            m
          );
        }
        break;
      case "rejeki":
      case "rezeki":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.rejeki_hoki_weton(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Lahir :* ${anu.message.hari_lahir}\n⌕ *Rezeki :* ${anu.message.rejeki}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "pekerjaan":
      case "kerja":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.pekerjaan_weton_lahir(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Lahir :* ${anu.message.hari_lahir}\n⌕ *Pekerjaan :* ${anu.message.pekerjaan}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "ramalannasib":
      case "ramalnasib":
      case "nasib":
        {
          if (!text) throw `Example : 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.ramalan_nasib(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Analisa :* ${anu.message.analisa}\n⌕ *Angka Akar :* ${anu.message.angka_akar}\n⌕ *Sifat :* ${anu.message.sifat}\n⌕ *Elemen :* ${anu.message.elemen}\n⌕ *Angka Keberuntungan :* ${anu.message.angka_keberuntungan}`,
            m
          );
        }
        break;
      case "potensipenyakit":
      case "penyakit":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.cek_potensi_penyakit(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Analisa :* ${anu.message.analisa}\n⌕ *Sektor :* ${anu.message.sektor}\n⌕ *Elemen :* ${anu.message.elemen}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "artitarot":
      case "tarot":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.arti_kartu_tarot(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendImage(
            from,
            anu.message.image,
            `⌕ *Lahir :* ${anu.message.tgl_lahir}\n⌕ *Simbol Tarot :* ${anu.message.simbol_tarot}\n⌕ *Arti :* ${anu.message.arti}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "fengshui":
        {
          if (!text)
            throw `Example : ${prefix + command} Dika, 1, 2005\n\nNote : ${
              prefix + command
            } Nama, gender, tahun lahir\nGender : 1 untuk laki-laki & 2 untuk perempuan`;
          let [nama, gender, tahun] = text.split`,`;
          let anu = await primbon.perhitungan_feng_shui(nama, gender, tahun);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama :* ${anu.message.nama}\n⌕ *Lahir :* ${anu.message.tahun_lahir}\n⌕ *Gender :* ${anu.message.jenis_kelamin}\n⌕ *Angka Kua :* ${anu.message.angka_kua}\n⌕ *Kelompok :* ${anu.message.kelompok}\n⌕ *Karakter :* ${anu.message.karakter}\n⌕ *Sektor Baik :* ${anu.message.sektor_baik}\n⌕ *Sektor Buruk :* ${anu.message.sektor_buruk}`,
            m
          );
        }
        break;
      case "haribaik":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.petung_hari_baik(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Lahir :* ${anu.message.tgl_lahir}\n⌕ *Kala Tinantang :* ${anu.message.kala_tinantang}\n⌕ *Info :* ${anu.message.info}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "harisangar":
      case "taliwangke":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.hari_sangar_taliwangke(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Lahir :* ${anu.message.tgl_lahir}\n⌕ *Hasil :* ${anu.message.result}\n⌕ *Info :* ${anu.message.info}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "harinaas":
      case "harisial":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.primbon_hari_naas(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Hari Lahir :* ${anu.message.hari_lahir}\n⌕ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⌕ *Hari Naas :* ${anu.message.hari_naas}\n⌕ *Info :* ${anu.message.catatan}\n⌕ *Catatan :* ${anu.message.info}`,
            m
          );
        }
        break;
      case "nagahari":
      case "harinaga":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.rahasia_naga_hari(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Hari Lahir :* ${anu.message.hari_lahir}\n⌕ *Tanggal Lahir :* ${anu.message.tgl_lahir}\n⌕ *Arah Naga Hari :* ${anu.message.arah_naga_hari}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "arahrejeki":
      case "arahrezeki":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.primbon_arah_rejeki(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Hari Lahir :* ${anu.message.hari_lahir}\n⌕ *tanggal Lahir :* ${anu.message.tgl_lahir}\n⌕ *Arah Rezeki :* ${anu.message.arah_rejeki}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "peruntungan":
        {
          if (!text)
            throw `Example : ${
              prefix + command
            } DIka, 7, 7, 2005, 2022\n\nNote : ${
              prefix + command
            } Nama, tanggal lahir, bulan lahir, tahun lahir, untuk tahun`;
          let [nama, tgl, bln, thn, untuk] = text.split`,`;
          let anu = await primbon.ramalan_peruntungan(
            nama,
            tgl,
            bln,
            thn,
            untuk
          );
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama :* ${anu.message.nama}\n⌕ *Lahir :* ${anu.message.tgl_lahir}\n⌕ *Peruntungan Tahun :* ${anu.message.peruntungan_tahun}\n⌕ *Hasil :* ${anu.message.result}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "weton":
      case "wetonjawa":
        {
          if (!text) throw `Example : ${prefix + command} 7, 7, 2005`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.weton_jawa(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Tanggal :* ${anu.message.tanggal}\n⌕ *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n⌕ *Watak Hari :* ${anu.message.watak_hari}\n⌕ *Naga Hari :* ${anu.message.naga_hari}\n⌕ *Jam Baik :* ${anu.message.jam_baik}\n⌕ *Watak Kelahiran :* ${anu.message.watak_kelahiran}`,
            m
          );
        }
        break;
      case "sifat":
      case "karakter":
        {
          if (!text) throw `Example : ${prefix + command} Dika, 7, 7, 2005`;
          let [nama, tgl, bln, thn] = text.split`,`;
          let anu = await primbon.sifat_karakter_tanggal_lahir(
            nama,
            tgl,
            bln,
            thn
          );
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama :* ${anu.message.nama}\n⌕ *Lahir :* ${anu.message.tgl_lahir}\n⌕ *Garis Hidup :* ${anu.message.garis_hidup}`,
            m
          );
        }
        break;
      case "keberuntungan":
        {
          if (!text) throw `Example : ${prefix + command} Dika, 7, 7, 2005`;
          let [nama, tgl, bln, thn] = text.split`,`;
          let anu = await primbon.potensi_keberuntungan(nama, tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Nama :* ${anu.message.nama}\n⌕ *Lahir :* ${anu.message.tgl_lahir}\n⌕ *Hasil :* ${anu.message.result}`,
            m
          );
        }
        break;
      case "memancing":
        {
          if (!text) throw `Example : ${prefix + command} 12, 1, 2022`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.primbon_memancing_ikan(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Tanggal :* ${anu.message.tgl_memancing}\n⌕ *Hasil :* ${anu.message.result}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "masasubur":
        {
          if (!text)
            throw `Example : ${prefix + command} 12, 1, 2022, 28\n\nNote : ${
              prefix + command
            } hari pertama menstruasi, siklus`;
          let [tgl, bln, thn, siklus] = text.split`,`;
          let anu = await primbon.masa_subur(tgl, bln, thn, siklus);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Hasil :* ${anu.message.result}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "zodiak":
      case "zodiac":
        {
          if (!text) throw `Example : ${prefix + command} 7 7 2005`;
          let zodiak = [
            ["capricorn", new Date(1970, 0, 1)],
            ["aquarius", new Date(1970, 0, 20)],
            ["pisces", new Date(1970, 1, 19)],
            ["aries", new Date(1970, 2, 21)],
            ["taurus", new Date(1970, 3, 21)],
            ["gemini", new Date(1970, 4, 21)],
            ["cancer", new Date(1970, 5, 22)],
            ["leo", new Date(1970, 6, 23)],
            ["virgo", new Date(1970, 7, 23)],
            ["libra", new Date(1970, 8, 23)],
            ["scorpio", new Date(1970, 9, 23)],
            ["sagittarius", new Date(1970, 10, 22)],
            ["capricorn", new Date(1970, 11, 22)],
          ].reverse();

          function getZodiac(month, day) {
            let d = new Date(1970, month - 1, day);
            return zodiak.find(([_, _d]) => d >= _d)[0];
          }
          let date = new Date(text);
          if (date == "Invalid Date") throw date;
          let d = new Date();
          let [tahun, bulan, tanggal] = [
            d.getFullYear(),
            d.getMonth() + 1,
            d.getDate(),
          ];
          let birth = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

          let zodiac = await getZodiac(birth[1], birth[2]);

          let anu = await primbon.zodiak(zodiac);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(
            from,
            `⌕ *Zodiak :* ${anu.message.zodiak}\n⌕ *Nomor :* ${anu.message.nomor_keberuntungan}\n⌕ *Aroma :* ${anu.message.aroma_keberuntungan}\n⌕ *Planet :* ${anu.message.planet_yang_mengitari}\n⌕ *Bunga :* ${anu.message.bunga_keberuntungan}\n⌕ *Warna :* ${anu.message.warna_keberuntungan}\n⌕ *Batu :* ${anu.message.batu_keberuntungan}\n⌕ *Elemen :* ${anu.message.elemen_keberuntungan}\n⌕ *Pasangan Zodiak :* ${anu.message.pasangan_zodiak}\n⌕ *Catatan :* ${anu.message.catatan}`,
            m
          );
        }
        break;
      case "shio":
        {
          if (!text)
            throw `Example : ${
              prefix + command
            } tikus\n\nNote : For Detail https://primbon.com/shio.htm`;
          let anu = await primbon.shio(text);
          if (anu.status == false) return m.reply(anu.message);
          razan.sendText(from, `⌕ *Hasil :* ${anu.message}`, m);
        }
        break;
      case "stalker":
      case "stalk":
        {
          if (!isPremium && global.db.data.users[m.sender].limit < 1)
            return m.reply("Limit Harian Anda Telah Habis");
          if (!text)
            return m.reply(
              `Example : ${
                prefix + command
              } type id\n\nList Type :\n1. ff (Free Fire)\n2. ml (Mobile Legends)\n3. aov (Arena Of Valor)\n4. cod (Call Of Duty)\n5. pb (point Blank)\n6. ig (Instagram)\n7. npm (https://npmjs.com)`
            );
          let [type, id, zone] = args;
          if (type.toLowerCase() == "ff") {
            if (!id)
              throw `No Query id, Example ${prefix + command} ff 552992060`;
            let anu = await fetchJson(
              api("zenz", "/api/nickff", {
                apikey: global.APIKeys[global.APIs["zenz"]],
                query: id,
              })
            );
            if (anu.status == false) return m.reply(anu.result.message);
            m.reply(
              `ID : ${anu.result.gameId}\nUsername : ${anu.result.userName}`
            );
            db.data.users[m.sender].limit -= 1;
          } else if (type.toLowerCase() == "ml") {
            if (!id)
              throw `No Query id, Example : ${
                prefix + command
              } ml 214885010 2253`;
            if (!zone)
              throw `No Query id, Example : ${
                prefix + command
              } ml 214885010 2253`;
            let anu = await fetchJson(
              api("zenz", "/api/nickml", {
                apikey: global.APIKeys[global.APIs["zenz"]],
                query: id,
                query2: zone,
              })
            );
            if (anu.status == false) return m.reply(anu.result.message);
            m.reply(
              `ID : ${anu.result.gameId}\nZone : ${anu.result.zoneId}\nUsername : ${anu.result.userName}`
            );
            db.data.users[m.sender].limit -= 1;
          } else if (type.toLowerCase() == "aov") {
            if (!id)
              throw `No Query id, Example ${
                prefix + command
              } aov 293306941441181`;
            let anu = await fetchJson(
              api("zenz", "/api/nickaov", {
                apikey: global.APIKeys[global.APIs["zenz"]],
                query: id,
              })
            );
            if (anu.status == false) return m.reply(anu.result.message);
            m.reply(
              `ID : ${anu.result.gameId}\nUsername : ${anu.result.userName}`
            );
            db.data.users[m.sender].limit -= 1;
          } else if (type.toLowerCase() == "cod") {
            if (!id)
              throw `No Query id, Example ${
                prefix + command
              } cod 6290150021186841472`;
            let anu = await fetchJson(
              api("zenz", "/api/nickcod", {
                apikey: global.APIKeys[global.APIs["zenz"]],
                query: id,
              })
            );
            if (anu.status == false) return m.reply(anu.result.message);
            m.reply(
              `ID : ${anu.result.gameId}\nUsername : ${anu.result.userName}`
            );
            db.data.users[m.sender].limit -= 1;
          } else if (type.toLowerCase() == "pb") {
            if (!id) throw `No Query id, Example ${prefix + command} pb riio46`;
            let anu = await fetchJson(
              api("zenz", "/api/nickpb", {
                apikey: global.APIKeys[global.APIs["zenz"]],
                query: id,
              })
            );
            if (anu.status == false) return m.reply(anu.result.message);
            m.reply(
              `ID : ${anu.result.gameId}\nUsername : ${anu.result.userName}`
            );
            db.data.users[m.sender].limit -= 1;
          } else if (type.toLowerCase() == "ig") {
            if (!id)
              throw `No Query username, Example : ${
                prefix + command
              } ig cak_haho`;
            let { result: anu } = await fetchJson(
              api("zenz", "/api/stalker/ig", { username: id }, "apikey")
            );
            if (anu.status == false) return m.reply(anu.result.message);
            razan.sendMedia(
              from,
              anu.caption.profile_hd,
              "",
              `⌕ Full Name : ${anu.caption.full_name}\n⌕ User Name : ${anu.caption.user_name}\n⌕ ID ${anu.caption.user_id}\n⌕ Followers : ${anu.caption.followers}\n⌕ Following : ${anu.caption.following}\n⌕ Bussines : ${anu.caption.bussines}\n⌕ Profesional : ${anu.caption.profesional}\n⌕ Verified : ${anu.caption.verified}\n⌕ Private : ${anu.caption.private}\n⌕ Bio : ${anu.caption.biography}\n⌕ Bio Url : ${anu.caption.bio_url}`,
              m
            );
            db.data.users[m.sender].limit -= 1;
          } else if (type.toLowerCase() == "npm") {
            if (!id)
              throw `No Query username, Example : ${
                prefix + command
              } npm scrape-primbon`;
            let { result: anu } = await fetchJson(
              api("zenz", "/api/stalker/npm", { query: id }, "apikey")
            );
            if (anu.status == false) return m.reply(anu.result.message);
            m.reply(
              `⌕ Name : ${anu.name}\n⌕ Version : ${Object.keys(
                anu.versions
              )}\n⌕ Created : ${tanggal(
                anu.time.created
              )}\n⌕ Modified : ${tanggal(
                anu.time.modified
              )}\n⌕ Maintainers :\n ${anu.maintainers
                .map((v) => `- ${v.name} : ${v.email}`)
                .join("\n")}\n\n⌕ Description : ${
                anu.description
              }\n⌕ Homepage : ${anu.homepage}\n⌕ Keywords : ${
                anu.keywords
              }\n⌕ Author : ${anu.author.name}\n⌕ License : ${
                anu.license
              }\n⌕ Readme : ${anu.readme}`
            );
            db.data.users[m.sender].limit -= 1;
          } else {
            m.reply(
              `Example : ${
                prefix + command
              } type id\n\nList Type :\n1. ff (Free Fire)\n2. ml (Mobile Legends)\n3. aov (Arena Of Valor)\n4. cod (Call Of Duty)\n5. pb (point Blank)\n6. ig (Instagram)\n7. npm (https://npmjs.com)`
            );
          }
        }
        break;
      //───────────────────────[ TOOLS ]──────────────────────

      case "binaryenc":
        {
          if (!text) throw `Example : ${prefix + command} [text]`;
          let api = await fetchJson(
            `https://danzzapi.xyz/api/tools/ebinary?text=${text}&apikey=danzzprem`
          );
          m.reply(api.result.encode);
        }
        break;
      case "binarydec":
        {
          if (!text) throw `Example : ${prefix + command} [binary]`;
          let api = await fetchJson(
            `https://danzzapi.xyz/api/tools/dbinary?text=${text}&apikey=danzzprem`
          );
          m.reply(api.result.decode);
        }
        break;
      /**case 'tts': case 'txt2speeach': {
    if (!text) throw `Example : ${prefix + command} [text]`
    let api =  await fetchJson(`https://danzzapi.xyz/api/tools/tts?text=${text}&apikey=danzz`)
    let audio = getBuffer(api.result)
    m.reply(mess.wait)
    razan.sendMessage(from, {audion: audio, mimetype: 'audio/mpeg', ptt: true}, { quoted: m })
}
break*/
      case "ssweb":
        {
          if (!url) throw `Example : ${prefix + command} [url]`;
          m.reply(mess.wait);
          let ssan = await getBuffer(
            `https://danzzapi.xyz/api/tools/sswebdesktop?url=${url}&apikey=danzz`
          );
          let pesan = `🌐 URLs : ${url}`;
          razan.sendMessage(
            from,
            { image: ssan, caption: pesan },
            { quoted: m }
          );
        }
        break;
      case "qr":
      case "qrcode":
        {
          if (!text) throw `Example : ${prefix + command} [text]`;
          m.reply(mess.wait);
          let qr = await getBuffer(
            `https://danzzapi.xyz/api/other/qrcode?url=${text}&apikey=danzz`
          );
          let pesan = `✏️ Text : ${text}`;
          razan.sendMessage(from, { image: qr, caption: pesan }, { quoted: m });
        }
        break;

      //────────────────────[ DOWNLOADER ]────────────────────

      case "tiktokaudio":
      case "ttaudio":
      case "tiktokmp3":
      case "ttmp3":
        {
          if (!url) throw `Example : ${prefix + command} url`;
          m.reply(mess.wait);
          let ttmp3 = await fetchJson(
            `https://danzzapi.xyz/api/downloader/ttmp3?url=${url}&apikey=${setting.danzzkey}`
          );
          razan.sendMessage(
            m.chat,
            {
              audio: { url: ttmp3.result.audio },
              mimetype: "audio/mpeg",
              fileName: `${url}.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      case "bokep":
        {
          m.reply("Astaghfirullah");
        }
        break;
      case "tiktok":
      case "tiktokmp4":
      case "tiktokvideo":
      case "ttmp4":
      case "tt":
        {
          if (!url) throw `Example : ${prefix + command} [url]`;
          m.reply(mess.wait);
          let ttmp4 = await fetchJson(
            `https://danzzapi.xyz/api/downloader/ttmp4?url=${url}&apikey=${setting.danzzkey}`
          );
          razan.sendMessage(
            from,
            {
              video: { url: ttmp4.result.video },
              mimetype: "video/mp4",
              fileName: `${url}.mp4`,
              caption: `Done ~`,
            },
            { quoted: m }
          );
        }
        break;

      case "ig":
      case "igdl":
      case "instagram":
        {
          if (!text) throw "Masukkan Query Link!";
          if (!isUrl(args[0]) && !args[0].includes("instagram.com"))
            throw "Link yang kamu berikan tidak.valid";
          m.reply(mess.wait);
          let urlnya = text;
          let hasil = fetchJson(
            `https://danzzapi.xyz/api/downloader/igimg?url=${urlnya}&apikey=danzz`
          );
        }
        break;

      case "igs":
      case "igstory":
      case "instagramstory":
        {
          if (!text) throw "Masukkan Username!";
          m.reply(mess.wait);
          hx.igstory(text)
            .then(async (result) => {
              for (let i of result.medias) {
                if (i.url.includes("mp4")) {
                  let link = await getBuffer(i.url);
                  razan.sendMessage(from, { video: link }, { quoted: m });
                } else {
                  let link = await getBuffer(i.url);
                  razan.sendMessage(from, { image: link }, { quoted: m });
                }
              }
            })
            .catch((err) => m.reply(`Sorry the username was not found`));
        }
        break;

      case "joox":
      case "jooxdl":
        {
          if (!text) throw "No Query Title";
          m.reply(mess.wait);
          let anu = await fetchJson(
            `https://api.lolhuman.xyz/api/jooxplay?apikey=${global.lolhuman}&query=${text}`
          );
          let msg = await razan.sendImage(
            from,
            anu.result.image,
            `⌕ Title : ${anu.result.info.song}\n⌕ Album : ${anu.result.info.album}\n⌕ Singer : ${anu.result.info.song}\n⌕ Publish : ${anu.result.info.date}\n⌕ Lirik :\n${anu.result.audio[0].link}`,
            m
          );
          razan.sendMessage(
            from,
            {
              audio: { url: anu.result.audio[0].link },
              mimetype: "audio/mpeg",
            },
            { quoted: msg }
          );
        }
        break;

      case "fbdl":
      case "fb":
      case "facebook":
        {
          if (!url) throw "Masukkan Query Link!";
          if (!isUrl(args[0]) && !args[0].includes("facebook.com"))
            throw "Link yang kamu berikan tidak valid";
          let fbanu = await fetchJson(
            `https://danzzapi.xyz/api/downloader/facebook?url=${url}&apikey=${setting.danzzkey}`
          );
          m.reply(mess.wait);
          let txt = `*----「 FACEBOOK MP4 」----*\n\n`;
          txt += `*• Title :* ${fbanu.result.title}\n`;
          txt += `*• Quality :* ${fbanu.result.quality}\n`;
          txt += `*• Type :* ${fbanu.result.type}\n`;
          txt += `*• Size :* ${fbanu.result.size}\n`;
          txt += `*• Url Source :* ${fbanu.result.video_url}\n\n`;
          txt += `*Halo Kak ${pushname} Bot Telah Mendapatkan Title Tersebut Silahkan Tunggu Beberapa Menit, Jangan Lupa Donasi Ya Kak*`;
          razan.sendMessage(
            from,
            {
              video: { url: fbanu.result.links.url },
              mimetype: "video/mp4",
              fileName: `${url}.mp4`,
              caption: `${txt}`,
            },
            { quoted: m }
          );
        }
        break;

      case "umma":
      case "ummadl":
        {
          if (!text)
            throw `Example : ${
              prefix + command
            } https://umma.id/channel/video/post/gus-arafat-sumber-kecewa-84464612933698`;
          let { umma } = require("./lib) scraper");
          let anu = await umma(isUrl(text)[0]);
          if (anu.type == "video") {
            let buttons = [
              {
                buttonId: `ytmp3 ${anu.media[0]} 128kbps`,
                buttonText: { displayText: "♫ Audio" },
                type: 1,
              },
              {
                buttonId: `ytmp4 ${anu.media[0]} 360p`,
                buttonText: { displayText: "► Video" },
                type: 1,
              },
            ];
            let buttonMessage = {
              image: { url: anu.author.profilePic },
              caption: `
⌕ Title : ${anu.title}
⌕ Author : ${anu.author.name}
⌕ Like : ${anu.like}
⌕ Caption : ${anu.caption}
⌕ Url : ${anu.media[0]}
Untuk Download Media Silahkan Klik salah satu Button dibawah ini atau masukkan command ytmp3/ytmp4 dengan url diatas
`,
              footer: razan.user.name,
              buttons,
              headerType: 4,
            };
            razan.sendMessage(from, buttonMessage, { quoted: m });
          } else if (anu.type == "image") {
            anu.media.map(async (url) => {
              razan.sendMessage(
                from,
                {
                  image: { url },
                  caption: `⌕ Title : ${anu.title}\n⌕ Author : ${anu.author.name}\n⌕ Like : ${anu.like}\n⌕ Caption : ${anu.caption}`,
                },
                { quoted: m }
              );
            });
          }
        }
        break;

      //────────────────────[ ISLAMIC FEATURE ]────────────────────

      case "ringtone":
        {
          if (!text) throw `Example : ${prefix + command} black rover`;
          let { ringtone } = require("./lib/scraper");
          let anu = await ringtone(text);
          let result = anu[Math.floor(Math.random() * anu.length)];
          razan.sendMessage(
            from,
            {
              audio: { url: result.audio },
              fileName: result.title + ".mp3",
              mimetype: "audio/mpeg",
            },
            { quoted: m }
          );
        }
        break;
      case "iqra":
        {
          oh = `Example : ${
            prefix + command
          } 3\n\nIQRA Yang tersedia : 1,2,3,4,5,6`;
          if (!text) throw oh;
          yy = await getBuffer(
            `https://islamic-api-indonesia.herokuapp.com/api/data/pdf/iqra${text}`
          );
          razan
            .sendMessage(
              from,
              {
                document: yy,
                mimetype: "application/pdf",
                fileName: `iqra${text}.pdf`,
              },
              { quoted: m }
            )
            .catch((err) => m.reply(oh));
        }
        break;
      case "juzamma":
        {
          if (args[0] === "pdf") {
            m.reply(mess.wait);
            razan.sendMessage(
              from,
              {
                document: {
                  url: "https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pdf",
                },
                mimetype: "application/pdf",
                fileName: "juz-amma-arab-latin-indonesia.pdf",
              },
              { quoted: m }
            );
          } else if (args[0] === "docx") {
            m.reply(mess.wait);
            razan.sendMessage(
              from,
              {
                document: {
                  url: "https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.docx",
                },
                mimetype:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                fileName: "juz-amma-arab-latin-indonesia.docx",
              },
              { quoted: m }
            );
          } else if (args[0] === "pptx") {
            m.reply(mess.wait);
            razan.sendMessage(
              from,
              {
                document: {
                  url: "https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.pptx",
                },
                mimetype:
                  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                fileName: "juz-amma-arab-latin-indonesia.pptx",
              },
              { quoted: m }
            );
          } else if (args[0] === "xlsx") {
            m.reply(mess.wait);
            razan.sendMessage(
              from,
              {
                document: {
                  url: "https://fatiharridho.my.id/database/islam/juz-amma-arab-latin-indonesia.xlsx",
                },
                mimetype:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileName: "juz-amma-arab-latin-indonesia.xlsx",
              },
              { quoted: m }
            );
          } else {
            m.reply(`Mau format apa ? Example : ${prefix + command} pdf

Format yang tersedia : pdf, docx, pptx, xlsx`);
          }
        }
        break;
      case "hadis":
      case "hadist":
        {
          if (!args[0])
            throw `Contoh:
${prefix + command} bukhari 1
${prefix + command} abu-daud 1

Pilihan tersedia:
abu-daud
1 - 4590
ahmad
1 - 26363
bukhari
1 - 7008
darimi
1 - 3367
ibu-majah
1 - 4331
nasai
1 - 5662
malik
1 - 1594
muslim
1 - 5362`;
          if (!args[1])
            throw `Hadis yang ke berapa?\n\ncontoh:\n${
              prefix + command
            } muslim 1`;
          try {
            let res = await fetchJson(
              `https://islamic-api-indonesia.herokuapp.com/api/data/json/hadith/${args[0]}`
            );
            let { number, arab, id } = res.find((v) => v.number == args[1]);
            m.reply(`No. ${number}

${arab}

${id}`);
          } catch (e) {
            m.reply(`Hadis tidak ditemukan !`);
          }
        }
        break;
      case "alquran":
        {
          if (!args[0])
            throw `Contoh penggunaan:\n${
              prefix + command
            } 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`;
          if (!args[1])
            throw `Contoh penggunaan:\n${
              prefix + command
            } 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`;
          let res = await fetchJson(
            `https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`
          );
          let txt = `*Arab* : ${res.result.data.text.arab}
*English* : ${res.result.data.translation.en}
*Indonesia* : ${res.result.data.translation.id}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`;
          m.reply(txt);
          razan.sendMessage(
            from,
            {
              audio: { url: res.result.data.audio.primary },
              mimetype: "audio/mpeg",
            },
            { quoted: m }
          );
        }
        break;
      case "tafsirsurah":
        {
          if (!args[0])
            throw `Contoh penggunaan:\n${
              prefix + command
            } 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`;
          if (!args[1])
            throw `Contoh penggunaan:\n${
              prefix + command
            } 1 2\n\nmaka hasilnya adalah tafsir surah Al-Fatihah ayat 2`;
          let res = await fetchJson(
            `https://islamic-api-indonesia.herokuapp.com/api/data/quran?surah=${args[0]}&ayat=${args[1]}`
          );
          let txt = `「 *Tafsir Surah*  」

*Pendek* : ${res.result.data.tafsir.id.short}

*Panjang* : ${res.result.data.tafsir.id.long}

( Q.S ${res.result.data.surah.name.transliteration.id} : ${res.result.data.number.inSurah} )`;
          m.reply(txt);
        }
        break;

      //────────────────────[ VOICE CHANGER ]────────────────────

      case "bass":
      case "blown":
      case "deep":
      case "earrape":
      case "fast":
      case "fat":
      case "nightcore":
      case "reverse":
      case "robot":
      case "slow":
      case "smooth":
      case "tupai":
        try {
          let set;
          if (/bass/.test(command))
            set = "-af equalizer=f=54:width_type=o:width=2:g=20";
          if (/blown/.test(command)) set = "-af acrusher=.1:1:64:0:log";
          if (/deep/.test(command)) set = "-af atempo=4/4,asetrate=44500*2/3";
          if (/earrape/.test(command)) set = "-af volume=12";
          if (/fast/.test(command))
            set = '-filter:a "atempo=1.63,asetrate=44100"';
          if (/fat/.test(command))
            set = '-filter:a "atempo=1.6,asetrate=22100"';
          if (/nightcore/.test(command))
            set = "-filter:a atempo=1.06,asetrate=44100*1.25";
          if (/reverse/.test(command)) set = '-filter_complex "areverse"';
          if (/robot/.test(command))
            set =
              "-filter_complex \"afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75\"";
          if (/slow/.test(command))
            set = '-filter:a "atempo=0.7,asetrate=44100"';
          if (/smooth/.test(command))
            set =
              "-filter:v \"minterpolate='mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120'\"";
          if (/tupai/.test(command))
            set = '-filter:a "atempo=0.5,asetrate=65100"';
          if (/audio/.test(mime)) {
            m.reply(mess.wait);
            let media = await razan.downloadAndSaveMediaMessage(quoted);
            let ran = getRandom(".mp3");
            exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
              fs.unlinkSync(media);
              if (err) return m.reply(err);
              let buff = fs.readFileSync(ran);
              razan.sendMessage(
                from,
                { audio: buff, mimetype: "audio/mpeg" },
                { quoted: m }
              );
              fs.unlinkSync(ran);
            });
          } else
            m.reply(
              `Balas audio yang ingin diubah dengan caption *${
                prefix + command
              }*`
            );
        } catch (e) {
          m.reply(e);
        }
        break;

      //────────────────────[ DATABASE ]────────────────────

      case "setcmd":
        {
          if (!m.quoted) throw "Reply Pesan!";
          if (!m.quoted.fileSha256) throw "SHA256 Hash Missing";
          if (!text) throw `Untuk Command Apa?`;
          let hash = m.quoted.fileSha256.toString("base64");
          if (
            global.db.data.sticker[hash] &&
            global.db.data.sticker[hash].locked
          )
            throw "You have no permission to change this sticker command";
          global.db.data.sticker[hash] = {
            text,
            mentionedJid: m.mentionedJid,
            creator: m.sender,
            at: +new Date(),
            locked: false,
          };
          m.reply(`Done!`);
        }
        break;
      case "delcmd":
        {
          let hash = m.quoted.fileSha256.toString("base64");
          if (!hash) throw `Tidak ada hash`;
          if (
            global.db.data.sticker[hash] &&
            global.db.data.sticker[hash].locked
          )
            throw "You have no permission to delete this sticker command";
          delete global.db.data.sticker[hash];
          m.reply(`Done!`);
        }
        break;
      case "listcmd":
        {
          let teks = `
*List Hash*
Info: *bold* hash is Locked
${Object.entries(global.db.data.sticker)
  .map(
    ([key, value], index) =>
      `${index + 1}. ${value.locked ? `*${key}*` : key} : ${value.text}`
  )
  .join("\n")}
`.trim();
          razan.sendText(from, teks, m, {
            mentions: Object.values(global.db.data.sticker)
              .map((x) => x.mentionedJid)
              .reduce((a, b) => [...a, ...b], []),
          });
        }
        break;
      case "lockcmd":
        {
          if (!isCreator) throw mess.owner;
          if (!m.quoted) throw "Reply Pesan!";
          if (!m.quoted.fileSha256) throw "SHA256 Hash Missing";
          let hash = m.quoted.fileSha256.toString("base64");
          if (!(hash in global.db.data.sticker))
            throw "Hash not found in database";
          global.db.data.sticker[hash].locked = !/^un/i.test(command);
          m.reply("Done!");
        }
        break;
      case "addmsg":
        {
          if (!m.quoted) throw "Reply Message Yang Ingin Disave Di Database";
          if (!text) throw `Example : ${prefix + command} nama file`;
          let msgs = global.db.data.database;
          if (text.toLowerCase() in msgs)
            throw `'${text}' telah terdaftar di list pesan`;
          msgs[text.toLowerCase()] = quoted.fakeObj;
          m.reply(`Berhasil menambahkan pesan di list pesan sebagai '${text}'
Akses dengan ${prefix}getmsg ${text}
Lihat list Pesan Dengan ${prefix}listmsg`);
        }
        break;
      case "getmsg":
        {
          if (!text)
            throw `Example : ${
              prefix + command
            } file name\n\nLihat list pesan dengan ${prefix}listmsg`;
          let msgs = global.db.data.database;
          if (!(text.toLowerCase() in msgs))
            throw `'${text}' tidak terdaftar di list pesan`;
          razan.copyNForward(from, msgs[text.toLowerCase()], true);
        }
        break;
      case "listmsg":
        {
          let msgs = JSON.parse(fs.readFileSync("./src/database.json"));
          let seplit = Object.entries(global.db.data.database).map(
            ([nama, isi]) => {
              return { nama, ...isi };
            }
          );
          let teks = "「 LIST DATABASE 」\n\n";
          for (let i of seplit) {
            teks += `⌕ *Name :* ${i.nama}\n⌕ *Type :* ${getContentType(
              i.message
            ).replace(/Message/i, "")}\n────────────────────────\n\n`;
          }
          m.reply(teks);
        }
        break;
      case "delmsg":
      case "deletemsg":
        {
          let msgs = global.db.data.database;
          if (!(text.toLowerCase() in msgs))
            return m.reply(`'${text}' tidak terdaftar didalam list pesan`);
          delete msgs[text.toLowerCase()];
          m.reply(`Berhasil menghapus '${text}' dari list pesan`);
        }
        break;
      //────────────────────[ ANONYMOUS CHAT ]────────────────────

      case "anonymous":
        {
          if (m.isGroup)
            return m.reply("Fitur Tidak Dapat Digunakan Untuk Group!");
          this.anonymous = this.anonymous ? this.anonymous : {};
          let buttons = [
            {
              buttonId: "start",
              buttonText: { displayText: "Start" },
              type: 1,
            },
          ];
          razan.sendButtonText(
            from,
            buttons,
            `\`\`\`Hi ${await razan.getName(
              m.sender
            )} Welcome To Anonymous Chat\n\nKlik Button Dibawah Ini Untuk Mencari Partner\`\`\``,
            razan.user.name,
            m
          );
        }
        break;
      case "keluar":
      case "leave": {
        if (m.isGroup)
          return m.reply("Fitur Tidak Dapat Digunakan Untuk Group!");
        this.anonymous = this.anonymous ? this.anonymous : {};
        let room = Object.values(this.anonymous).find((room) =>
          room.check(m.sender)
        );
        if (!room) {
          let buttons = [
            {
              buttonId: "start",
              buttonText: { displayText: "Start" },
              type: 1,
            },
          ];
          await razan.sendButtonText(
            from,
            buttons,
            `\`\`\`Kamu Sedang Tidak Berada Di Sesi Anonymous, Tekan Button Untuk Mencari Partner \`\`\``
          );
          throw false;
        }
        m.reply("Ok");
        let other = room.other(m.sender);
        if (other)
          await razan.sendText(
            other,
            `\`\`\`Partner Telah Meninggalkan Sesi Anonymous\`\`\``,
            m
          );
        delete this.anonymous[room.id];
        if (command === "leave") break;
      }
      case "mulai":
      case "start": {
        if (m.isGroup)
          return m.reply("Fitur Tidak Dapat Digunakan Untuk Group!");
        this.anonymous = this.anonymous ? this.anonymous : {};
        if (
          Object.values(this.anonymous).find((room) => room.check(m.sender))
        ) {
          let buttons = [
            {
              buttonId: "keluar",
              buttonText: { displayText: "Stop" },
              type: 1,
            },
          ];
          await razan.sendButtonText(
            from,
            buttons,
            `\`\`\`Kamu Masih Berada Di dalam Sesi Anonymous, Tekan Button Dibawah Ini Untuk Menghentikan Sesi Anonymous Anda\`\`\``,
            razan.user.name,
            m
          );
          throw false;
        }
        let room = Object.values(this.anonymous).find(
          (room) => room.state === "WAITING" && !room.check(m.sender)
        );
        if (room) {
          let buttons = [
            { buttonId: "next", buttonText: { displayText: "Skip" }, type: 1 },
            {
              buttonId: "keluar",
              buttonText: { displayText: "Stop" },
              type: 1,
            },
          ];
          await razan.sendButtonText(
            room.a,
            buttons,
            `\`\`\`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\`\`\``,
            razan.user.name,
            m
          );
          room.b = m.sender;
          room.state = "CHATTING";
          await razan.sendButtonText(
            room.b,
            buttons,
            `\`\`\`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\`\`\``,
            razan.user.name,
            m
          );
        } else {
          let id = +new Date();
          this.anonymous[id] = {
            id,
            a: m.sender,
            b: "",
            state: "WAITING",
            check: function (who = "") {
              return [this.a, this.b].includes(who);
            },
            other: function (who = "") {
              return who === this.a ? this.b : who === this.b ? this.a : "";
            },
          };
          let buttons = [
            {
              buttonId: "keluar",
              buttonText: { displayText: "Stop" },
              type: 1,
            },
          ];
          await razan.sendButtonText(
            from,
            buttons,
            `\`\`\`Mohon Tunggu Sedang Mencari Partner\`\`\``,
            razan.user.name,
            m
          );
        }
        break;
      }
      case "next":
      case "lanjut": {
        if (m.isGroup)
          return m.reply("Fitur Tidak Dapat Digunakan Untuk Group!");
        this.anonymous = this.anonymous ? this.anonymous : {};
        let romeo = Object.values(this.anonymous).find((room) =>
          room.check(m.sender)
        );
        if (!romeo) {
          let buttons = [
            {
              buttonId: "start",
              buttonText: { displayText: "Start" },
              type: 1,
            },
          ];
          await razan.sendButtonText(
            from,
            buttons,
            `\`\`\`Kamu Sedang Tidak Berada Di Sesi Anonymous, Tekan Button Untuk Mencari Partner\`\`\``
          );
          throw false;
        }
        let other = romeo.other(m.sender);
        if (other)
          await razan.sendText(
            other,
            `\`\`\`Partner Telah Meninggalkan Sesi Anonymous\`\`\``,
            m
          );
        delete this.anonymous[romeo.id];
        let room = Object.values(this.anonymous).find(
          (room) => room.state === "WAITING" && !room.check(m.sender)
        );
        if (room) {
          let buttons = [
            { buttonId: "next", buttonText: { displayText: "Skip" }, type: 1 },
            {
              buttonId: "keluar",
              buttonText: { displayText: "Stop" },
              type: 1,
            },
          ];
          await razan.sendButtonText(
            room.a,
            buttons,
            `\`\`\`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\`\`\``,
            razan.user.name,
            m
          );
          room.b = m.sender;
          room.state = "CHATTING";
          await razan.sendButtonText(
            room.b,
            buttons,
            `\`\`\`Berhasil Menemukan Partner, sekarang kamu dapat mengirim pesan\`\`\``,
            razan.user.name,
            m
          );
        } else {
          let id = +new Date();
          this.anonymous[id] = {
            id,
            a: m.sender,
            b: "",
            state: "WAITING",
            check: function (who = "") {
              return [this.a, this.b].includes(who);
            },
            other: function (who = "") {
              return who === this.a ? this.b : who === this.b ? this.a : "";
            },
          };
          let buttons = [
            {
              buttonId: "keluar",
              buttonText: { displayText: "Stop" },
              type: 1,
            },
          ];
          await razan.sendButtonText(
            from,
            buttons,
            `\`\`\`Mohon Tunggu Sedang Mencari Partner\`\`\``,
            razan.user.name,
            m
          );
        }
        break;
      }

      //────────────────────[ OWNER MENU ]────────────────────

      case "public":
        {
          if (!isCreator) throw mess.owner;
          razan.public = true;
          m.reply("Sukses Change To Public Usage");
        }
        break;
      case "self":
        {
          if (!isCreator) throw mess.owner;
          razan.public = false;
          m.reply("Sukses Change To Self Usage");
        }
        break;
      case "addprem":
        if (!isCreator) return m.reply(mess.owner);
        {
          q, args;
        }
        {
          if (args.length < 2)
            return m.reply(
              `Penggunaan :\n*${prefix}addprem* @tag | waktu\n*${prefix}addprem* nomor | waktu\n\nContoh : ${prefix}addprem @tag 30d`
            );
          if (m.mentionedJid.length !== 0) {
            for (let i = 0; i < m.mentionedJid.length; i++) {
              prem.addPremiumUser(m.mentionedJid[0], args[1], premium);
            }
            m.reply("Sukses");
          } else {
            prem.addPremiumUser(args[0] + "@s.whatsapp.net", args[1], premium);
            m.reply("Sukses Via Nomor");
          }
        }
        break;
      case "delprem":
        if (!isCreator) return m.reply(act.owner);
        {
          q, args, arg;
        }
        {
          if (args.length < 1)
            return m.reply(
              `Penggunaan :\n*${prefix}delprem* @tag\n*${prefix}delprem* nomor`
            );
          if (m.mentionedJid.length !== 0) {
            for (let i = 0; i < m.mentionedJid.length; i++) {
              premium.splice(
                prem.getPremiumPosition(m.mentionedJid[i], premium),
                1
              );
              fs.writeFileSync(
                "./database/premium.json",
                JSON.stringify(premium)
              );
            }
            m.reply("Sukses");
          } else {
            premium.splice(
              prem.getPremiumPosition(args[0] + "@s.whatsapp.net", premium),
              1
            );
            fs.writeFileSync(
              "./database/premium.json",
              JSON.stringify(premium)
            );
            m.reply("sukses via nomor");
          }
        }

      //────────────────────[ INFO BOT ]────────────────────

      case "ping":
      case "botstatus":
      case "statusbot":
        {
          const used = process.memoryUsage();
          const cpus = os.cpus().map((cpu) => {
            cpu.total = Object.keys(cpu.times).reduce(
              (last, type) => last + cpu.times[type],
              0
            );
            return cpu;
          });
          const cpu = cpus.reduce(
            (last, cpu, _, { length }) => {
              last.total += cpu.total;
              last.speed += cpu.speed / length;
              last.times.user += cpu.times.user;
              last.times.nice += cpu.times.nice;
              last.times.sys += cpu.times.sys;
              last.times.idle += cpu.times.idle;
              last.times.irq += cpu.times.irq;
              return last;
            },
            {
              speed: 0,
              total: 0,
              times: {
                user: 0,
                nice: 0,
                sys: 0,
                idle: 0,
                irq: 0,
              },
            }
          );
          let timestamp = speed();
          let latensi = speed() - timestamp;
          neww = performance.now();
          oldd = performance.now();
          respon = `
🔗 Runtime : ${runtime(process.uptime())}
🖥️ Kecepatan Respon : ${latensi.toFixed(4)} _Second_
🛑 RAM : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
⚙️ CPU Model : ${cpus[0].model.trim()}
🔰 CPU Core : ${cpus.length} _Core_

_NodeJS Memory Usaage_
${Object.keys(used)
  .map(
    (key, _, arr) =>
      `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatp(
        used[key]
      )}`
  )
  .join("\n")}
`;
          m.reply(respon);
        }
        break;
      case "speed":
        {
          let timestamp = speed();
          let latensi = speed() - timestamp;
          m.reply(`${latensi.toFixed(4)}`);
        }
        break;
      case "test":
      case "tes":
      case "t":
        {
          let txtrntime = `*STATUS : ONLINE*\n${runtime(process.uptime())}`;
          m.reply(txtrntime);
        }
        break;
      case "runtime":
        {
          m.reply(`${runtime(process.uptime())}`);
        }
        break;
      case "speedtest":
        {
          m.reply("Testing Speed...");
          let cp = require("child_process");
          let { promisify } = require("util");
          let exec = promisify(cp.exec).bind(cp);
          let o;
          try {
            o = await exec("python speed.py");
          } catch (e) {
            o = e;
          } finally {
            let { stdout, stderr } = o;
            if (stdout.trim()) m.reply(stdout);
            if (stderr.trim()) m.reply(stderr);
          }
        }
        break;
      case "owner":
      case "creator":
        {
          razan.sendContact(from, global.owner, m);
        }
        break;

      //────────────────────[ MAIN MENU ]────────────────────

      case "menu":
      case "help":
      case "info":
        {
          addCountCmd(`#${command.slice(1)}`, sender, _cmd);
          buffer = await getBuffer(
            `https://telegra.ph/file/21d95e69f7ef9c30979a5.jpg`
          );
          anu = `
Hai kak ${pushname} 👋, ${sayyingTime}\nhave a nice day :)
   
┏━━━━━━━━━━━━━━━━━━━━
┃╭───── ⌈   *BOT INFO*   ⌋ ─────
┃│⋐⋑ *Bot Name:* _${global.botname}_
┃│⋐⋑ *Owner Name:* _${global.ownername}_
┃│⋐⋑ *Prefix:* _(${prefix})_
┃│⋐⋑ *Status:* _${isPremium ? "Premium" : "Free"}_
┃│⋐⋑ *Runtime* _${runtime(process.uptime())}_
┃│⋐⋑ *Gc Bot:* _${global.gc}_
┃│⋐⋑ *Tanggal:* _${tanggal}_
┃│⋐⋑ *Waktu:* _${waktu}_ 
┃│⋐⋑ *Library:* _Baileys-Md_
┃╰─────────────────────
┗━━━━━━━━━━━━━━━━━━━━━

╭─────  ⌈ *GROUP* ⌋
│   ⟥  ${prefix}linkgroup
│   ⟥  ${prefix}ephemeral [option]
│   ⟥  ${prefix}setppgc [image]
│   ⟥  ${prefix}setname [text]
│   ⟥  ${prefix}setdesc [text]
│   ⟥  ${prefix}group [option]
│   ⟥  ${prefix}editinfo [option]
│   ⟥  ${prefix}add @user
│   ⟥  ${prefix}kick @user
│   ⟥  ${prefix}hidetag [text]
│   ⟥  ${prefix}tagall [text]
│   ⟥  ${prefix}antilink [on/off]
│   ⟥  ${prefix}mute [on/off]
│   ⟥  ${prefix}promote @user
│   ⟥  ${prefix}demote @user
│   ⟥  ${prefix}vote [text]
│   ⟥  ${prefix}devote
│   ⟥  ${prefix}upvote
│   ⟥  ${prefix}cekvote
│   ⟥  ${prefix}hapusvote
│   
├─────  ⌈ *DOWNLOADER* ⌋
│   ⟥  ${prefix}tiktokmp4 [url]
│   ⟥  ${prefix}tiktokmp3 [url]
│   ⟥  ${prefix}instagram [url]
│   ⟥  ${prefix}twittermp4 [url]
│   ⟥  ${prefix}twittermp3 [url]
│   ⟥  ${prefix}facebook [url]
│   ⟥  ${prefix}pinterestdl [url]
│   ⟥  ${prefix}ytmp3 [url]
│   ⟥  ${prefix}ytmp4 [url]
│   ⟥  ${prefix}getmusic [query]
│   ⟥  ${prefix}getvideo [query]
│   ⟥  ${prefix}umma [url]
│   ⟥  ${prefix}joox [query]
│   ⟥  ${prefix}soundcloud [url]
│   
├─────  ⌈ *SEARCHING* ⌋ 
│   ⟥  ${prefix}play [query]
│   ⟥  ${prefix}yts [query]
│   ⟥  ${prefix}google [query]
│   ⟥  ${prefix}gimage [query]
│   ⟥  ${prefix}pinterest [query]
│   ⟥  ${prefix}wallpaper [query]
│   ⟥  ${prefix}wikimedia [query]
│   ⟥  ${prefix}ytsearch [query]
│   ⟥  ${prefix}ringtone [query]
│   ⟥  ${prefix}stalk [option] [query]
│   
├─────  ⌈ *RANDOM* ⌋
│   ⟥  ${prefix}coffe
│   ⟥  ${prefix}quotesanime
│   ⟥  ${prefix}motivasi
│   ⟥  ${prefix}dilanquote
│   ⟥  ${prefix}bucinquote
│   ⟥  ${prefix}katasenja
│   ⟥  ${prefix}puisi
│   ⟥  ${prefix}couple
│   ⟥  ${prefix}anime
│   ⟥  ${prefix}waifu
│   ⟥  ${prefix}husbu
│   ⟥  ${prefix}neko
│   ⟥  ${prefix}shinobu
│   
├─────  ⌈ *TEXTPRO* ⌋ 
│   ⟥  ${prefix}3dchristma
│   ⟥  ${prefix}3ddeepsea
│   ⟥  ${prefix}americanflag
│   ⟥  ${prefix}3dscifi
│   ⟥  ${prefix}3drainbow
│   ⟥  ${prefix}3dwaterpipe
│   ⟥  ${prefix}halloweenskeleton
│   ⟥  ${prefix}sketch
│   ⟥  ${prefix}bluecircuit
│   ⟥  ${prefix}space
│   ⟥  ${prefix}metallic
│   ⟥  ${prefix}fiction
│   ⟥  ${prefix}greenhorror
│   ⟥  ${prefix}transformer
│   ⟥  ${prefix}berry
│   ⟥  ${prefix}thunder
│   ⟥  ${prefix}magma
│   ⟥  ${prefix}3dcrackedstone
│   ⟥  ${prefix}3dneonlight
│   ⟥  ${prefix}impressiveglitch
│   ⟥  ${prefix}naturalleaves
│   ⟥  ${prefix}fireworksparkle
│   ⟥  ${prefix}matrix
│   ⟥  ${prefix}dropwater
│   ⟥  ${prefix}harrypotter
│   ⟥  ${prefix}foggywindow
│   ⟥  ${prefix}neondevils
│   ⟥  ${prefix}christmasholiday
│   ⟥  ${prefix}3dgradient
│   ⟥  ${prefix}blackpink
│   ⟥  ${prefix}gluetext
│   
├─────  ⌈ *FUN* ⌋ 
│   ⟥  ${prefix}halah
│   ⟥  ${prefix}hilih
│   ⟥  ${prefix}huluh
│   ⟥  ${prefix}heleh
│   ⟥  ${prefix}holoh
│   ⟥  ${prefix}truth
│   ⟥  ${prefix}dare
│   ⟥  ${prefix}jadian
│   ⟥  ${prefix}jodohku
│   ⟥  ${prefix}delttt
│   ⟥  ${prefix}tictactoe
│   ⟥  ${prefix}family100
│   ⟥  ${prefix}tebak [option]
│   ⟥  ${prefix}math [mode]
│   ⟥  ${prefix}suitpvp [@tag]
│   
├─────  ⌈ *PRIMBON* ⌋ 
│   ⟥  ${prefix}nomorhoki
│   ⟥  ${prefix}artimimpi
│   ⟥  ${prefix}artinama
│   ⟥  ${prefix}ramaljodoh
│   ⟥  ${prefix}ramaljodohbali
│   ⟥  ${prefix}suamiistri
│   ⟥  ${prefix}ramalcinta
│   ⟥  ${prefix}cocoknama
│   ⟥  ${prefix}pasangan
│   ⟥  ${prefix}jadiannikah
│   ⟥  ${prefix}sifatusaha
│   ⟥  ${prefix}rezeki
│   ⟥  ${prefix}pekerjaan
│   ⟥  ${prefix}nasib
│   ⟥  ${prefix}penyakit
│   ⟥  ${prefix}tarot
│   ⟥  ${prefix}fengshui
│   ⟥  ${prefix}haribaik
│   ⟥  ${prefix}harisangar
│   ⟥  ${prefix}harisial
│   ⟥  ${prefix}nagahari
│   ⟥  ${prefix}arahrezeki
│   ⟥  ${prefix}peruntungan
│   ⟥  ${prefix}weton
│   ⟥  ${prefix}karakter
│   ⟥  ${prefix}keberuntungan
│   ⟥  ${prefix}memancing
│   ⟥  ${prefix}masasubur
│   ⟥  ${prefix}zodiak
│   ⟥  ${prefix}shio
│   
├─────  ⌈ *CONVERTER* ⌋ 
│   ⟥  ${prefix}toimage
│   ⟥  ${prefix}removebg
│   ⟥  ${prefix}sticker / ${prefix}stiker / ${prefix}s
│   ⟥  ${prefix}emojimix
│   ⟥  ${prefix}tovideo
│   ⟥  ${prefix}togif
│   ⟥  ${prefix}tourl
│   ⟥  ${prefix}tovn
│   ⟥  ${prefix}tomp3
│   ⟥  ${prefix}toaudio
│   ⟥  ${prefix}ebinary
│   ⟥  ${prefix}dbinary
│   ⟥  ${prefix}styletext
│   ⟥  ${prefix}attp [text]
│   ⟥  ${prefix}ttp [text]
│   
├─────  ⌈ *MAIN* ⌋ 
│   ⟥  ${prefix}ping
│   ⟥  ${prefix}speed
│   ⟥  ${prefix}runtime
│   ⟥  ${prefix}owner
│   ⟥  ${prefix}menu / ${prefix}help / ${prefix}info
│   ⟥  ${prefix}delete
│   ⟥  ${prefix}infochat
│   ⟥  ${prefix}quoted
│   ⟥  ${prefix}listpc
│   ⟥  ${prefix}listgc
│   ⟥  ${prefix}listonline
│   ⟥  ${prefix}speedtest
│   
├─────  ⌈ *DATABASE* ⌋ 
│   ⟥  ${prefix}setcmd
│   ⟥  ${prefix}listcmd
│   ⟥  ${prefix}delcmd
│   ⟥  ${prefix}lockcmd
│   ⟥  ${prefix}addmsg
│   ⟥  ${prefix}listmsg
│   ⟥  ${prefix}getmsg
│   ⟥  ${prefix}delmsg
│   
├─────  ⌈ *ANONYMOUS CHAT* ⌋ 
│   ⟥  ${prefix}anonymous
│   ⟥  ${prefix}start
│   ⟥  ${prefix}next
│   ⟥  ${prefix}keluar
│   ⟥  ${prefix}sendkontak
│   ⟥  ${prefix}menfess / ${prefix}confess
│   
├─────  ⌈ *ISLAM* ⌋ 
│   ⟥  ${prefix}iqra
│   ⟥  ${prefix}hadist
│   ⟥  ${prefix}alquran
│   ⟥  ${prefix}juzamma
│   ⟥  ${prefix}tafsirsurah
│   
├─────  ⌈ *VOICE CHANGER* ⌋ 
│   ⟥  ${prefix}bass
│   ⟥  ${prefix}blown
│   ⟥  ${prefix}deep
│   ⟥  ${prefix}earrape
│   ⟥  ${prefix}fast
│   ⟥  ${prefix}fat
│   ⟥  ${prefix}nightcore
│   ⟥  ${prefix}reverse
│   ⟥  ${prefix}robot
│   ⟥  ${prefix}slow
│   ⟥  ${prefix}tupai
│
├─────  ⌈ *TOOLS* ⌋ 
│   ⟥  ${prefix}base64enc [text]
│   ⟥  ${prefix}base64dec [binary]
│   ⟥  ${prefix}ssweb [url]
│   ⟥  ${prefix}qrcode [text]
│
├─────  ⌈ *OWNER* ⌋ 
│   ⟥  =>
│   ⟥  >
│   ⟥  $
│   ⟥  ${prefix}react [emoji]
│   ⟥  ${prefix}chat [option]
│   ⟥  ${prefix}join [link]
│   ⟥  ${prefix}addprem @tag/nomer waktu
│   ⟥  ${prefix}delprem @tag/nomer
│   ⟥  ${prefix}leave
│   ⟥  ${prefix}block @user
│   ⟥  ${prefix}unblock @user
│   ⟥  ${prefix}bcgroup [text]
│   ⟥  ${prefix}bcall [text]
│   ⟥  ${prefix}setppbot [image]
│   ⟥  ${prefix}setexif
╰──────────────────

`;
          var button = [
            {
              buttonId: `dashboard`,
              buttonText: { displayText: `⚙️ Dashboard` },
              type: 1,
            },
            {
              buttonId: `owner`,
              buttonText: { displayText: `👤 Owner` },
              type: 1,
            },
            {
              buttonId: `donate`,
              buttonText: { displayText: `💸 Donate` },
              type: 1,
            },
          ];
          razan.sendMessage(from, {
            caption: `${anu}`,
            location: { jpegThumbnail: await reSize(buffer, 200, 200) },
            footer: botname,
            buttons: button,
            mentions: [m.sender],
          });
        }
        break;
      case "p":
      case "P":
      case "bot":
      case "Bot":
        {
          m.reply(
            "Apa bro ? Kalau mau pake bot ketik .menu || .help || .info, Kalau masih gabisa gausah pake bot ini."
          );
        }
        break;
      case "Assalamualaikum":
      case "assalamualaikum":
        {
          m.reply(
            "Waalaikumsallam, Apa bro ? kalau mau pake bot ketik .menu || .help || .info, Kalau masih gabisa gausah pake bot ini."
          );
        }
        break;
      //────────────────────[ BATAS TEMAN ]────────────────────
      default:
        if (budy.startsWith("=>")) {
          if (!isCreator) return m.reply(mess.owner);
          function Return(sul) {
            sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);
            if (sat == undefined) {
              bang = util.format(sul);
            }
            return m.reply(bang);
          }
          try {
            m.reply(
              util.format(eval(`(async () => { return ${budy.slice(3)} })()`))
            );
          } catch (e) {
            m.reply(String(e));
          }
        }

        if (budy.startsWith(">")) {
          if (!isCreator) return m.reply(mess.owner);
          try {
            let evaled = await eval(budy.slice(2));
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);
            await m.reply(evaled);
          } catch (err) {
            await m.reply(String(err));
          }
        }

        if (budy.startsWith("$")) {
          if (!isCreator) return m.reply(mess.owner);
          exec(budy.slice(2), (err, stdout) => {
            if (err) return m.reply(err);
            if (stdout) return m.reply(stdout);
          });
        }

        if (from.endsWith("@s.whatsapp.net") && isCmd) {
          this.anonymous = this.anonymous ? this.anonymous : {};
          let room = Object.values(this.anonymous).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "CHATTING"
          );
          if (room) {
            if (/^.*(next|leave|start)/.test(m.text)) return;
            if (
              [
                ".next",
                ".leave",
                ".stop",
                ".start",
                "Cari Partner",
                "Keluar",
                "Lanjut",
                "Stop",
              ].includes(m.text)
            )
              return;
            let other = [room.a, room.b].find((user) => user !== m.sender);
            m.copyNForward(
              other,
              true,
              m.quoted && m.quoted.fromMe
                ? {
                    contextInfo: {
                      ...m.msg.contextInfo,
                      forwardingScore: 0,
                      isForwarded: true,
                      participant: other,
                    },
                  }
                : {}
            );
          }
          return !0;
        }

        if (isCmd && budy.toLowerCase() != undefined) {
          if (from.endsWith("broadcast")) return;
          if (m.isBaileys) return;
          let msgs = global.db.data.database;
          if (!(budy.toLowerCase() in msgs)) return;
          razan.copyNForward(from, msgs[budy.toLowerCase()], true);
        }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
