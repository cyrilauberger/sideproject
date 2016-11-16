'use strict';

import mongoose from 'mongoose';

var CourseSchema = new mongoose.Schema({
  id: {type: Number, unique: true, required: true},
  checked: Boolean,
  provider: String,
  institute: String,
  name: String,
  mode: String,
  location: String,
  category: String,
  trainingType: String,
  complexity: String,
  dedication: String,
  duration: String, // SHOULD BE NUMBER?
  weeklyInvestment: String, // SHOULD BE NUMBER?
  pricingModel: String,
  fee: Number,
  currency: String,
  estimatedTotalCost: Number,
  additionalCostInformation: String,
  jobGuarantee: Boolean,
  mentor: Boolean,
  careerSupport: Boolean,
  startDate: String, // SHOULD BE DATE?
  outputTags: Array,
  description: String,
  requirements: String,
  jobPositionsPostTraining: Array,
  specials: String,
  language: String,
  providesCertification: Boolean,
  postGraduationIncomeExpectations: Number,
  incomeExpectationCountry: String,
  incomeExpectationCurrency: String,
  admissionRate: Number,
  graduationRate: Number,
  inJobRate6Months: Number,
  numberOfGraduates: Number,
  absoluteIncomeIncrease: String,
  relativeIncomeIncrease: String,
  certifiedResults: Boolean,
  recognized: Boolean,
  recognitionBy: Array,
  recognizersLogos: Array,
  numberOfLinkedInResults: Number,
  ratingGraduates: Number,
  ratingGraduatesScale: Number,
  ratingGraduatesNb: Number,
  link: String,
  providerLogo: String,
  instituteLogo: String,
  notes: String,
  ratingUsers: Number,
  ratingUsersNb: Number
/*  numberOfGraduatesParticipated: Number,
  rankingGraduates: String,
  ratingExperts: Number,
  ratingExpertsNb: Number,*/
});

CourseSchema.statics.getCount = function(query) {
  var fields = ["provider", "institute", "name", "mode", "location", "category", "trainingType", "complexity", "dedication", "outputTags", "Description", "requirements", "jobPositionsPostTraining", "specials", "link", "providerLogo", "instituteLogo", "notes"];
  var orQuery = [];
  for (var i=0; i<fields.length; i++) {
    var queryJson = {};
    queryJson[fields[i]] = {"$regex": query, "$options": "i"};
    orQuery.push(queryJson);
  }
  var finalQuery = {$and: [{$or: orQuery}, {"checked": true}]};
  console.log(finalQuery);
  return this.count(finalQuery);
}

CourseSchema.statics.findChecked = function(currentPage, size) {
  var finalQuery = {"checked": true};
  currentPage = parseInt(currentPage);
  size = parseInt(size);
  return this.find(finalQuery,{},{skip: (currentPage - 1) * size, limit: size})
};

CourseSchema.statics.findByIntegerId = function(id) {
  return this.find({"id": id});
};

CourseSchema.statics.findRandom = function(number) {
  return this.aggregate({$match: {"checked": true}}, {$sample:{size: parseInt(number)}});
};

CourseSchema.statics.findQuery = function(currentPage, size, query) {
  // TO ADD THE OTHER FILTERS JUST PUT MULTIPLE VARIABLES IN THE FUNCTION, AND ADD AN OPTIONAL $AND IN THE QUERY
  var fields = ["provider", "institute", "name", "mode", "location", "category", "trainingType", "complexity", "dedication", "outputTags", "Description", "requirements", "jobPositionsPostTraining", "specials", "link", "providerLogo", "instituteLogo", "notes"];
  var orQuery = [];
  for (var i=0; i<fields.length; i++) {
    var queryJson = {};
    queryJson[fields[i]] = {"$regex": query, "$options": "i"};
    orQuery.push(queryJson);
  }
  currentPage = parseInt(currentPage);
  size = parseInt(size);
  var finalQuery = {$and: [{$or: orQuery}, {"checked": true}]};
  var result = {};
  return this.find(finalQuery, {}, {skip: (currentPage - 1) * size, limit: size});
};

export default mongoose.model('Course', CourseSchema);
