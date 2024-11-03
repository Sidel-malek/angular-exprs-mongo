var express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var path = require('path');

const app = express();
app.use(express.json());

app.use(cors({ origin: 'http://localhost:4200' }));



const uri = 'mongodb://127.0.0.1:27017/monDB'; // MongoDB connection URI
mongoose.connect(uri).then(console.log('Connected to MongoDb'))

const Schema = mongoose.Schema;

// Define a schema for the user collection
const userSchema = new Schema({
    name: String,
    age: Number,
    passport:{type: mongoose.Schema.Types.ObjectId , ref:"passportSchema"}
});

const passportSchema = new Schema({
    numeroP : Number,

});

const compteSchema = new Schema({
    numeroCCP : Number,
    cleCPP : Number,
    solde : Number,
    user :{type: mongoose.Schema.Types.ObjectId , ref:"userSchema"}
  
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);
const Passport = mongoose.model('Passport', passportSchema);
const Compte = mongoose.model('Compte', compteSchema);


//app.use("/etudiant", r);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));



let persons = [];




app.post('/addAUser', async (req, res) => {
    const { name, age , passport} = req.body;
    
    try {
        // Create a new user document based on the submitted data
        const newUser = new User({ name, age , passport});
        // Save the new user to the database
        await newUser.save();
        console.log('User added:', newUser);
        res.json(newUser);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).send('Error adding user');
    }
});

app.post('/addPassport', async (req, res) => {
    const { numeroP } = req.body;
    
    try {
        // Create a new user document based on the submitted data
        const newPassport = new Passport({ numeroP });
        // Save the new user to the database
        await newPassport.save();
        console.log('User added:', newPassport);
        res.json(newPassport);
    } catch (err) {
        console.error('Error adding passport:', err);
        res.status(500).send('Error adding passport');
    }
});


app.get('/etudiantPassport', async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $lookup: {
                    from: "passports",
                    localField: "passport",
                    foreignField: "_id",
                    as: "jointure"
                }
            },{$project:{"passport":1 , "name":1}}
        ]).exec();

        res.json(result);
        
    } catch (err) {
        console.error('Error getting students with passport:', err);
        res.status(500).send('Error getting students with passport');
    }
});


/*app.get('/userComptes/:soldev', async (req, res) => {
    try {
        const valeurSolde = parseInt(req.params.soldev); // Convert to integer if required
        const result = await User.aggregate([
            {
                $lookup: {
                    from: "comptes",
                    localField: "_id",
                    foreignField: "user",
                    as: "jointure"
                }
            },
            {
                $unwind: "$jointure" // Unwind the jointure array
            },
            {
                $match: {
                    "jointure.solde": { $gt: valeurSolde }
                }
            },
            {
                $project: {
                    "name": 1,
                    "jointure.solde": 1
                }
            }
        ]);

        res.json(result);

    } catch (err) {
        console.error('Error getting users with compte:', err);
        res.status(500).send('Error getting users with compte');
    }
});*/

app.get('/userComptes/:soldev', async (req, res) => {
    try {
        const valeurSolde = parseInt(req.params.soldev); // Convert to integer if required
        const result = await Compte.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "jointure"
                }
            },
            {
                $unwind: "$jointure" // Unwind the jointure array
            },
            {
                $match: {
                    "solde": { $gt: valeurSolde }
                }
            },
            {
                $project: {
                    "jointure.name": 1,
                    "solde": 1
                }
            }
        ]);

        res.json(result);

    } catch (err) {
        console.error('Error getting users with compte:', err);
        res.status(500).send('Error getting users with compte');
    }
});

app.get('/userPassportsComptes/:soldev', async (req, res) => {
    try {
        const valeurSolde = parseInt(req.params.soldev); // Convertir en entier si nécessaire
        const result = await Compte.aggregate([
            {
                $match: {
                    solde: { $gt: valeurSolde }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user" // Dérouler le tableau user pour obtenir un seul document par Compte
            },
            {
                $lookup: {
                    from: "passports",
                    localField: "user.passport",
                    foreignField: "_id",
                    as: "passport"
                }
            },
            {
                $unwind: "$passport" // Dérouler le tableau passport pour obtenir un seul document par Compte
            },
            {
                $project: {
                    "user.name": 1,
                    "passport.numeroP": 1
                }
            }
        ]);

        res.json(result);

    } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs et des passeports:', err);
        res.status(500).send('Erreur lors de la récupération des utilisateurs et des passeports');
    }
});

app.get("/etudiants", (req, res) => {
    User.find().then(function(e){
        res.json(e)
    })
})



app.get("/passports", (req, res) => {
    Passport.find().then(function(e){
        res.json(e)
    })
})




// Route to delete a user
app.delete('/deleteUser/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        console.log('User deleted:', deletedUser);
        res.send('User deleted successfully');
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send('Error deleting user');
    }
});



app.patch('/student/:id', (req, res) => {
    const studentId = req.params.id;
    const updates = req.body;
    
    User.findByIdAndUpdate(studentId, updates, { new: true })
        .then((updatedStudent) => {
            if (!updatedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(updatedStudent);
            console.log(updatedStudent)
        })
        .catch((error) => {
            console.error("Error updating student:", error);
            res.status(500).json({ message: "Internal server error" });
        });
});





app.put('/student/:id', async (req, res) => {
    const studentId = req.params.id;
    const updates = req.body;
    try {
      const updatedStudent = await User.findByIdAndUpdate(studentId, updates, { new: true });
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(updatedStudent);
      console.log(updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });





app.listen(3032);
console.log("serveur http démarré sur le port 3032");

