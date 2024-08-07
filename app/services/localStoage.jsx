import CryptoJS from 'crypto-js';

const secretKey = '4f3d2c1b5e6a7d8f9c0e1b2a3d4c5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e'; // You should store this securely

 const saveArrayToLocalStorage = (key, array) => {
  const stringifiedArray = JSON.stringify(array || []);
  const encrypted = CryptoJS.AES.encrypt(stringifiedArray, secretKey).toString();
  localStorage.setItem(key, encrypted);
  
};

 const getArrayFromLocalStorage = (key) => {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    
    const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  };

  export {saveArrayToLocalStorage,getArrayFromLocalStorage};