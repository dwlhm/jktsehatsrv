require('dotenv/config');
const express = require('express');
const cors = require('cors');
const firebase = require('firebase');
const axios = require('axios');
const app = express();

firebase.initializeApp({
    apiKey: "AIzaSyBW-8apNDGsHLNnwO7Cqe0SBHxq00C7NxA",
    authDomain: "sever-c6560.firebaseapp.com",
    databaseURL: "https://sever-c6560.firebaseio.com",
    projectId: "sever-c6560",
    storageBucket: "sever-c6560.appspot.com",
    messagingSenderId: "1085881768054",
    appId: "1:1085881768054:web:6901ce26366cf738df2757",
    measurementId: "G-Q497VEBBXZ"

});

let db = firebase.firestore();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
var port = process.env.PORT || 3001;

var kolp;
var banjir, sampah, tanah, udara;
var bigboxkey = 'sNXYeU73io97jeS3B0jHXWzuRNEHgHyU';

app.get("/kolp/:kondisi", (req, res) => {
  if (kolp === String(req.params.kondisi)) {
    res.send("sama");  
  } else {
    kolp = String(req.params.kondisi);
    res.send("dah terganti");
  }

  
})

app.get("/summary/:subdistrict", (req, res) => {
  var subdistrict = String(req.params.subdistrict);
  
  db.collection("alat").where("Subdistrict", "==", subdistrict).get().then( snapshot => {
    var data = [];
    snapshot.forEach( doc => {
      console.log(doc.data());
      data.push(doc.data());  
    })
    res.send(data);
  })
  
})

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

      db.collection("alat").doc("airx-"+ String(lokasi)).get().then(doc => {
        udara = doc.data().status;
      });
      db.collection("alat").doc("airx-"+ String(lokasi)).update({
        status: status
      })

      if(status == "kurang" && udara !== "kurang") {
        udara = "kurang";
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=kualitas%20udara%20didaerah%20anda%20kurang%20baik,%20silakan%20gunakan%20masker%20untuk%20kesehatan%20anda',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': bigboxkey }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      } else if(status == "baik" && udara == "kurang") {
         udara = "baik";
          axios({
          method: 'post',
          url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
          data: 'msisdn=082121433085&content=kualitas%20udara%20telah%20ditangani',
          headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': bigboxkey }
          })
          .then(function (response) {
              //handle success
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
      } else {
      udara = status;
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
      db.collection("alat").doc("xflood-"+ String(lokasi)).get().then(doc => {
        banjir = doc.data().status;
      })
      db.collection("alat").doc("xflood-"+ String(lokasi)).update({
        status: status
      })
      if(status == "kurang" && banjir !== "kurang") {
        banjir = "kurang";
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=ketinggian%20air%20didaerah%20anda%20berpotensi%20menyebabkan%20banjir',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': bigboxkey }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      } else if(status == "baik" && banjir == "kurang") {
         banjir = "baik";
          axios({
          method: 'post',
          url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
          data: 'msisdn=082121433085&content=ketinggian%20air%20yang%20berpotensi%20banjir%20telah%20ditangani',
          headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': bigboxkey }
          })
          .then(function (response) {
              //handle success
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
      } else {
      banjir = status;
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
      db.collection("alat").doc("trashx-"+ String(lokasi)).get().then( doc => {
        sampah = doc.data().status;
      })
      db.collection("alat").doc("trashx-"+ String(lokasi)).update({
        status: status
      })
      if(status == "kurang" && sampah !== "kurang") {
        sampah = "kurang";
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=tempat%20penampungan%20sampah%20sementara%20didaerah%20anda%20sudah%20penuh',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': bigboxkey }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      }  else if(status == "baik" && sampah == "kurang") {
         sampah = "baik";
          axios({
          method: 'post',
          url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
          data: 'msisdn=082121433085&content=kondisi%20banjir%20telah%20ditangani',
          headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': bigboxkey }
          })
          .then(function (response) {
              //handle success
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
      } else {
      banjir = status;
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
      db.collection("alat").doc("groundx-"+ String(lokasi)).get().then(doc => {
        tanah = doc.data().status;
      })
      db.collection("alat").doc("groundx-"+ String(lokasi)).update({
        status: status
      })
      if(status == "kurang" && tanah !== "kurang") {
        tanah = "kurang";
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=unsur%20kelembaban%20udara%20didaerah%20anda%20kurang%20baik',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': bigboxkey }
        })
        .then(function (response) {
            //handle success
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
      } else if(status == "baik" && tanah == "kurang") {
        tanah = "baik";
        axios({
        method: 'post',
        url: 'https://api.thebigbox.id/sms-notification/1.0.0/messages',
        data: 'msisdn=082121433085&content=kelembaban%20udara%20didaerah%20anda%20telah%20ditangani',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': bigboxkey }
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
