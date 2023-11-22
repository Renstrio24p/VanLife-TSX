const admin = require('firebase-admin');
const serviceAccount = require(`${process.env.FIREBASE_PATH_SERVICE_JSON}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:  process.env.FIREBASE_DATABASE_URL
});

const db = admin.firestore();

// Adding data to Cloud Firestore
const vansCollection = db.collection('vans');

vansCollection.add({
  id: "2",
  name: "Beach Bum",
  price: 80,
  description: "Beach Bum is a van inspired by surfers and travelers...",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png",
  type: "rugged",
  hostId: "123"
});

vansCollection.add({
  id: "3",
  name: "Reliable Red",
  price: 100,
  description: "Reliable Red is a van that was made for travelling...",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png",
  type: "luxury",
  hostId: "456"
});

vansCollection.add({
  id: "4",
  name: "Dreamfinder",
  price: 65,
  description: "Dreamfinder is the perfect van to travel in and experience...",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png",
  type: "simple",
  hostId: "789"
});

vansCollection.add({
  id: "5",
  name: "The Cruiser",
  price: 120,
  description: "The Cruiser is a van for those who love to travel in comfort and luxury...",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png",
  type: "luxury",
  hostId: "789"
});

vansCollection.add({
  id: "6",
  name: "Green Wonder",
  price: 70,
  description: "With this van, you can take your travel life to the next level...",
  imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png",
  type: "rugged",
  hostId: "123"
});
