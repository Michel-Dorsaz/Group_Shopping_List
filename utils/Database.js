import React, { useState, useEffect } from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, update, ref, onValue, set, off, get, query, orderByChild, orderByKey } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDqdXWT-DtHYMoIPj2rngA7xfSB1cGAvlM",
    authDomain: "groupshoppinglist-85fce.firebaseapp.com",
    projectId: "groupshoppinglist-85fce",
    storageBucket: "groupshoppinglist-85fce.appspot.com",
    messagingSenderId: "949758075701",
    appId: "1:949758075701:web:7c52e67afe2c90bbf4a27c",
    databaseURL: " https://groupshoppinglist-85fce-default-rtdb.europe-west1.firebasedatabase.app"
  };
    
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database, ref, push, set, update, onValue, off, get, query, orderByChild, orderByKey };