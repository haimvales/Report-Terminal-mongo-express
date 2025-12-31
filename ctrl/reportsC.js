import { createRow, deleteRow, getAll, getById, getManyByValue, updateFieldById } from "../dal/reportsD.js";
import { MongoClient, ObjectId, Db } from "mongodb";

export const createReports = async (req, res) => {
    try {
        const newreport = await createRow('reports',  req.body)
        return res.status(200).json(`new _id report ${newreport.insertedId.toString()}`)
    } catch (err) {
        return { err: err.name }
    }
}

export const getAllReports = async (req, res) => {
    try {
        const reports = await getAll('reports')
        return res.status(200).json(reports)
    } catch (err) {
        return { err: err.name }
    }
}

export const getAllReportsHi4 = async (req, res) => {
    try {
        const reports = await getManyByValue('reports',"threatLevel",{$gte:4})
        return res.status(200).json(reports)
    } catch (err) {
        return { err: err.name }
    }
}

export const confirmed = async (req, res) => {
    try {
        const reportsid = new ObjectId(req.params.id)
        updateFieldById('reports',"confirmed",reportsid,true)
        const reports = await getById('reports',reportsid)
        return res.status(200).json(reports)
    } catch (err) {
        return { err: err.name }
    }
}

export const deleteById = async (req, res) => {
    try {
        const reportsid = new ObjectId(req.params.id)
        const reports = await deleteRow('reports',"_id",reportsid)
        // const reports = await getById('reports',reportsid)
        if(reports.deletedCount === 0)
            return res.status(200).json("no")
        return res.status(200).json("yes")
    } catch (err) {
        return { err: err.name }
    }
}