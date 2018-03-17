var express = require('express');
var router = express.Router();
var admin = require('firebase-admin')
var serviceAccount = require('./firebase-key.json')
var oi = require('obj-iterate')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://courseplanme.firebaseio.com"
});

var db = admin.database();

/* GET List of Semesters */
router.get('/sections', function(req, res, next) {
  db.ref(`/directories/semesters`).once('value',snapshot => {
    var data = snapshot.val()
    if(!data){
      res.status(404).send()
    } else {
      data = Object.keys(data).map(n => ({code:n}))
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  })
});

/* GET List of Courses */
router.get('/sections/:semester', function(req, res, next) {
  db.ref(`/directories/courses/${req.params.semester}`).once('value',snapshot => {
    var data = snapshot.val()
    if(!data){
      res.status(404).send()
    } else {
      data = Object.keys(data).map(n => ({code:n}))
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  })
});

/* GET Sections of a course */
router.get('/sections/:semester/:course', function(req, res, next) {
  db.ref(`/sections/${req.params.semester}/${req.params.course}`).once('value',snapshot => {
    var data = snapshot.val()
    if(!data){
      res.status(404).send()
    } else {
      data = oi(oi(data).objectify((o,n,i) => o[i] = n)).filter(n => n)
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  })
});

/* GET A Specific Section  */
router.get('/sections/:semester/:course/:section', function(req, res, next) {
  db.ref(`/sections/${req.params.semester}/${req.params.course}/${req.params.section}`).once('value',snapshot => {
    var data = snapshot.val()
    if(!data){
      res.status(404).send()
    } else {
      // data = oi(oi(data).objectify((o,n,i) => o[i] = n)).filter(n => n)
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  })
});

/* GET Course info */
router.get('/course/:course', function(req, res, next) {
  console.log('hi')
  db.ref(`/courses/${req.params.course}`).once('value',snapshot => {
    var data = snapshot.val()
    if(!data){
      res.status(404).send()
    } else {
      // data = Object.keys(data).map(n => ({code:n}))
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  })
});

module.exports = router;
