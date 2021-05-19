const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

// const connectDB = () => {
//     mongoose.connect(db, {
//         // These are parameters used to avoid warnings
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     }).then(() => console.log('MongoDB is Connected'))
//     .catch(err => {
//         console.error(err.message);
//         process.exit(1);
//     });
// };

// USING above function with Async/Await 
const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            // These are parameters used to avoid warnings
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }) 
        console.log('MongoDB is Connected')
    }
    
    catch(err) {
        console.error(err.message);
        process.exit(1);
    };
};

module.exports = connectDB