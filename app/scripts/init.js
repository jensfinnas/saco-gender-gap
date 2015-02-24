(function() {
	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	app.color = {
		women: '#C2438C',
		womenRaise: '#D6AEC8',
		men: '#6EB3BF'
	}

	app.init = function(containerId, chartId) {
		app.$container = $(containerId);
		app.$sentences = app.$container.find('.sentences');
		app.$shortSentence = app.$sentences.find('.short-sentence');
		app.$longSentence = app.$sentences.find('.long-sentence');

		var storyId = getParameterByName('story');
		if (storyId == '') storyId = 'landsting';
		var story = app.getStory(storyId);

		app.chart = new Chart(chartId, story);

	}
})();