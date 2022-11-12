const connection = require('../models/database')

module.exports = async(id) => {
    try {
        const query =  `SELECT `+
                            `* `+
                        `FROM `+
                            `blogs `

                           
        const results = await connection(query)
        
        return results
    } catch (error) {
        return []
    }
}