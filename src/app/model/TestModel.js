
import { Schema, model, models } from "mongoose";
export const CrudSchema = new Schema({
    name: String,
    email:String,
    mobile:String,
    image: [],
    status: Boolean,
    date: { type: Date, default: Date.now },
})

const crudTable = models.TestTable || model('TestTable', CrudSchema);
export default crudTable;