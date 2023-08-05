const couchbase = require("couchbase");
const crypto = require("crypto")

const handler = async (event) => {
  try {
		const clusterConnStr = "couchbases://cb.ar0qqwli6cczm1u.cloud.couchbase.com"; // Replace this with Connection String
		const username = "Adminstrator"; // Replace this with username from database access credentials
		const password = "Couch#123"; // Replace this with password from database access credentials
		// Get a reference to the cluster
		const cluster = await couchbase.connect(clusterConnStr, {
		  username: username,
		  password: password,
		  // Use the pre-configured profile below to avoid latency issues with your connection.
		  configProfile: "wanDevelopment",
		});
    const bucket = cluster.bucket("surveyform");
    const collection = bucket.defaultCollection();

    var data = JSON.parse(event.body);
    let result = await collection.insert(crypto.randomUUID(), data);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ name: data.name })
    }
  } catch (error) {
    console.log(error);
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
