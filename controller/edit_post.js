const connection = require('../models/database')

module.exports = async(id) => {
    try {
        const query =  `SELECT `+
                            `* `+
                        `FROM `+
                            `blogs `+
                        `WHERE `+
                            `id = ${id} `

        const result = await connection(query)
        console.log(query)
    return result
    } catch (error) {
        return []
    }
}