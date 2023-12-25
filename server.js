const {errorHandler} = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;
const app = require("./app")

app.use(errorHandler);

app.listen(PORT, () => console.log('Server running on port '+PORT));