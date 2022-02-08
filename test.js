const express = require("express");
const router = express.Router();
const axios = require('axios');

function findMean(a,n)
{
    let sum = 0;
    for (let i = 0; i < n; i++)
        sum += a[i];
 
    return sum / n;
}
 

function findMedian(a,n)
{
    let middle = Math.floor(n / 2);
    a = [...a].sort((x, y) => x - y);
    return a.length % 2 !== 0 ? a[middle] : (a[middle - 1] + a[middle]) / 2;
}

// @route   POST api/test/soal1
// @desc    Calculate Median & Mean
// @access  Public
router.post("/soal1", async (req, res) => {
    try {
        
        let response = [];

        const { data1, data2 } = req.body;

        let a1 = data1.split(',').map(Number);
        let n1 = a1.length;

        let a2 = data2.split(',').map(Number);
        let n2 = a2.length;

        let mean1 = findMean(a1, n1);
        let median1 = findMedian(a1, n1);

        let mean2 = findMean(a2, n2);
        let median2 = findMedian(a2, n2);

        let responseMeanMedian1 = {
            mean: mean1,
            median: median1,
        };

        let responseMeanMedian2 = {
            mean: mean2,
            median: median2,
        }

        response.push(responseMeanMedian1);
        response.push(responseMeanMedian2);

        return res.json(response);
      
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "failed", message: "Server error : " + err.message, data: [] });
    }
});


// @route   POST api/test/soal2
// @desc    Convert Currency
// @access  Public
router.post("/soal2", async (req, res) => {
        try {
            const host = 'api.frankfurter.app';
            let data = req.body
            let result = [];

            for await (const item of data) {

                let request = {
                    params: {
                        amount: item["amount"],
                        from:  item["currency"],
                        to: 'USD'
                    }
                }
                await axios.post(`https://${host}/latest`, null, request)
                .then(function (response) {
                    result.push(response.data.rates.USD);
                })
                .catch(error => {
                    console.log('Error: '+ error);
                });
            }

            return res.json(result);
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ status: "failed", message: "Server error : " + err.message, data: [] });
        }
    }
);

// @route   POST api/test/soal3
// @desc    Hitung berapa lembar uang
// @access  Public
router.post("/soal3", async (req, res) => {
    try {
        let result = [];
        let temp = 0;
        let jum = 0;
        let devide = 0;
        const { harga, jumlah } = req.body;

        const closest = [100000, 50000, 20000, 10000, 5000, 2000, 1000].reduce((a, b) => {
            
            return Math.abs(b - harga) < Math.abs(a - harga) ? b : a;
        });

        jum = jumlah - 1;

        if(jum == 0){
            result.push(closest);
        }else{
            console.log('NILAI 2: ' + closest);
            if(harga >= closest){
                temp = harga - closest
                devide = temp / jum;
                result.push(closest);
                for(i = 0; i< jum; i ++){
                    result.push(devide);
                }
            }
        }

        return res.json(result);

      
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "failed", message: "Server error : " + err.message, data: [] });
    }
});

module.exports = router;
