const express =require('express');
const { getEmployee,updateEmployee, getEmployeeById ,createEmployee,deleteEmployee} = require('../controllers/employeeController');
const {login,profile,logout} = require('../controllers/User');
const  isAuthenticated = require('../middlewares/isAuthenticated');

//router object
const router = express.Router();


//get all employees
router.get('/getall',getEmployee)

//get Employee by id
router.get('/get/:id',getEmployeeById)

//Create Employee || Post

router.post('/create',createEmployee)

//Update Employee || Put

router.put('/update/:id',updateEmployee)

//Delete Employee || Delete

router.delete('/delete/:id',deleteEmployee)

//Login
router.post("/login",login);
router.get('/logout',logout);

//Get current user
router.get("/profile",isAuthenticated,profile);

module.exports = router;