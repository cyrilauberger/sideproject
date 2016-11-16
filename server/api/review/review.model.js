'use strict';

import mongoose from 'mongoose';

var ReviewSchema = new mongoose.Schema({
  courseId: Object,
  description: String,
  interactionReview: String,
  interactionStarRating: Number,
  jobReview: String,
  jobStarRating: Number,
  materialReview: String,
  materialStarRating: Number,
  overallReview: String,
  overallStarRating: Number,
  valueReview: String,
  valueStarRating: Number,
  userEmail: String,
  userFirstName: String
});

export default mongoose.model('Review', ReviewSchema);
