'use strict';
const angular = require('angular');

/*@ngInject*/
/*export function esServiceService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
  var es = esFactory({
    host: "ec2-52-57-90-145.eu-central-1.compute.amazonaws.com/es"
  });

  es.getPopularTags = function(size){
    return es.search({index:'sagarank', type:'course', body:{
      "query": {
        "matchAll": {}
      },
      "size":0,
      "aggs": {
        "tags": {
          "terms": {
            "field": "outputTags",
            "size" : size
          }
        }
      }
    }
    });
  };

  es.getCoursesSearched = function(size, from, queryfilters){
    var querybody = {}
    querybody["query"] = {"bool": { "must": queryfilters}}
    querybody["query"]["bool"]["must"].push({"term": {"checked" : 1}})
    querybody["size"] = size
    querybody["from"] = from
    return es.search({index:'sagarank', type:'course', body: querybody});
  };

  es.getAllCourses = function(size, from){
    return es.search({index:'sagarank', type:'course', body:{
      "query": {
        "term": {"checked" : 1}
      },
      "size": size,
      "from": from
    }
    });
  };

  es.addToNewsletter = function(recipient){
  return es.index({
    index: 'sagarank',
    type: 'newsletter',
    id: recipient,
    body: {
      email: recipient,
      timestamp: new Date(),
    }
  });
  };

  es.getRandomCourses = function(size){
    return es.search({
        index:'sagarank',
        type:'course',
        body: {
            "size":size,
        "query": {
            "function_score" : {
            "query" : {"term": {"checked" : 1}},
            "random_score" : {}
            }
        }
        }
    });
  };

  es.addReview = function(review){
    return es.index({
      index: 'sagarank',
      type: 'review',
      body: {
        course_id: review.course_id,
        type: review.type,
        overallStarRating: review.overallStarRating,
        overallReview: review.overallReview,
        informationStarRating: review.informationStarRating,
        informationReview: review.informationReview,
        materialStarRating: review.materialStarRating,
        materialReview: review.materialReview,
        teachingStarRating: review.teachingStarRating,
        teachingReview: review.teachingReview,
        interactionStarRating: review.interactionStarRating,
        interactionReview: review.interactionReview,
        jobStarRating: review.jobStarRating,
        jobReview: review.jobReview,
        valueStarRating: review.valueStarRating,
        valueReview: review.valueReview,
        user_email: review.user_email,
        timestamp: new Date(),
      }
    });
  };

  es.updateCourseRatingUser = function(course_id, ratingUsers, ratingUsersNb){
    return es.update({
      index: 'sagarank',
      type: 'course',
      id: course_id,
      body: {
        "doc": {
            "ratingUsers": ratingUsers,
            "ratingUsersNb": ratingUsersNb
        }
      }
    });
  };

  es.addUser = function(user){
    return es.index({
      index: 'sagarank',
      type: 'user',
      id: user.email,
      body: {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        timestamp: new Date(),
      }
    });
  };

  es.getCourseUserReviews = function(course_id){
    return es.search({
      index: 'sagarank',
      type: 'review',
      body: {
        "sort" : [{ "overallReview" : {"order" : "desc"}}],
        "query" : {
            "constant_score" : {
                "filter" : {
                    "term" : {
                        "course_id" : course_id
                    }
                }
            }
        }
    }
    });
  };

  return es;
}

export default angular.module('sagarankApp.esService', ['esFactory'])
  .service('esService', esServiceService)
  .name;
*/