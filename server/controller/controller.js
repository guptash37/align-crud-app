const User = require("../model/user");
const router = require("../router/router");

//create api
exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}

//get api
exports.find = async (req, res) => {

    try {

        const getdata = await User.find()
        res.status(201).json(getdata);
        console.log(getdata)
    } catch (error) {
        res.status(422).json(error)
    }
}



//get api by id
exports.findById = async (req, res) => {
    try {

        console.log(req.params);
        const { id } = req.params;

        const userindividual = await User.findById({ _id: id });
        console.log(userindividual);
        res.status(201).json(userindividual)
    } catch (error) {
        res.status(422).json(error)
    }
}

//patch api 

exports.update = async (req, res) => {
    try {

        const { id } = req.params;
        const updateduser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error)
    }
}

//delete api

exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

//search api
exports.searchUsers = async (req, res) => {
    const { query } = req.query; // Search query parameter

    try {
        const users = await User.find({
            $or: [
                { firstname: { $regex: query, $options: 'i' } },
                { lastname: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { jobposition: { $regex: query, $options: 'i' } }
            ],
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
};

// //pagination
exports.pagnation = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
    const limit = parseInt(req.query.limit) || 5; // Get the limit (number of users per page)

    try {
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            users,
            totalPages,
            currentPage: page,
            totalUsers
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error.' });
    }
}
