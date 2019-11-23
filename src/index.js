require('dotenv/config');
const express = require('express');
const cors = require('cors');
const admin = require('firebase');
const app = express();

admin.initializeApp({
  apiKey: "AIzaSyDprOR2qtd5B94usR8LwUbokXTNdteC4fk",
    authDomain: "se000-ec0b6.firebaseapp.com",
    databaseURL: "https://se000-ec0b6.firebaseio.com",
    projectId: "se000-ec0b6",
    storageBucket: "se000-ec0b6.appspot.com",
    messagingSenderId: "494019541645",
    appId: "1:494019541645:web:303e2a41bdefaac674c0c4",
    measurementId: "G-GET0FY5F5W"

});

let db = admin.firestore();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
var port = process.env.PORT || 3001;

app.post('/ph/', (req, res) => {
  let nilai = String(req.body.nilai);
  let status = String(req.body.status);
  try {
    db.collection("laporan").doc(String(randToken.generate(16))).set({
      jenis: "ph",
      nilai: nilai,
      status: status,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return res.json("berhasil");
  } catch (error) {
    console.log(error);
    return res.json("gagal");
  }
});

app.post('/sampah/', (req, res) => {
  let nilai = String(req.body.nilai);
  let status = String(req.body.status);
  try {
    db.collection("laporan").doc(String(randToken.generate(16))).set({
      jenis: "sampah",
      nilai: nilai,
      status: status,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return res.json("berhasil");
  } catch (error) {
    console.log(error);
    return res.json("gagal");
  }
});

app.post('/co2/', (req, res) => {
  let nilai = String(req.body.nilai);
  let status = String(req.body.status);
  try {
    db.collection("laporan").doc(String(randToken.generate(16))).set({
      jenis: "co2",
      nilai: nilai,
      status: status,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return res.json("berhasil");
  } catch (error) {
    console.log(error);
    return res.json("gagal");
  }
});

app.post('/data/', (req, res) => {
  let nilaiph = String(req.body.nilaiPh);
  let nilaisampah = String(req.body.nilaiSampah);
  let nilaico2 = String(req.body.nilaiCo2);
  let statusph = String(req.body.statusPh);
  let statussampah = String(req.body.statusSampah);
  let statusco2 = String(req.body.statusCo2);
  try {
    db.collection("rangkuman").doc(String(randToken.generate(16))).set({
      ph: nilaiph,
      sampah: nilaisampah,
      co2: nilaico2,
      statusPh: statusph,
      statusSampah: statussampah,
      statusCo2: statusco2,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return res.json("berhasil");
  } catch (error) {
    console.log(error);
    return res.json("gagal");
  }
});

app.listen(port, () => {
  console.log(`Example app on port ${port}`);
})
