const mysql = require('mysql')
const express = require('express')
const { query } = require('express')

const db_config = {
    host:"localhost",
    user:"root",
    password:"",
    port: 3306,
    database: "image_blogs"
}

const connection = mysql.createPool(db_config)

//Rest api models
module.exports = (query) => {
    return new Promise((resolve, reject) => {
        connection.getConnection((err, sql) => {
            if(err){
                console.log("database error: ", err)
                reject(err)
            }else{
                connection.query(query, (err, results) => {
                    if(err){
                        console.log("query error: ", err)
                        reject(err)
                    }else{
                        resolve(results)
                    }
                })
            }

        })
    })
}
