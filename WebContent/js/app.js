// angular 1

function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

if (isIE () && isIE () < 9) {
	 // is IE version less than 9
	alert('Please note that the DC Medical Form is not supported in IE versions earlier than 9.');
	} else {
	 // is IE 9 and later or not IE
	/*console.log('DC Medical form works fine in IE 9 and later or not in IE');*/
}

angular.module('myApp', ['myApp.services', 'myApp.controllers', 'myApp.routers', 'ui.bootstrap']);
// angular 2
//… imports
/*@Component({
  // HTML selector for this component
  selector: 'auth-app'
})*/


