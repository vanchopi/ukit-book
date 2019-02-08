$(document).ready(function(){	

	function setTable(id, author, title){
		const book_list=(
			'<tr class="list-item" data-bookId="' + id + '">'
	      		+ '<th class="list-item-number" scope="row">' + (id + 1) +'</th>'
	      		+ '<td class="list-item-author">' + author +'</td>'
	      		+ '<td class="list-item-title">' + title + '</td>'
	      		+ '<td class="list-item-buttons">'
	      			+ '<a class="btn btn-primary btn-sm btn-info editBt" href="#" role="button">Edit</a>'
					+ '<a class="btn btn-primary btn-sm btn-danger removeBt" href="#" role="button">Remove</a>'
	      		+ '</td>'
	    	+ '</tr>'
		);
		$('tbody.books-item').append(book_list);
	}

	function setBooksList(){
		var localBooks = JSON.parse(localStorage.getItem("books"));
		if (localBooks != null && localBooks.length > 0){
			for(var i = 0; i <= localBooks.length - 1; i++){
				setTable(localBooks[i].id, localBooks[i].author, localBooks[i].title)
			}
		}
	}

	function clearForm(){
		$('input#InputAuthor').val('');
		$('input#InputTitle').val('');
		$('input#InputYear').val('');
		$('input#InputPages').val('');
	}

	function addBook(){
		var id = 0;	
		var localBooks = JSON.parse(localStorage.getItem("books"));
		if (localBooks == null) {
			localBooks = []
		}
		if (localBooks.length > 0){
			id = localBooks[localBooks.length - 1].id + 1;
		}
		var author = $('input#InputAuthor').val();
		var title = $('input#InputTitle').val();
		var year = $('input#InputYear').val();
		var pages = $('input#InputPages').val();
		const book = {
			id: id,
			author: author,
			title: title,
			year: year,
			pages, pages
		}
		id++;
		window.localStorage.setItem('book-item', JSON.stringify(book));
		localBooks.push(book);
		window.localStorage.setItem('books', JSON.stringify(localBooks));
		setTable(book.id, book.author, book.title);
		clearForm();		
	}

	function removeBook(el){
		var id = $(el.target).closest('.list-item').data('bookid');
		var localBooks = JSON.parse(localStorage.getItem("books"));		
		localBooks.splice( $.inArray(localBooks[id], localBooks), 1 );
		$('tr.list-item').remove();
		for(var i = 0; i <= localBooks.length - 1; i++){
			localBooks[i].id = i;
			setTable(localBooks[i].id, localBooks[i].author, localBooks[i].title)
		}
		window.localStorage.setItem('books', JSON.stringify(localBooks));
	}

	function editBookForm(el){
		var id = $(el.target).closest('.list-item').data('bookid');
		var localBooks = JSON.parse(localStorage.getItem("books"));		
		$('input#InputBookId').val(localBooks[id].id);
		$('input#InputAuthor').val(localBooks[id].author);
		$('input#InputTitle').val(localBooks[id].title);
		$('input#InputYear').val(localBooks[id].year);
		$('input#InputPages').val(localBooks[id].pages);
		$('a.btn.edit').removeClass('hidden');		
		$('a.btn.add').addClass('hidden');		
	}

	function editBook(){
		var id = $('input#InputBookId').val();
		var localBooks = JSON.parse(localStorage.getItem("books"));		
		localBooks[id].author = $('input#InputAuthor').val();
		localBooks[id].title = $('input#InputTitle').val();
		localBooks[id].year = $('input#InputYear').val();
		localBooks[id].pages = $('input#InputPages').val();
		$('tr.list-item').remove();
		for(var i = 0; i <= localBooks.length - 1; i++){
			setTable(localBooks[i].id, localBooks[i].author, localBooks[i].title)
		};		
		window.localStorage.setItem('books', JSON.stringify(localBooks));
		$('a.btn.edit').addClass('hidden');		
		$('a.btn.add').removeClass('hidden');
		$('input#InputBookId').val('');
		clearForm();
	}

	setBooksList();

	$(".form-add-edit a.btn.add").on("click", function() {		
		addBook();
	})

	$(".form-add-edit a.btn.edit").on("click", function() {		
		editBook();
	})

	$(document).on("click","tbody.books-item a.removeBt", function(el) {
		removeBook(el)
	})

	$(document).on("click","tbody.books-item a.editBt", function(el) {
		editBookForm(el);
	})


})