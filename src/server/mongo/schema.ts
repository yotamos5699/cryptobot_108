import mongoose from "mongoose";
import { number } from "zod";

const Schema = mongoose.Schema;

const Order = new Schema(
  {
    UserID: String,
    PaymentToken: String,

    AddedMS: Number,
    Date: Number,
  },
  { timestamps: true, strict: true, strictQuery: false }
);

const Users = new Schema(
  {
    id: { type: String, require: true },
    startingSum: Number,
    lastDoDate: Number,
    isActive: Boolean,
    Orders: [Order],

    FirstName: String,
    LastName: String,
    Phone: String,
    Mail: String,
    PlanKey: String,

    Accountname: String,
    isAdmin: { type: Boolean, required: true, default: true },
    AdminUserID: String,
    isAuthenticated: { type: Boolean, default: false },
  },
  { timestamps: true, strict: true, strictQuery: false }
);
