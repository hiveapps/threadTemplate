var hive = angular.module('hive.services', []);

//Messaging Service
hive.factory('postService', function($firebaseArray) {
	var fb = new Firebase("https://threadtemplate.firebaseio.com/posts");
	var posts = $firebaseArray(fb);
	var postService= {
		all: posts,
		get: function(postID) {
			return posts.$getRecord(postID);
		}
	};
	return postService;
});