import mongoose, { mongo } from "mongoose";
const MassageSchema = new mongoose.Schema({
  name : {
      type: String,
      required: [true, 'Please add a name'],
      unique : true,
      trim : true,
      maxlength : [50, 'Name cannot be more than 50 charaters']
  },
  address : {
      type : String,
      required: [true, 'Please add an address']
  },
  tel : {
      type: String
  },
  picture: {
    type: String,
    required: true,
  },
  open_close_times: [{
      day: {
          type: String,
          required: true
      },
      open: {
          type: String,
          required: true
      },
      close: {
          type: String,
          required: true
      }
  }],
});

const Massage = mongoose.models.Massage || mongoose.model("Massage", MassageSchema);
export default Massage

