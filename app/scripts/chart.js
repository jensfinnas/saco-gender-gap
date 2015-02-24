Chart = (function() {
	var colors = {};

	function Chart(selector, story) {
		var self = this;
		self.story = story;
		self.columns = ['Lön'].concat(story.columns.map(function(column) {
			var d = app.data[column]
			return d.salary;
		}));
		self.chart = c3.generate({
			bindto: selector,
			data: {
				columns: [self.columns],
				type: 'bar',
				order: 'asc',
				colors: colors,
				labels: {
					format: function(v, id, i, j) {
						if (id == 'Lön') {
							return numberFormat(v) + ' kr';
						}
						else if (i == 0) {
							return '';
						}
						return numberFormat(v / 0.1 + v) + ' kr';
					}
				},
				empty: {
					label: {
						text: ''
					}
				},
				color: function(originalColor, d) {
					var color = originalColor;
					if (d.id == 'Lön') {
						color = d.index > 0 ? app.color.women  : app.color.men;
					}
					else if(d.id == 'Höjning') {
						color = d.index > 0 ? app.color.womenRaise  : app.color.men;
					}
					return color;
				},
				seletion: {
					enabled: false
				}
			},
			axis: {
				x: {
					type: 'category',
					categories: story.columns.map(function(d) { return app.data[d].name; }),
					height: 50
				},
				y: {
					show: false,
					max: app.data.men.salary,
					padding: {
						top: 50
					},
					tick: {
						format: function (d) { return numberFormat(d); }
					}
				}
			},
			legend: {
				show: false
			},
			tooltip: {
				show: false
			}
			
		});
	}
	Chart.prototype.addRaise = function() {
		var self = this;
		// Hack: Hide total wage for women
		d3.selectAll('.c3-texts-Lön text:last-child').attr('opacity',0)

		// Write texts
		app.$shortSentence.text(self.story.sentenceShort);
		app.$longSentence.text(self.story.sentenceLong);


		// Hide button
		app.$container.find('.add-raise').slideToggle(500, function() {
			// Show text
			app.$sentences.slideToggle();
		});
		
		

		var newColumns = ['Höjning'].concat(self.story.columns.map(function(column) {
			var d = app.data[column]
			return d.raise ? d.salary * 0.1 : 0;
		}));
		self.chart.load({
			columns: [newColumns]
		});
		self.chart.groups([['Lön', 'Höjning']]);
	}
	return Chart;
})();