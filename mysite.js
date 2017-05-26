$(function() {
	var searchResult, projects,source;
	sessionStorage.clear('searchResult');
	if (sessionStorage.getItem("searchResult") === null){
		var url = MyAutocomplete.url + "?action=my_search";
		$.ajax({
			url 	: url,
			type	: 'POST',
			data	: { action	: 'my_search' },
		}).done(function(response){
			sessionStorage.setItem( 'searchResult', response );//Array having sessionStorage value
			source= JSON.parse(sessionStorage.getItem('searchResult'));
		$( ".search-input" ).autocomplete({
		  minLength: 1,
		  source: function (request, response) {
					var term = $.ui.autocomplete.escapeRegex(request.term)
					, startsWithMatcher = new RegExp("^" + term, "i")
					, startsWith = $.grep(source, function(value) {
						return startsWithMatcher.test(value.label || value.value || value);
					})
					, containsMatcher = new RegExp(term, "i")
					, contains = $.grep(source, function (value) {
						return $.inArray(value, startsWith) < 0 &&
							containsMatcher.test(value.label || value.value || value);
					});
					response(startsWith.concat(contains));
				},
		  focus: function( event, ui ) {
			$( ".search-input" ).val( ui.item.label );
			return false;
		  },
		  select: function( event, ui ) {
			window.location.href = ui.item.url;
			return false;
		  }
		});
		});
	} 
	source= JSON.parse(sessionStorage.getItem('searchResult'));
	if(source!=null){
		source.sort();
	}
	$( ".search-input" ).autocomplete({
		  minLength: 1,
		  source: function (request, response) {
					var term = $.ui.autocomplete.escapeRegex(request.term)
					, startsWithMatcher = new RegExp("^" + term, "i")
					, startsWith = $.grep(source, function(value) {
						return startsWithMatcher.test(value.label || value.value || value);
					})
					, containsMatcher = new RegExp(term, "i")
					, contains = $.grep(source, function (value) {
						return $.inArray(value, startsWith) < 0 &&
							containsMatcher.test(value.label || value.value || value);
					});

				response(startsWith.concat(contains));
			},
		  focus: function( event, ui ) {
			$( ".search-input" ).val( ui.item.label );
			return false;
		  },
		  select: function( event, ui ) {
			window.location.href = ui.item.url;
			return false;
		  }
		});
	});