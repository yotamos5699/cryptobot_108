import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
const uri =
  "mongodb+srv://yotamos:linux6926@cluster0.ldyao7j.mongodb.net/?retryWrites=true&w=majority";
const MGoptions = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, (res) => {
  console.log(res);
});

export const checkUsserStats = async (req: NextRequest, res: NextResponse) => {
  return req.body;
};
// cldbmbhk60000twv0syd9de8k
("cldbmbhk60000twv0syd9de8k");
