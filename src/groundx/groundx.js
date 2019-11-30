export default app.route('/xground')
  .get(function (req, res) {
    // web
    try {
    	db.collection("groundx").where('lokasi', '==', lokasi).get()
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
    	db.collection("groundx").add({
    		ph: ph,
    		suhu: suhu,
    		kelembaban: kelembaban,
    		status: status,
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