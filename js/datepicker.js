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
        changeMonth: true,
        numberOfMonths: 2,
        showAnim: '',
        dateFormat: 'dd.mm.yy',
        changeMonth: false,
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
        
        //console.log(oDate);
        
        var selDay = oDate.getDate();
        var selMonth = oDate.getMonth()+1;
        var selYear  = oDate.getFullYear();
        
        $(idDay).val(selDay);
        $(idMonthYear).val(selMonth+'-'+selYear);
    };
    $("#datepicker2" ).datepicker({
        defaultDate: "+1d",
        changeMonth: true,
        numberOfMonths: 2,
        showAnim: '',
        dateFormat: 'dd.mm.yy',
        changeMonth: false,
        changeYear: false,
        maxDate: "+365d",
        onClose: function( selectedDate ) {
            $( "#datepicker1" ).datepicker( "option", "maxDate", selectedDate );
            storeSelDate($(this).datepicker( 'getDate' ),'#RetDay','#month_2');
        }
    });
    
    var dateToDateObject = function(sDate) {
        var aDate = sDate.split(".");            
        return new Date(aDate[2], aDate[1]-1, aDate[0]); 
    };
    
    $(document).on('mouseenter', '.ui-datepicker-calendar .ui-state-hover', function(e){
        //var c1 =        $(this).closest('.ui-datepicker-group');    //closest datepicker...
        
        
        var day1 =      $(this).text();
        //var month1 =    c1.find('.ui-datepicker-month').text();
        //var year1 =     c1.find('.ui-datepicker-year').text();                
        
        //var fullDate = day1 + "_" + month1 + "_" + year1;
        // get init date
        var date1 = $("#datepicker1" ).val();
        var date2 = $("#datepicker2" ).val();
        
        var year1 = $(this).closest( "td" ).data('year');
        var month1 = $(this).closest( "td" ).data('month');
        
        //console.log(year1+'-'+month1+'-'+day1);
        
        var oDateHover = new Date(year1,month1,day1);
        
        if((activeDatePicker == 'datepicker1') || (date1 === undefined) || (date1 == '')) {
            return null;
        }
        var oDate1 = dateToDateObject(date1);
        var oDate2 = dateToDateObject(date2);
        $('.ui-datepicker-row-break').addClass('ui-datepicker-row-break-info');
        //$('.ui-datepicker-row-break').html('test');   
        if((date2 !== undefined) && (date2 != '')) {
            var diff = Math.abs((oDate1.valueOf() - oDate2.valueOf())/(24*60*60*1000))+1;
            $('.ui-datepicker-row-break').html(diff+' Tage'); 
        }
        
        var diff = Math.abs((oDate1.valueOf() - oDateHover.valueOf())/(24*60*60*1000))+1;
        $('.ui-datepicker-row-break').html(diff+' Tage'); 
        
        $('[data-handler=\"selectDay\"]').each(
                function () {
                    var cl = $(this).find('.ui-state-default');
                    
                    
                    var year = $(this).data('year');
                    var month = $(this).data('month');
                    var day = cl.text();

                    var oItDate = new Date(year, month, day);
                    //console.log(oDateHover);
                    //console.log(oItDate);
                    //console.log(oDate1);
                    if(!cl.hasClass('ui-state-active')) {
                        if(oItDate.valueOf() == oDate1.valueOf()) {
                            cl.addClass('ui-state-active');
                        }
                    }
                   
                    if(oDateHover > oItDate && oDate1 < oItDate) {
                       // cl.removeClass('ui-state-default');
                        cl.addClass('ui-state-range');
                    } else {
                        cl.removeClass('ui-state-range');
                       // cl.addClass('ui-state-default');
                    }                     
                    
                }
        );
        
    });
    
    
});