'use strict';

module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const schoolSchema = new Schema({
    name: String,
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
    },
  });

  return mongoose.model('School', schoolSchema);
};
