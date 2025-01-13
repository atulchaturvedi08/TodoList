const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    team: {
      type: [String],
      required: true,
    },
    stage: {
      type: String,
      enum: ['TODO', 'IN PROGRESS', 'COMPLETED'],
      default: 'TODO',
    },
    priority: {
      type: String,
      enum: ['HIGH', 'MEDIUM', 'NORMAL', 'LOW'],
      default: 'NORMAL',
    },
    date: {
      type: Date,
      required: true,
    },
    assets: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
