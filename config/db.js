const mongoURI = require("./keys").mongoURI
const mongoose =require("mongoose") 

const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://si9s:si9spassword@ds062448.mlab.com:62448/si9s", {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

mongoose.Promise = global.Promise

module.exports = connectDB;
