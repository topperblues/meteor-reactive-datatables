Meteor.methods({
    RDParseSearchServerSide : function(search, regex){
        var find = {};
        if(search.length>0){
            var find_cond = [];
            search.forEach(function(value){
                var tmp_obj = {};
                tmp_obj[value]= new RegExp(regex,"i");
                find_cond.push(tmp_obj);
            });
            if(find_cond.length>0)
                find = { $or: find_cond };
        }
        return find;

    }
});
