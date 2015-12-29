Package.describe({
  name: 'topperblues:reactive-datatables',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: "Fast and reactive jQuery DataTables using standard Cursors / DataTables API. Supports Bootstrap 3.",
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/topperblues/meteor-reactive-datatables.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.0');
  api.use(['templating'], 'client');
  api.addFiles([
    'jquery.dataTables.min.js',
    'reactive-datatables.js',
    'reactive-datatable-template.html',
    'reactive-datatable-template.js',
  ], 'client');
});

