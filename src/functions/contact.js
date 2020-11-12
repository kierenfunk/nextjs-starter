// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL_FROM,
		pass: process.env.EMAIL_PW
	}
});

const sendMail = async (mailOptions)=>{
	return new Promise((resolve,reject)=>{
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
				resolve(false);
			}
			else{
				resolve(true);
			}
		});
	})
}

const constructMessageBody = (body) => {
	return Object.keys(body).reduce((string,key)=>{
		return string+`${key}: ${body[key]}\n`	
	},"\n\n")
}

const send = async (body) => {

	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to: process.env.EMAIL_TO,
		subject: 'NEW MESSAGE from oz4wdadventures.com.au',
		text: constructMessageBody(body)
	};

	let response = await sendMail(mailOptions);
	if(response){
		return {
			statusCode:200,
			body:JSON.stringify("Thank you for your message. We will get back to you as soon as we can.")
		}
	}
	else{
		return {
			statusCode:500,
			body:JSON.stringify("Something went wrong and we couldn't process your request at this time. Please contact us by emailing oz4wdadventures@gmail.com or calling 0425 440 393")
		}
	}
}

exports.handler = async (event, context, callback) => {
	return await send(JSON.parse(event.body))
}
