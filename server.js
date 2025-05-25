require('dotenv').config();
const express = require('express');
const { configureCors } = require('./config/cors-config');
const { requestLogger, addTimeStamp } = require('./middleware/customMiddleware');
const { globalErrorHandler } = require('./middleware/errorHandler');
const { urlVersioning } = require('./middleware/apiVersioning');
const { basicRateLimiter } = require('./middleware/rateLimiting');
const itemRoutes = require('./routes/item-routes')

const app = express();
const PORT = process.env.PORT;


app.use(requestLogger);
app.use(addTimeStamp);
app.use(configureCors());
app.use(basicRateLimiter(100, 15*60*1000)) // 100 request per 15 mins

app.use(express.json());
app.use(urlVersioning('v1'))

app.use('/api/v1',itemRoutes)
//express json middleware
app.use(globalErrorHandler)

app.listen(PORT || 3000, () => {
    console.log("server running on PORT:", PORT)
})