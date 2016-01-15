# Reactive Datatables

Provides a [meteor.js](http://www.meteor.com) way of using [jquery.dataTables](http://datatables.net/) with reactively-updating data, instant search, state saving / pagination etc.

## Credits

This plugin is a fork of ephemer:reactive-datatables.

## Changes

Added server side search and pagination, using publish or method.

## Installation

`meteor add topperblues:reactive-datatables`

## Usage

For client side pagination and other features refer to  ephemer:reactive-datatables, for server side pagination see below.

In your template:

    <template name="containsTheDataTable">
        {{> ReactiveDatatable tableData=reactiveDataFunction options=optionsObject }}
    </template>

**Important:** Due to the way Blaze interprets parameters upon calling a template, `reactiveDataFunction` should *return a __function__ that returns an array*, not return the data itself. I'm sure there's a cleverer way to do this, but it works for now:

*Pagination using Meteor.publish and Meteor.subscribe:*

    Template.containsTheDataTable.helpers({
        reactiveDataFunction: function () {
            return function (search, pagination) {
                           return {
                                 data: Meteor.users.find(search, pagination).fetch(),
                                 total: Meteor.users.find().count(),
                                 filtered: Meteor.users.find(search).count()
                           }
                       };
        },
        optionsObject: {

                       serverSide:true,

                            // ... see jquery.dataTables and ephemer:reactive-datatables docs for other options
                        }
    });

*Where pagination is an object like this:*
    pagination = {
    			skip: ...,
    			limit: ...,
    			sort: ...
    		};

*Pagination using Meteor.method and Meteor.call:*

    Template.containsTheDataTable.helpers({
            reactiveDataFunction: function () {
                return function () {
                               return "Meteor_Method_Name";
                           };
            },
            optionsObject: function(){
                    return{
                           serverSide:true,
                           serverSideMethod:true,
                                // ... see jquery.dataTables and ephemer:reactive-datatables docs for other options
                            };
            }
        });

*Server side Meteor.method:*

        Meteor.methods({
            Meteor_Method_Name: function (search, regex, pagination) {
                var searchParam = Meteor.call("RDParseSearchServerSide", search, regex);
                return {
                            data: Meteor.users.find(searchParam, pagination).fetch(),
                            total: Meteor.users.find().count(),
                            filtered: Meteor.users.find(searchParam).count()
                      }
            }
            });

