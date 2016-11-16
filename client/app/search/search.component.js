'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './search.routes';

export class SearchComponent {
  /*@ngInject*/
  constructor($http, $state, $location) {
    var vm = this;
    vm.loading = true;
    if ($http){
      vm.$http = $http;
    }
    if ($state){
      vm.$state = $state;  
    }
    if ($location){
      vm.$location = $location;
    }
    var params = vm.$location.search();
    vm.svc = {};
    vm.svc.filters = {skill: true, job: true, tags: [], min: 0, max: 10000};
    vm.svc.pagination = {size: 12, currentPage: 1, total: 0};

    if(params.query){
      vm.svc.filters.query = params.query;
      vm.$http.get('/api/courses/' + vm.svc.pagination.currentPage + '/' + vm.svc.pagination.size + '/query/' + vm.svc.filters.query).then(
        function success(response) {
          vm.$http.get('/api/courses/count/query/' + vm.svc.filters.query).then(
            function success(count) {
              vm.svc.pagination.total = count.data;
              vm.courses = response.data;
              vm.loading = false;
          }, function error(response) {
            console.log(response);
          });
        }, function error(response) {
        console.log(response);
      });
    }
    else{
      vm.$http.get('/api/courses/checked/' + vm.svc.pagination.currentPage + '/' + vm.svc.pagination.size).then(function success(response) {
        vm.svc.pagination.total = response.data.length;
        vm.courses = response.data;
        vm.loading = false;
      });
    }
  }

  search($http, $location, restart) {
    var vm = this;

    if(restart){
      vm.svc.pagination.currentPage = 1;
    }
    vm.loading = true;
    var fromHit = (vm.svc.pagination.currentPage-1) * vm.svc.pagination.size;

    var queryfilters = []

    if(vm.svc.filters.query){
      queryfilters.push({
        "query_string": {
          "query": vm.svc.filters.query.concat("*"),
          "fields": ["provider", "institute", "name", "mode", "location", "category", "trainingType", "complexity", "dedication", "outputTags", "Description", "requirements", "jobPositionsPostTraining", "specials", "link", "providerLogo", "instituteLogo", "notes"]
        }
      })
    }
    if(vm.svc.filters.min>0||vm.svc.filters.max<10000){
      var range = {};
      if(vm.svc.filters.min>0){
        range["gte"] = vm.svc.filters.min;
      }
      if(vm.svc.filters.max<10000){
        range["lte"] = vm.svc.filters.max;
      }
      queryfilters.push({ "range": { "estimatedTotalCost": range}});
    }


    if(vm.svc.filters.skill&&!vm.svc.filters.job){
      queryfilters.push({"match":{"trainingType":'Formation continue'}});
    }
    if(!vm.svc.filters.skill&&vm.svc.filters.job){
      queryfilters.push({"match":{"trainingType":'Formation initiale'}});
    }
    if(!vm.svc.filters.skill&&!vm.svc.filters.job){
      queryfilters.push({"match":{"trainingType":''}});
    }

    var tagsArray = vm.getTagsArray();
    if (tagsArray.length!=0){
      queryfilters.push({
        "terms" : {
          "outputTags" : tagsArray
        }
      })
    }
    // TO FINISH - HERE ADD THE CALL TO THE API WITH THE VARIABLES
    console.log(queryfilters);
    console.log(vm.courses);
    vm.loading=false;
  }

  doSearch() {
    this.search(true);
  }

  getTagsArray() {
    var vm = this;
    var tagsArray = [];
    angular.forEach(vm.svc.filters.tags, function(tag){
      tagsArray.push(tag);
    });
    return tagsArray;
  };

  clickSearch() {
    var vm = this;
    if(vm.svc.filters.query){
      vm.$state.go('searchWithText',{query: vm.svc.filters.query});
    }
  };
}

export default angular.module('sagarankApp.search', [uiRouter])
  .config(routes)
  .component('search', {
    template: require('./search.html'),
    controller: SearchComponent,
    controllerAs: 'searchCtrl'
  })
  .name;
