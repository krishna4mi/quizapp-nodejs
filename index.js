const express = require('express');
const { questions } = require('./questions');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());

function generateRandomNumbers(count) {
    var arr = [];
    while (arr.length < count) {
        var r = Math.floor(Math.random() * questions.length) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

app.get('/', function (req, res) {
    res.json({massage:"Health check app is running succefully",})
})
app.get('/getQuiz', function (req, res) {
    const count = req.query.questionCount;
    if(isNaN(Number(count))){
        throw new Error('Enter count value')
    }
    let randomQuesitons = generateRandomNumbers(10).map(x=> {
        return questions[x];
    })

    res.json(randomQuesitons)
})

app.listen(PORT, function () {
    console.log("Port is running on " + PORT);
    //    var host = server.address().address
    //    var port = server.address().port
    //    console.log("Example app listening at http://%s:%s", host, port)
})