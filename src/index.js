require('dotenv/config');
const express = require('express');
const cors = require('cors');
const firebase = require('firebase');
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

app.route('/')
  .get(function (req, res) {
    // web
    res.json("jakartasehat");
  })
  .post(function (req, res) {
    // sensor
    res.json("jakartasehat");
  })
  .put(function (req, res) {
    // tambahan
    res.json("jakartasehat");
  });

app.route('/airx/')
  .get(function (req, res) {
    // web
    let lokasi = String(req.params.lokasi);
    try {
      db.collection("airx").where('lokasi', '==', lokasi).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              var datas = {
                "co2": doc.data().co2,
                "status": doc.data().status,
                "date": doc.data().date
              };
              data.push(datas);
              res.json(data);
            })
          } 
        })
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .post(function (req, res) {
    // sensor
    
    let co2 = String(req.body.co2);
    let status = String(req.body.status);
    let lokasi = String(req.body.lokasi);

    try {
      db.collection("airx").add({
        co2: co2,
        status: status,
        lokasi: lokasi,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .put(function (req, res) {
    // tambahan
    res.json("jakartasehat");
  });

app.route('/trashx/')
  .get(function (req, res) {
    // web
    let lokasi = String(req.params.lokasi);
    try {
      db.collection("trashx").where('lokasi', '==', lokasi).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              var datas = {
                "berat": doc.data().berat,
                "status": doc.data().status,
                "date": doc.data().date
              };
              data.push(datas);
              res.json(data);
            })
          } 
        })
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .post(function (req, res) {
    // sensor
    
    let berat = String(req.body.berat);
    let status = String(req.body.status);
    let lokasi = String(req.body.lokasi);

    try {
      db.collection("trashx").add({
        berat: berat,
        status: status,
        lokasi: lokasi,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .put(function (req, res) {
    // tambahan
    res.json("jakartasehat");
  });

app.route('/xflood/')
  .get(function (req, res) {
    // web
    let lokasi = String(req.params.lokasi);
    try {
      db.collection("xflood").where('lokasi', '==', lokasi).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              var datas = {
                "ketinggian": doc.data().ketinggian,
                "status": doc.data().status,
                "date": doc.data().date
              };
              data.push(datas);
              res.json(data);
            })
          } 
        })
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .post(function (req, res) {
    // sensor
    
    let ketinggian = String(req.body.ketinggian);
    let status = String(req.body.status);
    let lokasi = String(req.body.lokasi);

    try {
      db.collection("xflood").add({
        ketinggian: ketinggian,
        status: status,
        lokasi: lokasi,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .put(function (req, res) {
    // tambahan
    res.json("jakartasehat");
  });

app.route('/xground/')
  .get(function (req, res) {
    // web

    let lokasi = String(req.params.lokasi);

    try {
      db.collection("xground").where('lokasi', '==', lokasi).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('no data');
            res.json('no data');
          } else {  
            var data = [];
            snapshot.forEach(doc => {
              var datas = {
                "ph": doc.data().ph,
                "suhu": doc.data().suhu,
                "kelembaban": doc.data().kelembaban,
                "status": doc.data().status,
                "date": doc.data().date
              };
              data.push(datas);
              res.json(data);
            })
          } 
        })
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .post(function (req, res) {
    // sensor
    
    let ph = String(req.body.ph);
    let suhu = String(req.body.suhu);
    let kelembaban = String(req.body.kelembaban);
    let lokasi = String(req.body.lokasi);

    try {
      db.collection("xground").add({
        ph: ph,
        suhu: suhu,
        kelembaban: kelembaban,
        status: status,
        lokasi: lokasi,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .put(function (req,   res) {
    // tambahan
    res.json("jakartasehat");
  });


app.listen(port, () => {
  console.log(`Example app on port ${port}`);
})
