const mongoose = require("mongoose");
const { Schema } = mongoose;
const KnowledgeBaseSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Detail: {
      type: String,
      // required: true,
    },
   UploadFile: {
      type: String,
     
    },

   
  },
  { timestamps: true }
);

module.exports = mongoose.model("KnowledgeBase", KnowledgeBaseSchema);
