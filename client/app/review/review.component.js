'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './review.routes';

export class ReviewComponent {
  /*@ngInject*/

  constructor($stateParams, $http, Auth) {
    this.$http = $http;
    var vm = this;
    vm.review = {}
    vm.$http.get('/api/courses/id/' + $stateParams.id).then(
      function successCallBack(response){
        vm.course = response.data[0];
        },
      function errorCallBack(response){
        console.log(response);
    });
    'ngInject';

    vm.$http.get('/api/users/me').then(
      function successCallBack(response){
        vm.user = response.data
        },
      function errorCallBack(response){
        console.log(response);
    });
  }

  selectStar(star_rating, ratingType) {
    var vm = this;
    vm.review[ratingType] = star_rating;
  };

  sendReview() {
    var vm = this;
    console.log(vm.review);
    vm.review.courseId = vm.course._id;
    vm.review.userEmail = vm.user.email;
    vm.review.userFirstName = vm.user.name;
    vm.$http.post('/api/reviews', vm.review).then(
      function successCallBack(response){
        if (vm.review.overallStarRating) { // Update the course star rating
          if (!vm.course.ratingUsersNb || !vm.course.ratingUsers){
            vm.course.ratingUsers = 0
            vm.course.ratingUsersNb = 0
          }
          var newRatingUsersNb = vm.course.ratingUsersNb + 1
          var newRatingUsers = (((vm.course.ratingUsers * vm.course.ratingUsersNb) + vm.review.overallStarRating) / newRatingUsersNb).toString();
          vm.$http.put('/api/courses/' + vm.review.courseId, {ratingUsers: newRatingUsers, ratingUsersNb: newRatingUsersNb}).then(function(){
            console.log("Average Star Rating for course ".concat(vm.review.courseId).concat(": ").concat(newRatingUsers))
          })
        }
      },
      function errorCallBack(response){
        console.log(response);
      }
    );
  }
}

export default angular.module('sagarankApp.review', [uiRouter])
  .config(routes)
  .component('review', {
    template: require('./review.html'),
    controller: ReviewComponent,
    controllerAs: 'reviewCtrl'
  })
  .name;
