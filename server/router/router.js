const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");
//post api
router.post('/employees', controller.create)

//get all data api
router.get("/getemployees", controller.find)

//get data api by id
router.get("/getemployees/:id", controller.findById)
//patch api 
router.patch("/employees/:id", controller.update)

//delete api
router.delete('/employees/:id', controller.delete);

//search api
router.get('/search', controller.searchUsers);

router.get('/page', controller.pagnation);
module.exports = router;

