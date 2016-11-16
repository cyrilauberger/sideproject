'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User, $http, $scope, socket) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  import() {
    if(this.coursesTxt) {
      this.success = 0;
      try {
        this.courses = JSON.parse(this.coursesTxt);
      }
      catch(err) {
        this.success = 2;
        console.log(err);
        return;
      }
      var success = true;
      var itemsProcessed = 0;
      var courseNb = this.courses.length
      var vm = this;

      angular.forEach(this.courses, function(course){
      //["recognizersLogos", "outputTags", "jobPositionsPostTraining"]
        if(course.outputTags){
          course.outputTags = course.outputTags.split(",");
          for(var i=0; i<course.outputTags.length; i++){
            course.outputTags[i] = course.outputTags[i].trim();
          }
        }
        else{
          course.outputTags = [];
        }
        if(course.jobPositionsPostTraining){
          course.jobPositionsPostTraining = course.jobPositionsPostTraining.split(",");
          for(var i=0; i<course.jobPositionsPostTraining.length; i++){
            course.jobPositionsPostTraining[i] = course.jobPositionsPostTraining[i].trim();
          }
        }
        else{
          course.jobPositionsPostTraining = [];
        }
        if(course.recognizersLogos){
          course.recognizersLogos = course.recognizersLogos.split(", ");
          for(var i=0; i<course.recognizersLogos.length; i++){
            course.recognizersLogos[i] = course.recognizersLogos[i].trim();
          }
        }
        else{
        course.recognizersLogos = [];
        }
        if(course.recognitionBy){
          course.recognitionBy = course.recognitionBy.split(", ");
          for(var i=0; i<course.recognitionBy.length; i++){
            course.recognitionBy[i] = course.recognitionBy[i].trim();
          }
        }
        else{
        course.recognitionBy = [];
        }
        if(course.name){
          console.log(course.name);
          vm.$http.post('/api/courses',
            course
          ).then(
            function successCallBack(response){
              console.log(response);
              itemsProcessed++;
              if (success && itemsProcessed==courseNb){
                vm.success = 1
              }
              else if (!success && itemsProcessed==courseNb){
                vm.success = 2
              }
            },
            function errorCallBack(response){
              vm.$http.put('/api/courses/id/' + course.id,
                course
              ).then(
              function successCallBack(response){
                console.log(response);
                itemsProcessed++;
                if (success && itemsProcessed==courseNb){
                  vm.success = 1
                }
                else if (!success && itemsProcessed==courseNb){
                  vm.success = 2
                }
            },
              function errorCallBack(response){
                console.log(response);
                success = false;
                itemsProcessed++;
                if (success && itemsProcessed==courseNb){
                  vm.success = 1
                }
                else if (!success && itemsProcessed==courseNb){
                  vm.success = 2
                }
              })
          });
        }
      });
    };
    angular.extend(this, {
      success: vm.success
  });
  }
}
