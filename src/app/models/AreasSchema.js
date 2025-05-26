const mongoose = require("mongoose");
const { Schema } = mongoose;

const AreaSchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    clerkUserId: { type: String, required: true }
}, { timestamps: true });

const AreasCollection = mongoose.models.AreasCollection || mongoose.model("AreasCollection", AreaSchema);

export default AreasCollection;