let fbConfig = {
  apiKey: "AIzaSyCMVuIdub8VK84BMnum3i6cEIXREW9eDcM",
  authDomain: "smart-house-2b093.firebaseapp.com",
  databaseURL: "https://smart-house-2b093.firebaseio.com",
  projectId: "smart-house-2b093",
  storageBucket: "smart-house-2b093.appspot.com",
  messagingSenderId: "749745307276",
  appId: "1:749745307276:web:27b52278cde035a6ad05a9",
  measurementId: "G-22G870TBZN"
};

fbConfig || alert("Please set Firebase config (in page source)!");
firebase.initializeApp(fbConfig);

let let_ = f => f();
let transpose = ll => ll[0].map((_, i) => ll.map(l => l[i]));
let toTimestamps = l => l.map(([k, x]) => [+moment(k, 'DD-MM-YYYYTHH:mm:ss'), x]);
let sort = l => l.slice().sort((x, y) => +x[0] - +y[0]);
let convert = x => transpose(sort( toTimestamps(Object.entries(x.val())) ).map(([k, x]) =>[[k, x.temperature], [k, x.humidity]]));

firebase.database(firebase.app()).ref('temperatureHumidity').on('value', x => setData(convert(x)));
