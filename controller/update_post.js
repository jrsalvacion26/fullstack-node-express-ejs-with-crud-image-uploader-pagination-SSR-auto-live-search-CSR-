const connection = require('../models/database')


module.exports = async(id, author, description, image) => {

    try {
        const query =   `UPDATE ` +
                            `blogs `+
                        `SET `+
                            `author = '${author}', ` +
                            `description = '${description}', ` +
                            `image = '${image}' `+
                        `WHERE ` +
                            `id = '${id}' `        

    await connection(query)
    console.log(query)
    return true
    } catch (error) {
        return false
    }
    
}