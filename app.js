const express = require("express");
const https = require('https');

const app = express();
app.get("/", function(req, res){
	const query = "London"; 
	const api_key = "ec0c2dd3db228fd90a864e7e4afc99be";
	const units = "metric"; 
	const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api_key+"&units="+units;
	https.get(url,function(response){
		console.log(response.statusCode);
		response.on("data", function(data){
			const weatherdata =JSON.parse(data); 
			const temp = weatherdata.main.temp;
			const description = weatherdata.weather[0].description;
			const icon = weatherdata.weather[0].icon; 
			const object = {
				name: "kaungkaung",
			};
			// res.write("The Current Weather Description is :"+description);
			res.write("<p> Current Weather Description is "+description+"</p>");
			res.write("<h1> The temperature in London is "+temp +'degree celcius.</h1>'); 
			res.write(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png"> </img>`);			
			res.send();
		});
	});
});

app.listen(3000, function(){
	console.log('server is running on 3000');
});