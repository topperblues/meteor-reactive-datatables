Template.ReactiveDatatable.rendered = function() {
    var data = this.data;

    if (typeof data.tableData !== "function") {
        throw new Meteor.Error('Your tableData must be a function that returns an array via Cursor.fetch(), .map() or another (hopefully reactive) means')
    }

    if(data.options.serverSide){

        data.options.processing = true;
        data.options.ajax = RDServerSideProcessing(data.tableData, data.options);

        var reactiveDataTable = new ReactiveDatatable(data.options);

        var table = document.createElement('table');

        table.className = 'table dataTable';

        this.$('.datatable_wrapper').append(table);

        var dt = $(table).DataTable(data.options);
        reactiveDataTable.datatable = dt;
/*
        dt.on('page.dt', function (e, settings) {
            var info = dt.page.info();
            reactiveDataTable.page = info.page;
        });
*/

    }else {

        var reactiveDataTable = new ReactiveDatatable(data.options);

        var table = document.createElement('table');
        table.className = 'table dataTable';

        this.$('.datatable_wrapper').append(table);
        var dt = $(table).DataTable(data.options);
        reactiveDataTable.datatable = dt;

        dt.on('page.dt', function (e, settings) {
            var info = dt.page.info();
            reactiveDataTable.page = info.page;
        });

        this.autorun(function () {
            reactiveDataTable.update(data.tableData());
        });
    }
};