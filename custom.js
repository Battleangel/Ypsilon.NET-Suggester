$(function() {
    jQuery.fn.extend({
        propAttr: $.fn.prop || $.fn.attr
    });    
    var cache = {};
    var collectParams = function(sFieldId) {        
        var sParam = 'locales='+$('#'+sFieldId+'_locales').val()+'&getGeoByLetter=1&railsearch='+$('#'+sFieldId+'_railsearch').val();
        return sParam;
    }; 
    
    
    var createAutoComplete = function(field) {
        $('#'+field).autocomplete({
            minLength: 3,
            source: function(request, response) {
                var term = request.term;
                if (term in cache) {
                    response(cache[ term ]);
                    return;
                }
                $.getJSON('/suggest.php?' + collectParams(field), request, function(data, status, xhr) {
                    cache[ term ] = data;
                    response(data);
                });
            },
            select: function(event, ui) {
                $('#' + field + '_hidden').val(ui.item.id)
            }
        });
    };
    createAutoComplete('depApt');
    createAutoComplete('dstApt');
             
});