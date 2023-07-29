const express = require('express');
const { questions } = require('./questions');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(cors());

function generateRandomNumbers(count) {
    var arr = [];
    while (arr.length < count) {
        var r = Math.floor(Math.random() * questions.length);
        if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

app.get('/', function (req, res) {
    res.json({massage:"Health check app is running succefully",})
})
app.get('/getQuiz', function (req, res) {
    const count = req.query.questionCount;
    if(isNaN(Number(count)) ){
        res.json({status:false, message:"Please enter valid number"})
        return;    
    }else if(Number(count) <5 || Number(count) >15){
    res.json({status:false, message:"Please enter value betwen 5 and 15"})
    return;    
    }
    let randomQuesitons = generateRandomNumbers(count).map(x=> {
        return questions[x];
    })

    res.json({status:true, result:randomQuesitons})
})

app.listen(PORT, function () {
    console.log("Port is running on " + PORT);
    //    var host = server.address().address
    //    var port = server.address().port
    //    console.log("Example app listening at http://%s:%s", host, port)
})