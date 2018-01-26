//npm install --save keys.js

var twitterKeys = {
    consumer_key: 'SPkpbfxnEVpv9x6W4TRQAvfmN',
    consumer_secret: 'HvjjiIaMRKzjnWkt5fEWVfa6eaXbyj5NJFjhOJjZNDQSLNz0bf',
    access_token_key: '955678105435217921-YleHlxLLplRmDQokCxTGearockEtN9I',
    access_token_secret: 'd8v1RcUaBoe6888NVoJtXcDkAbhLZ9wdj79Wj3yFEAetS',
}

var spotifyKeys = {
    id: 'a21c6433e2ef450781e95dab344ade27',
    secret: '816bcb80a536451db6a9e62ee6d1f44b'
};


console.log('All the Keys are loaded');
console.log('=======================');
module.exports = {
    twitterKeys: twitterKeys,
    spotifyKeys: spotifyKeys
}