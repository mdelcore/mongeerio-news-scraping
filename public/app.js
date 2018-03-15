$(document).ready(function() {
	$.getJSON("/articles", function(data) {
		for (var i = 0, i < data.length; i++) {

			var thumbnail = $('<img/>', {
				class: 'thum-elem',
				src: data[i].thumb
			});
			var title = $('<h5/>', {
				class: 'title-elem',
				text: data[i].title
			});
			var description = $('<p/>', {
				class: 'desc-element',
				text: data[i].desc
			});
			var link = $('<a/>', {
				class: 'ling-elem',
				href: data[i].link
			});
			var comment_link = $('<a/>', {
				class: 'comment-link-elem',
				href: '/comments'
			});
			var col1 = $('<div/>', {
				class: 'col s12 m8 l9'
			});
			var col2 = $('<div/>', {
				class: 'col s12 m8 l9'
			});
			var row_title = $('<div/>', {
				class: 'row title-row'
			});
			var row_desc = $('<div/>', {
				class: 'row desc-row'
			});
			var row_article = $('<div/>', {
				class: 'row article-row'
			});
			link.append(title);
			row_title.append(link);
			row_desc.append(description);
			comment_link.append(thumbnail);
			col2.append(row_title);
			col2.append(row_desc);
			col1.append(comment_link);
			row_article.append(col1);
			row_article.append(col2);

			$("#articles").append(row_article);
		}
	});

});