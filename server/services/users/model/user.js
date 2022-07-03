"use strict"
const {getDataDb} = require("../config/mongodbconnection")
const {ObjectId} = require("mongodb")
const {hashPass} = require("../middleware/hashpass")

class User {
    static user() {
        return getDataDb().collection("users")
    }

    static async findAll() {
            const data = await this.user().find().toArray()
            return data
    }
    static async insertOne(data) {
        data.password = hashPass(data.password)
        // let data = hashPass(data.password)
        const NewUser = await this.user().insertOne(data)
        return NewUser

    }
    static async findOne(data) {
        const checkUser = await this.user().findOne(data)
        return checkUser
    }

    static async delete (data){
        const deleteData = await this.user().deleteOne(data)
        return deleteData
    }

    static async UpdateUser(data){
        const updateData = await this.user().updateOne({
            _id: ObjectId(data.id)},
            {$set: {username:data.data.username}},
            {$set: {email:data.data.email}},
            {$set: {role:data.data.role}},
            {$set: {phoneNumber:data.data.phoneNumber}},
            {$set: {address:data.data.address}}
        )
        return updateData
    }
}   

module.exports = User