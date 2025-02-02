import merge from "lodash.merge"

process.env.NODE_ENV = process.env.NODE_ENV || "development"
const stage = process.env.STAGE ||'local'
let envConfig

if(stage==='production'){
    envConfig = require('./production').default
}
else if(stage==='development'){
    envConfig = require('./development').default
}
else if(stage==='local'){
    envConfig = require('./local').default
}
else{
    envConfig = require('./local').default
}

export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '100d'
    },
    db: {
        url: process.env.DB_URL
    }
}, envConfig)


