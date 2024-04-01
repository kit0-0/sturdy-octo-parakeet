const db = require('../config/db');
const getEmployee=async(req,res)=>{
    try {
        const data =await db.query('SELECT * FROM employee');
        
        if (!data){
            return res.status(404).send({
                success:false,
                message:"No data found"
            })
        }
        res.status(200).send({
            success:true,
            message:"Data retrieved successfully",
            data : data[0],
            totalEmoloyee:data[0].length
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Internal Server Error",
            error
        })
    }
}


//get employee by id

const getEmployeeById=async(req,res)=>{
   try {
    const employeeId = parseInt(req.params.id);
    if(!employeeId){
        return res.status(400).send({
            success:false,
            message:"Please provide employee id"
        })
    }
    const data =await db.query('SELECT * FROM employee WHERE id = ?',[employeeId]);
    if(data.length === 0){
        return res.status(404).send({
            success:false,
            message:"No data found"
        })
    }
    res.status(200).send({
        success:true,
        message:"Data retrieved successfully",
        data : data[0],
        
    })
    
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Internal Server Error",
        error
    })
   }
}


//Create employee

const createEmployee = async (req, res) => {
    try {
      const { Emp_NO, Emp_Name, Salary, Emp_Add, Dept_No, Dept_Name, Emp_Phone } = req.body;
      if (!Emp_NO || !Emp_Name || !Salary || !Emp_Add || !Dept_No || !Dept_Name || !Emp_Phone) {
        return res.status(400).send({
          success: false,
          message: "Please provide all details"
        });
      }
      const data = await db.query('INSERT INTO EMPLOYEE (Emp_NO, Emp_Name, Emp_Add, Emp_Phone, Dept_No, Dept_Name, Salary) VALUES (?, ?, ?, ?, ?, ?, ?)', [Emp_NO, Emp_Name, Emp_Add, Emp_Phone, Dept_No, Dept_Name, Salary]);
      if (!data) {
        return res.status(404).send({
          success: false,
          message: "Employee not created"
        });
      }
      res.status(201).send({
        success: true,
        message: "Employee created successfully",
        data: data[0]
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error
      });
    }
  }

  
  //Update employee

  const updateEmployee = async (req, res) => {
    try {
        const employeeId = parseInt(req.params.id);
        if(!employeeId){
            return res.status(400).send({
                success:false,
                message:"Please provide employee id"
            })
        }
        const { Emp_NO, Emp_Name, Salary, Emp_Add, Dept_No, Dept_Name, Emp_Phone } = req.body;
        const data = await db.query('UPDATE EMPLOYEE SET Emp_NO = ?, Emp_Name = ?, Emp_Add = ?, Emp_Phone = ?, Dept_No = ?, Dept_Name = ?, Salary = ? WHERE Emp_NO = ?', [Emp_NO, Emp_Name, Emp_Add, Emp_Phone, Dept_No, Dept_Name, Salary, employeeId]);
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Employee not updated"
          });
        }
        res.status(200).send({
          success: true,
          message: "Employee updated successfully",
          data: data[0]
        });
    } catch (error) {
        console.log(error);
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error
      });

    }  }

    //Delete employee

    const deleteEmployee = async (req, res) => {
        try {
            const employeeId = parseInt(req.params.id);
            if(!employeeId){
                return res.status(400).send({
                    success:false,
                    message:"Please provide employee id"
                })
            }
            const data = await db.query('DELETE FROM EMPLOYEE WHERE Eid = ?', [employeeId]);
            if (!data) {
              return res.status(404).send({
                success: false,
                message: "Employee not deleted"
              });
            }
            res.status(200).send({
              success: true,
              message: "Employee deleted successfully",
              data: data[0]
            });
        } catch (error) {
            console.log(error);
          res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
          });
    
        }  }


module.exports = {getEmployee,updateEmployee, createEmployee ,deleteEmployee ,getEmployeeById }