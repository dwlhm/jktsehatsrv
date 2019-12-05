require('dotenv/config');
const express = require('express');
const cors = require('cors');
const firebase = require('firebase');
const axios = require('axios');
const app = express();

firebase.initializeApp({
  apiKey: "AIzaSyDprOR2qtd5B94usR8LwUbokXTNdteC4fk",
    authDomain: "se000-ec0b6.firebaseapp.com",
    databaseURL: "https://se000-ec0b6.firebaseio.com",
    projectId: "se000-ec0b6",
    storageBucket: "se000-ec0b6.appspot.com",
    messagingSenderId: "494019541645",
    appId: "1:494019541645:web:303e2a41bdefaac674c0c4",
    measurementId: "G-GET0FY5F5W"

});

let db = firebase.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
var port = process.env.PORT || 3001;

app.get('/alat/airx/:co2/:status/:lokasi', (req, res) => {
  let co2 = String(req.params.co2);
  let kelembaban = String(req.params.kelembaban);
    let suhu = String(req.params.suhu);
    let lokasi = String(req.params.lokasi);
  let status = String(req.params.status);

    try {
      db.collection("airx").add({
        co2: co2,
        kelembaban: kelembaban,
        suhu: suhu,
        lokasi: lokasi,
        status: status,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
      db.collection("alat").doc("airx-"+ String(lokasi)).update({
        status: status
      })
      if(status == "kurang") {
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=kualitas%20udara%20didaerah%20anda%20kurang',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': 'cTcyTtVC0sXPCetNFmochuhH4msjdIl8' }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      }
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
})

app.get('/alat/xflood/:ketinggian/:status/:lokasi', (req, res) => {
  let ketinggian = String(req.params.ketinggian);
  let status = String(req.params.status);
    let lokasi = String(req.params.lokasi);

    try {
      db.collection("xflood").add({
        status: status,
        ketinggian: ketinggian,
        lokasi: lokasi,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
      db.collection("alat").doc("xflood-"+ String(lokasi)).update({
        status: status
      })
      if(status == "kurang") {
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=daerah%20anda%20berpotensi%20banjir',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': 'cTcyTtVC0sXPCetNFmochuhH4msjdIl8' }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      }
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
})

app.get('/alat/trashx/:berat/:status/:lokasi', (req, res) => {
  let berat = String(req.params.berat);
  let status = String(req.params.status);
    let lokasi = String(req.params.lokasi);

    try {
      db.collection("trashx").add({
        status: status,
        berat: berat,
        lokasi: lokasi,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
      db.collection("alat").doc("trashx-"+ String(lokasi)).update({
        status: status
      })
      if(status == "kurang") {
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=penampungan%20sampah%20daerah%20anda%20sudah%20penuh',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': 'cTcyTtVC0sXPCetNFmochuhH4msjdIl8' }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      }
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
})

app.get('/alat/groundx/:ph/:kelembaban/:suhu/:status/:lokasi', (req, res) => {
  let ph = String(req.params.ph);
  let kelembaban = String(req.params.kelembaban);
  let suhu = String(req.params.suhu);
  let status = String(req.params.status);
    let lokasi = String(req.params.lokasi);

    try {
      db.collection("groundx").add({
        status: status,
        ph: ph,
        kelembaban: kelembaban,
        suhu: suhu,
        lokasi: lokasi,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
      db.collection("alat").doc("groundx-"+ String(lokasi)).update({
        status: status
      })
      if(status == "kurang") {
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=kelembaban%20didaerah%20anda%20kurang',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': 'cTcyTtVC0sXPCetNFmochuhH4msjdIl8' }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      }
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
})

app.get('/all/airx/', (req, res) => {
  try {
      db.collection("alat").where("alat", "==", "airx").get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              data.push(doc.data());
            })
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/all/xflood/', (req, res) => {
  try {
      db.collection("alat").where("alat", "==", "xflood").get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              data.push(doc.data());
            })
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/all/xground/', (req, res) => {
  try {
      db.collection("alat").where("alat", "==", "groundx").get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              data.push(doc.data());
            })
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/all/trashx/', (req, res) => {
  try {
      db.collection("alat").where("alat", "==", "trashx").get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              data.push(doc.data());
            })
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/all/airx/:subdistrict', (req, res) => {
  var subdistrict = String(req.params.subdistrict);
    try {
      db.collection("alat").where("alat", "==", "airx").where("Subdistrict", "==", subdistrict).limit(10).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              data.push(doc.data());
            })
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/all/xground/:subdistrict', (req, res) => {
  var subdistrict = req.params.subdistrict;
    try {
      db.collection("alat").where("alat", "==", "groundx").where("Subdistrict", "==", subdistrict).limit(10).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              data.push(doc.data());
            })
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/all/xflood/:subdistrict', (req, res) => {
  var subdistrict = req.params.subdistrict;
    try {
      db.collection("alat").where("alat", "==", "xflood").where("Subdistrict", "==", subdistrict).limit(10).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              data.push(doc.data());
            })
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/all/trashx/:subdistrict', (req, res) => {
  var subdistrict = req.params.subdistrict;
    try {
      db.collection("alat").where("alat", "==", "trashx").where("Subdistrict", "==", subdistrict).limit(10).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              data.push(doc.data());
            })
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/data/airx/:lokasi', (req, res) => {
  var lokasi = req.params.lokasi;
    try {
      db.collection("airx").where("lokasi", "==", lokasi).orderBy("date", "desc").limit(10).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            var data1 = [];
            var data5 = [];
            snapshot.forEach(doc => {
              data.push(doc.data().date.toDate());
              data1.push(doc.data().co2);
            })
            data5.push(data, data1);
            res.json(data5);
          } 
        }).catch(error => {
          console.log(error);
          return res.send("error 2");
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/data/xflood/:lokasi', (req, res) => {
  var lokasi = req.params.lokasi;
    try {
      db.collection("xflood").where("lokasi", "==", lokasi).orderBy("date", "desc").limit(10).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            var data1 = [];
            var data2 = [];
            snapshot.forEach(doc => {
              data.push(doc.data().date.toDate());
              data1.push(doc.data().ketinggian);
            })
            data2.push(data, data1);
            res.json(data2);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})


app.get('/data/xground/:lokasi', (req, res) => {
  var lokasi = req.params.lokasi;
    try {
      db.collection("groundx").where("lokasi", "==", lokasi).orderBy("date", "desc").limit(10).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            var data1 = [];
            var data2 = [];
            var data3 = [];
            var data4 = [];
            snapshot.forEach(doc => {
              data.push(doc.data().date.toDate());
              data1.push(doc.data().suhu);
              data2.push(doc.data().kelembaban);
              data3.push(doc.data().ph);
            })
            data4.push(data, data1, data2, data3);
            res.json(data4);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})


app.get('/data/trashx/:lokasi', (req, res) => {
  var lokasi = req.params.lokasi;
    try {
      db.collection("trashx").where("lokasi", "==", lokasi).orderBy("date", "desc").limit(10).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            var data1 = [];
            var data2 = [];
            snapshot.forEach(doc => {
              data.push(doc.data().date.toDate());
              data1.push(doc.data().berat);
            })
            data2.push(data, data1);
            res.json(data2);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/profil/airx/:lokasi', (req, res) => {
  var lokasi = "airx-"+String(req.params.lokasi);
  console.log(lokasi);
    try {
      db.collection('alat').doc(String(lokasi)).get()
        .then(doc => {
          if (doc.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            
              data.push(doc.data());
            
            res.json(data);
          } 
        }).catch(err => {
          console.log(err);
          res.send("error 3");
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/profil/xflood/:lokasi', (req, res) => {
  var lokasi = String(req.params.lokasi);
    try {
      db.collection("alat").doc("xflood-"+lokasi).get()
        .then(doc => {
          if (doc.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
              data.push(doc.data());
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/profil/xground/:lokasi', (req, res) => {
  var lokasi = String(req.params.lokasi);
    try {
      db.collection("alat").doc("groundx-"+lokasi).get()
        .then(doc => {
          if (doc.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
              data.push(doc.data());
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get('/profil/trashx/:lokasi', (req, res) => {
  var lokasi = String(req.params.lokasi);
    try {
      db.collection("alat").doc("trashx-"+lokasi).get()
        .then(doc => {
          if (doc.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
              data.push(doc.data());
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.listen(port, () => {
  console.log(`Example app on port ${port}`);
})
