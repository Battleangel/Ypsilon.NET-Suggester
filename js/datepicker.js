  $(function() { 
    var activeDatePicker = '';
    $("#datepicker2" ).click(function() {
        activeDatePicker = 'datepicker2';
    });
    $("#datepicker1" ).click(function() {
        activeDatePicker = 'datepicker1';
    });
    $("#datepicker1").datepicker({
        defaultDate: "+2d",
        changeMonth: false,
        numberOfMonths: 2,
        showAnim: '',               
        changeYear: false,
        minDate: +2,
        maxDate: "+365d",
        onClose: function(selectedDate) {
            $("#datepicker2").datepicker("option", "minDate", selectedDate );
            $("#datepicker2").datepicker("show");
            activeDatePicker = 'datepicker2';
            storeSelDate($(this).datepicker( 'getDate' ),'#Day','#month_1');           
        }
    });
    var storeSelDate = function(oDate,idDay,idMonthYear) {        
        if(oDate !== null && oDate !== undefined) {
            var selDay = oDate.getDate();
            var selMonth = oDate.getMonth()+1;
            var selYear  = oDate.getFullYear();
        
            $(idDay).val(selDay);
            $(idMonthYear).val(selMonth+'-'+selYear);
        }
    };
    $("#datepicker2" ).datepicker({
        defaultDate: "+1d",
        changeMonth: false,
        numberOfMonths: 2,
        showAnim: '',                
        changeYear: false,
        maxDate: "+365d",
        onClose: function( selectedDate ) {
            $( "#datepicker1" ).datepicker( "option", "maxDate", selectedDate );
            storeSelDate($(this).datepicker( 'getDate' ),'#RetDay','#month_2');
        }
    });
            
    $(document).on('mouseenter', '.ui-datepicker-calendar .ui-state-hover', function(e){
        
        var day1 =      $(this).text();
       
        var oDate1 = $("#datepicker1" ).datepicker('getDate');
        var oDate2 = $("#datepicker2" ).datepicker('getDate');
        
        var year1 = $(this).closest("td").data('year');
        var month1 = $(this).closest("td").data('month');
        
        var oDateHover = new Date(year1,month1,day1);
        
        if((activeDatePicker == 'datepicker1') || oDate1 === null || (oDate1 === undefined)) {
            return null;
        }
        
        $('.ui-datepicker-row-break').addClass('ui-datepicker-row-break-info');
        
        if((oDate2 !== null) && (oDate2 !== undefined)) {
            var diff = Math.abs((oDate1.valueOf() - oDate2.valueOf())/(24*60*60*1000))+1;
            $('.ui-datepicker-row-break').html(diff+' '+sTxtDay); 
        }
        
        var diff = Math.abs((oDate1.valueOf() - oDateHover.valueOf())/(24*60*60*1000))+1;
        $('.ui-datepicker-row-break').html(diff+' '+sTxtDay); 
        
        $('[data-handler=\"selectDay\"]').each(
                function () {
                    var cl = $(this).find('.ui-state-default');                                      
                    var year = $(this).data('year');
                    var month = $(this).data('month');
                    var day = cl.text();

                    var oItDate = new Date(year, month, day);
                    
                    if(!cl.hasClass('ui-state-active')) {
                        if(oItDate.valueOf() == oDate1.valueOf()) {
                            cl.addClass('ui-state-active');
                        }
                    }
                    if(oDateHover > oItDate && oDate1 < oItDate) {                       
                        cl.addClass('ui-state-range');
                    } else {
                        cl.removeClass('ui-state-range');                       
                    }                     
                    
                }
        );        
    });        
});