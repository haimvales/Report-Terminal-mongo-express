import db from '../dbConnect.js'
import { MongoClient, ObjectId, Db } from "mongodb";


export async function createRow(nameTable, objInsert) {
    const insert = await db.collection(nameTable).insertOne(objInsert);
    // console.log(insert);
    return insert
}

export async function deleteRow(nameTable, byValue, value) {
    const deleteValue = await db.collection(nameTable).deleteOne({ [byValue]: value });
    // console.log(deleteValue);
    return deleteValue
}

export async function getAll(nameTable) {
    const rows = await db.collection(nameTable).find({}).toArray();
    // console.log(rows);
    return rows
}

export async function getAllByValue(nameTable, byValue, value) {
    const rows = await db.collection(nameTable).find({ [byValue]: value }).toArray();
    // console.log(rows);
    return rows
}

export async function getFirstByValue(nameTable, byValue, value) {
    const row = await db.collection(nameTable).findOne({ [byValue]: value });
    // console.log(row);
    return row
}

export async function getFirstByTwoValues() {
    let result = await db.collection("reports").findOne({ username: "ben", age: 20 });
    // console.log(result);
    return result
}

export async function getManyByValue(nameTable, byValue, value) {
    let result = await db.collection(nameTable).find({ [byValue]: value}).toArray();
    // console.log(result);
    return result
}

export async function getById(nameTable, id) {
    const rows = await db.collection(nameTable).findOne({ _id: new ObjectId(id) });
    // console.log(rows);
    return rows
}

export async function replaceByValueSameId(nameTable, byValue, value, newObj) {
    const rows = await db.collection(nameTable).findOneAndReplace({ [byValue]: value }, newObj);
    // console.log(rows);
    return rows
}

export async function updateFieldById(nameTable, byValue, id, newValue) {
    const newObj = { $set: { [byValue]: newValue } }
    const rows = await db.collection(nameTable).updateOne({ _id: id }, newObj);
    // console.log(rows);
    return rows
}




