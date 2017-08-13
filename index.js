const crypto = require('crypto');

const random = from => to => from + Math.floor(Math.random() * (to - from));
const generateRandomChar = () => String.fromCharCode(crypto.randomBytes(2).readUInt8(0));
export const generateRandomString = (length = random(16)(64)) => () => Array.from(Array(length), generateRandomChar).join('');
export const generateRandomStrings = (count = random(8)(64)) => () => Array.from(Array(count), generateRandomString);

const hashes = crypto.getHashes();
const getRandomHash = () => hashes[random(0)(hashes.length)];
export const generateHash = algo => salt => password => crypto.createHmac(algo, salt).update(password).digest('hex');
export const generateSaltedHash = (hash, salt) => {return {salt, hash: generateHash(hash)(salt)};};

export const generateHashedPassword = (password, salt = generateRandomString()(), algo = getRandomHash()) => {
    return {salt, hashed: generateHash(algo)(salt)(password)};
};