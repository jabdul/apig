import mongoose from 'mongoose';

const { Schema } = mongoose;

export const MetaSchema = new Schema({
  active: { type: Boolean, default: true },
  updated: { type: Date },
  created: { type: Date },
}, { _id: false });

export const SCHEMAS = {};
