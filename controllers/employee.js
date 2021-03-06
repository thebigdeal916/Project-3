const db = require('../models');

module.exports = {
    newEmployee: (req, res) => {
        let { companyId , ...payload } = req.body;

        db.Employee.create(payload)
        .then(({_id}) => {
           return db.Company.findByIdAndUpdate(companyId, {$push:{employees: _id}})
        })
        .then(() => {
            res.status(201).json({success: true})
        })
        .catch((err) => {
            res.status(422).json({success: false})
        })
    },
    getOneEmployee: (req, res) => {
        let id = req.params.id;

        db.Employee.findById(id)
        .then(person => {
            res.status(200).json(person)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    getPopulatedEmployee: (req, res) => {
        let id = req.params.id;

        db.Employee.findById(id)
        .populate("records")
        .then(emply => {
            res.status(200).json(emply)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },
    getEmployeesByCompany: (req, res) => {
        
        let id = req.params.id;

        db.Company.findById(id)
        .populate({path: "employees", populate:{path: "location"}})
        .then(emplys => {
            res.json(emplys.employees)
        })
        .catch(err => {
            res.json(err)
        })
    }
}