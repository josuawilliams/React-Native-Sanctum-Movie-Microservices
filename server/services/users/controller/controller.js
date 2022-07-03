"use strict"
const { ObjectId } = require("mongodb")
const User = require("../model/user")


class Controller {
    static async getDataUser(req, res, next) {
        try {
            const data = await User.findAll()
            data.map(item => {
                delete item.password
                return item
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createUser(req, res, next) {
        try {
            const { username, email, password, role, phoneNumber, address } = req.body
            let message = []
            if (username == "") { message.push("Username is required") }
            if (email == "") { message.push("Email is required") }
            if (password == "") { message.push("Password is required") }
            if (role == "") { message.push("Role is required") }
            if (phoneNumber == "") { message.push("Phone Number is required") }
            if (address == "") { message.push("Address is required") }
            const data = await User.findOne({ email })
            if (data) {
                if (data.email === email) {
                    message.push("Email is already used")
                }
            }
            if (message.length > 0) {
                throw ({ name: "Validation Error", errors: message })
            }
            const dataUser = await User.insertOne(req.body)
            res.status(201).json({
                message: "Successfully Register Thank you"
            })
        } catch (error) {
            next(error)
        }
    }

    static async getDataUserById(req, res, next) {
        try {
            const { id } = req.params
            const data = await User.findOne({ _id: ObjectId(id) })
            if (!data) {
                throw ({ name: "User Not Found" })
            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deletedUser(req, res, next) {
        try {
            const { id } = req.params
            const data = await User.delete({ _id: ObjectId(id) })
            if (data.deletedCount == 0) {
                throw ({ name: "User Not Found" })
            }
            res.status(200).json({
                message: "successfully deleted"
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { id } = req.params
            const { username, email, role, phoneNumber, address } = req.body
            let message = []
            if (username == "") { message.push("Username is required") }
            if (email == "") { message.push("Email is required") }
            if (role == "") { message.push("Role is required") }
            if (phoneNumber == "") { message.push("Phone Number is required") }
            if (address == "") { message.push("Address is required") }
            if (message.length > 0) {
                throw ({ name: "Validation Error", errors: message })
            }
            const update = await User.UpdateUser({ id, data: req.body})
            res.status(200).json({
                message: "successfully updated"
            })
        } catch (error) {
            next(error)
        }
    }
}



module.exports = Controller