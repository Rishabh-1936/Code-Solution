var http=require('https')
// var options = {
//     host: 'coderbyte.com',
//     path:'/api/challenges/json/age-counting'
//   };

  const regexp = /(?<=age=)\d+/g;
  
  
  http.get('https://coderbyte.com/api/challenges/json/age-counting', function(res) {
    
    var data = ""

    res.on('data',(ch)=>{
        data += ch;
    })
    

    res.on('end',()=>{
        let c=0
        let ages = [...data.matchAll(regexp)];
        
        ages.forEach((ele)=>{
            if(Number(ele[0])>=50) ++c;
        });        
        console.log(c)
    })
  }).on('error', function(e) {
    console.log("Error : " + e.message);
  });