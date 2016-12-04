'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './search.routes';

export class SearchComponent {
  /*@ngInject*/
  constructor($http, $state, $location, esService, $stateParams) {
    var vm = this;
    /*$window.scrollTo(0, 0); --> NECESSARY?? */

    var svc = {};
    svc.filters = {skill:true, job:true, tags: [], min: 0, max: 10000};
    svc.pagination = {size:12,currentPage:1,total:0};
    vm.svc = svc;
    vm.searchTags = esService.tags;
    /*vm.courses = [];*/

    vm.slider = {
      options: {
        floor: 0,
        step : 50,
        ceil: 10000,
        onEnd: function(){
          vm.search();
        },
        translate: function(value) {
           var translated = '$' + value;
           if(value == 10000){
            translated += " +";
           }
           if(value === 0){
            translated = "Gratuit";
           }
           return translated;
        }
      }
    };

    if($stateParams.query){
      vm.svc.filters.query = $stateParams.query;
    }

    esService.getPopularTags(20).then(function (response) {
      var tags = [];
      angular.forEach(response.aggregations.tags.buckets, function(bucket){
        tags.push(bucket.key);
      });

      if(tags.length>0){
        vm.searchTags = tags;
      }
    });

    vm.toggleTag = function(tag){
      var idx = vm.svc.filters.tags.indexOf(tag);
      if(idx==-1){
        vm.svc.filters.tags.push(tag);
      }else{
        vm.svc.filters.tags.splice(idx,1);
      }
      vm.search(true);
    };

    vm.getTagsArray = function(){
      var tagsArray = [];
      angular.forEach(vm.svc.filters.tags,function(tag){
        tagsArray.push(tag);
      });
      return tagsArray;
    };

    vm.doSearch = function(){
      vm.search(true);
    };

    vm.search = function(restart){
          console.log('lol1');
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

          esService.getCoursesSearched(vm.svc.pagination.size, fromHit, queryfilters).then(function(response) {
            vm.courses = response.hits.hits;
            vm.loading = false;
            vm.svc.pagination.total = response.hits.total;
          });
    }
    vm.search();
  }
  lol() {
    var aqsdmlsqkd = 0;
  }
}

export default angular.module('sagarankApp.search', [uiRouter])
  .config(routes)
  .component('search', {
    template: require('./search.html'),
    controller: SearchComponent,
    controllerAs: 'searchCtrl'
  })
  .name;
