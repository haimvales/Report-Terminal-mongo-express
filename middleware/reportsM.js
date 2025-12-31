import { getFirstByValue } from "../dal/reportsD.js"


export const correctNumberOfKeys = async (req, res, next) => {
    if (Object.keys(req.body).length > 6 || Object.keys(req.body).length < 4) {
        return res.status(400).json("Incorrect key number")
    }
    else
        next()
}

export const correctKeys = async (req, res, next) => {
    if (!req.body.fieldCode || !req.body.location || !req.body.threatLevel || !req.body.description) {
        return res.status(400).json("Incorrect keys")
    }
    else
        next()
}

export const IsTheTypeCorrectr = async (req, res, next) => { 
    for (const property in req.body) {
        if ((property !== "threatLevel" && property !== "timestamp" && property !== "confirmed") && typeof(req.body[property]) !== 'string') {
            return res.status(400).json(`${property} is not a string`)
        }
        if ((property === "threatLevel") && (!/^[0-9]+$/.test(req.body[property])))
            return res.status(400).json(`${property} is not a number`)
        if ((property === "timestamp") && typeof (req.body[property]) !== 'Date')
            return res.status(400).json(`${property} is not a Date`)
        if ((property === "confirmed") && typeof (req.body[property]) !== 'Boolean')
            return res.status(400).json(`${property} is not a Boolean`)
    }
    next()
}

export const existingReportNumber = async (req, res, next) => {
    try {
        const fieldCode = await getFirstByValue('reports', 'fieldCode', req.body.fieldCode)
        if (fieldCode)
            return res.status(409).json("Conflict")
        next()
    } catch (err) {
        return { err: err.name }
    }
}

export const itHasDate = async (req, res, next) => {
    if (!req.body.timestamp)
        req.body.timestamp = new Date()
    next()
}

export const heHasConfirmed = async (req, res, next) => {
    if (!req.body.confirmed)
        req.body.confirmed =  false
    next()
}



// const isSafe = /^[a-zA-Z0-9_]+$/.test(name_table);
// if(!Number.isNaN(Number(id))){
//     id = Number(id)
//     console.log(await insertOne({id,username}))
//     break;
// }