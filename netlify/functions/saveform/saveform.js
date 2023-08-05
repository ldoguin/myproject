const handler = async (event) => {
  try {
    var data = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({ name: data.name })
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
