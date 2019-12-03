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

app.get('/alat/airx/:co2/:kelembaban/:suhu/:status/:lokasi', (req, res) => {
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
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
})

app.get('/alat/groundx/:ph/:status/:lokasi', (req, res) => {
  let ph = String(req.params.ph);
  let status = String(req.params.status);
    let lokasi = String(req.params.lokasi);

    try {
      db.collection("groundx").add({
        status: status,
        ph: ph,
        lokasi: lokasi,
        date: firebase.firestore.FieldValue.serverTimestamp()
      })
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
})

app.get('/all/airx/:subdistrict', (req, res) => {
  var subdistrict = req.params.subdistrict;
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
      db.collection("alat").where("alat", "==", "xground").where("Subdistrict", "==", subdistrict).where("Subdistrict", "==", subdistrict).limit(10).get()
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
app.get('/profil/airx/:lokasi', (req, res) => {
  var lokasi = String(req.params.lokasi);
    try {
      db.collection("alat").where("alat", "==", "airx").where("state", "==", lokasi).limit(10).get()
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

app.get('/profil/xflood/:lokasi', (req, res) => {
  var lokasi = String(req.params.lokasi);
    try {
      db.collection("alat").where("alat", "==", "xflood").where("state", "==", lokasi).limit(10).get()
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

app.get('/profil/xground/:lokasi', (req, res) => {
  var lokasi = String(req.params.lokasi);
    try {
      db.collection("alat").where("alat", "==", "xground").where("state", "==", lokasi).limit(10).get()
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

app.get('/data/xground/:lokasi', (req, res) => {
  var lokasi = req.params.lokasi;
    try {
      db.collection("xground").where("lokasi", "==", lokasi).orderBy("date", "desc").limit(10).get()
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
            data4.push(data, data1, data2);
            res.json(data4);
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
      db.collection("alat").where("alat", "==", "trashx").where("state", "==", lokasi).limit(10).get()
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
            res.json(data);
          } 
        })
    } catch (error) {
      console.log(error);
      return res.send("error 1");
    }
})

app.get("/faq/", (req, res) => {
    try {
      db.collection("faqs").get()
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

app.route('/airx/:lokasi')
  .get(function (req, res) {
    // web
    let lokasi = String(req.params.lokasi);
    try {
      db.collection("airx").where('lokasi', '==', lokasi).orderBy("date", "asc").limit(10).get()
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
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .put(function (req, res) {
    // tambahan
    res.json("jakartasehat");
  });

app.route('/trashx/:lokasi')
  .get(function (req, res) {
    // web
    let lokasi = String(req.params.lokasi);
    try {
      db.collection("trashx").where('lokasi', '==', lokasi).orderBy("date", "asc").limit(10).get()
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
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .put(function (req, res) {
    // tambahan
    res.json("jakartasehat");
  });

app.route('/xflood/:lokasi')
  .get(function (req, res) {
    // web
    let lokasi = String(req.params.lokasi);
    try {
      db.collection("xflood").where('lokasi', '==', lokasi).orderBy("date", "asc").limit(10).get()
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
      return res.json("sukses");
    } catch (error) {
      console.log(error);
      return res.json("error 1");
    }
  })
  .put(function (req, res) {
    // tambahan
    res.json("jakartasehat");
  });

app.route('/xground/:lokasi')
  .get(function (req, res) {
    // web

    let lokasi = String(req.params.lokasi);

    try {
      db.collection("xground").where('lokasi', '==', lokasi).orderBy("date", "asc").limit(10).get()
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
      return res.json("sukses");
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
