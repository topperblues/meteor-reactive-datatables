Package.describe({
  name: 'topperblues:reactive-datatables',
  version: '0.1.2',
  // Brief, one-line summary of the package.
  summary: "Fork of ephemer:reactive-datatables with server side search and pagination, using publish or method.",
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
  api.addFiles('reactive-datatables-server.js', 'server');
});

