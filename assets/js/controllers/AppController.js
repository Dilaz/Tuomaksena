'use strict';

module.exports = ['$http', '$scope', function($http, $scope) {
	$scope.posts = [];
	var posts = [];
	var page = 0;

	// Init posts
	$http.get('posts.json')
	.then(function(res) {
		// Reverse the list and save it
		posts = res.data.reverse();

		// Push the last post to scope
		$scope.posts.push(posts[0]);
	});

	/**
	 * Callback function for infinite scroll paging
	 * @return void
	 */
	$scope.blogPaging = function() {
		// Just end if we have no more posts
		if (page >= posts.length - 1) {
			return;
		}

		// Increase page (post) count
		page++;

		// Push the next post to scope
		$scope.posts.push(posts[page]);
	};
}];
