import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket, $interval) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    this.slides = [
       'assets/images/landing-1.jpg',
       'assets/images/landing-2.jpg',
       'assets/images/landing-3.jpg'
    ];
    this.$interval = $interval
    this.slide = this.slides[0]; 
    var vm = this;
    this.$interval(function(){
      if(vm.slide == vm.slides[0])
          vm.slide = vm.slides[1];
      else if(vm.slide == vm.slides[1])
          vm.slide = vm.slides[2];
      else
          vm.slide = vm.slides[0];
    }, 5000, 0);
  }

  $onInit() {


    this.$http.get('/api/courses/checked/random/3')
      .then(response => {
        this.courses = response.data;
        // this.socket.syncUpdates('course', this.courses);
      });

    this.partners = [
/*       {'image': 'assets/images/partner-1.png', 'link': 'http://www.syntec-numerique.fr/'},
       {'image': 'assets/images/partner-2.png', 'link': 'https://www.ofaj.org/'},
       {'image': 'assets/images/partner-3.png', 'link': 'http://simplon.co/'},
       {'image': 'assets/images/partner-4.png', 'link': 'http://www.francoallemand.com/'},
       {'image': 'assets/images/partner-5.png', 'link': 'https://www.swapcard.com/'},*/
       {'image': 'assets/images/partner-6.png', 'link': 'http://athom.co/'},
       {'image': 'assets/images/partner-7.png', 'link': 'http://www.cluny-forum.org/'}
    ]
  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('sagarankApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
