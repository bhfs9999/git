var crypto = require('crypto');

var hasher = crypto.createHash("sha1");
hasher.update("123");
result = hasher.digest("hex");
console.log(result);