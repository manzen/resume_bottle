import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: 'AIzaSyC8J2AiNxfuQtUKIS9l65RXBZJ5JP322xU',
    authDomain: 'resume-bottle.firebaseapp.com',
    databaseURL: 'https://resume-bottle.firebaseio.com',
    projectId: 'resume-bottle',
    storageBucket: 'resume-bottle.appspot.com',
    messagingSenderId: '294368277343',
    appId: '1:294368277343:web:d11775b8294086c0e37cea',
    measurementId: 'G-VSW8YFC7ZH',
}

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
