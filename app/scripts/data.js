(function() {
	app.data = {
		men: {
			name: 'Män i privat sektor',
			salary: 33000,
			raise: false
		},
		kvinnorlandsting: {
			name: 'Kvinnor i landsting',
			salary: 30700,
			raise: true
		},
		kvinnorkommun: {
			name: 'Kvinnor i kommuner',
			salary: 26100,
			raise: true
		}
	};
	app.getStory = function(key) {
		return stories[key];
	}
	var stories = {
		'landsting': {
			columns: ['men', 'kvinnorlandsting'],
			sentenceShort: 'Nästan.',
			sentenceLong: 'Med 10 procents löneökning skulle kvinnor anställda i landsting nästa komma ikapp män i privat sektor.'
		},
		'kommun': {
			columns: ['men', 'kvinnorkommun'],
			sentenceShort: 'Nej!',
			sentenceLong: 'Även med en 10 procents löneökning skulle kvinnor anställda i kommuner inte komma ikapp män i privat sektor.'
		}
	}
})();