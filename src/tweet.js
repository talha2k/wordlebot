import Twitter from "twitter";
//import Twit from "twit";
import dotenv from "dotenv";
import fs from "fs";
import moment from "moment";

dotenv.config();

const client = new Twitter({
	//const client = new Twit({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	//access_token: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});



// client
// .post("statuses/update", { status: "Wordle Answer: " + "BAKER" })
// .then((result) => {
// console.log('You successfully tweeted this : "' + result.text + '"');
// })
// .catch(console.error);


const imageData = fs.readFileSync("./uploads/wordle-banner.jpg");  //replace with the path to your image

// const pathToFile = "./recordings/"+moment(new Date()).format("YYYY-MM-DD")+".mp4";
// const mediaType = "video/mp4";
// const mediaData = fs.readFileSync(pathToFile);
// const mediaSize = fs.statSync(pathToFile).size;



class Tweet {

	post_result = (answer) => {
		

		client.post("media/upload", { media: imageData }, function (error, media, response) {
			if (error) {
				console.log(error);
			} else {
				const status = {
					status:
						moment(new Date()).format("YYYY-MM-DD") +
						` #wordle #nytimes #solution #wordleanswer #wordletodayanswer #wordlehints 
						Spoiler Alert!
						Today's Wordle Answer
						is:
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						.
						` +
						answer.toString().toUpperCase(),
					media_ids: media.media_id_string,
				};

				client.post("statuses/update", status, function (error, tweet, response) {
					if (error) {
						console.log(error);
					} else {
						console.log("Today's Wordle Answer is: " + answer.toString().toUpperCase());
					}
				});
			}
		});

        
	};
}

export { Tweet };