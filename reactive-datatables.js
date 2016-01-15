ReactiveDatatable = function(options) {
	var self = this;

	this.options = options = _.defaults(options, {
		// Any of these can be overriden by passing an options 
		// object into your ReactiveDatatable template (see readme)
		stateSave: true,
		stateDuration: -1, // Store data for session only
		pageLength: 5,
		lengthMenu: [3, 5, 10, 50, 100],
		columnDefs: [{ // Global default blank value to avoid popup on missing data
			targets: '_all',
			defaultContent: '–––'
		}],
		stateLoadParams: function(settings, data) {
			// Make it easy to change to the stored page on .update()
			self.page = data.start / data.length;
		}
	});
};

ReactiveDatatable.prototype.update = function(data) {
	if (!data) return;
	var self = this;

	self.datatable
		.clear()
		.rows.add(data)
		.draw(false)
		.page(self.page || 0) // XXX: Can we avoid drawing twice?
		.draw(false);		  // I couldn't get the page drawing to work otherwise
};


RDServerSideProcessing = function (dataFunction, options) {

	return function ( request, drawCallback, settings ) {


		var order = {};
		$.each(request.order,function(index, value){
			var dir = 1;
			if(value.dir=="desc")
				dir=-1;
			order[request.columns[value.column].data] = dir;
		});


		var pagination = {
			skip: request.start,
			limit: request.length,
			sort:order
		};

		if(options.serverSideMethod) {
            var find = [];
            var regex = "";
            if(request.search.value!=""){
                $.each(request.columns,function(index, value){

                    regex = new RegExp(".*"+request.search.value+".*","i");
                    find.push(value.data);

                });
            }

			Meteor.call(dataFunction(), find, regex.source, pagination, function (error, collectionData) {

				var json = {
					"draw": parseInt(request.draw),
					"recordsTotal": collectionData.total,
					"recordsFiltered": collectionData.filtered,
					"data": collectionData.data
				};

				drawCallback(json);
			});
		}else{
            var find = {};

            if(request.search.value!=""){
                var find_cond = [];
                $.each(request.columns,function(index, value){
                    var tmp_obj = {};
                    tmp_obj[value.data]= new RegExp(".*"+request.search.value+".*","i");
                    find_cond.push(tmp_obj);
                });
                if(find_cond.length>0)
                    find = { $or: find_cond };
            }

			var collectionData = dataFunction(find, pagination);

			var json = {
				"draw": parseInt(request.draw),
				"recordsTotal": collectionData.total,
				"recordsFiltered": collectionData.filtered,
				"data": collectionData.data
			};

			drawCallback(json);
		}
	}



}




