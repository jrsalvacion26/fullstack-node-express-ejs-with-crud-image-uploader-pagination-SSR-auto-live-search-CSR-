const connection = require('../models/database')


module.exports = async(id) => {

    try {
        const query =   `DELETE FROM blogs WHERE id = '${id}' `   

    await connection(query)
        
    return true
    } catch (error) {
        return false
    }
    
}