const connection = require('../models/database')

module.exports = async(limit,resultsPerPage) => {
    try {
        const query =  `SELECT * FROM blogs LIMIT ${limit},${resultsPerPage} `;


    
        const result =await connection(query)
        
        return result
    } catch (error) {
        return []
    }
}