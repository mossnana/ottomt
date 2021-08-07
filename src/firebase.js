import firebase from 'firebase'

const productionConfig = {}
const developmentConfig = {
    apiKey: "AIzaSyBx5cQECfgE_orunUvxs9BJOoZAf7rd5Vg",
    authDomain: "ottomt.firebaseapp.com",
    projectId: "ottomt",
    storageBucket: "ottomt.appspot.com",
    messagingSenderId: "693566954030",
    appId: "1:693566954030:web:7d2b3be52c718050eb5dbf",
    measurementId: "G-G8MJWSV3JD"
}

firebase.initializeApp(developmentConfig)

export default firebase
