const connection = require('../models/database')


module.exports = async(author, description, image) => {
    try {
        const query =  `INSERT INTO `+
                            `blogs `+
                        `VALUES `+
                            `(null, '${author}', '${description}', '${image}') `
                            
        await connection(query)
        
        return true
    } catch (error) {
        return false
    }
}

