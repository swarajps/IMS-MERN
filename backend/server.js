const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const Login = require("./models/login");
const router = require("./routes/admin");
const Mentrouter = require("./routes/mentor");
const Internrouter = require("./routes/intern");

const session = require('express-session');
const sessionManager = require('./managers/sessionManager');

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/', router);
app.use('/', Mentrouter);
app.use('/', Internrouter);
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(bodyParser.json());


app.post('/login_post', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    const log = await Login.findOne({username: username, password: password});
    if(log){

        sessionManager.setSessionData(log._id, log.type);

        if (log.type === 'admin') {
            res.json({status: 'ok', type: 'admin', log_id: log._id,})
        }
        else if (log.type === 'intern') {
            res.json({status: 'ok', type: 'intern', log_id: log._id,})
        }
        else if (log.type === 'mentor') {
            res.json({status: 'ok', type: 'mentor', log_id: log._id,})
        }
        console.log(sessionManager.getSessionData());
    }else {
        res.json({status: 'nokay!'});
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
