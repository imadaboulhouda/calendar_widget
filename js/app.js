(function($){
    function incDay(date, n) {
        var fudate = new Date(new Date(date).setDate(new Date(date).getDate() + n));
        fudate = fudate.getFullYear() + '-' + (fudate.getMonth() + 1) + '-' + fudate.toDateString().substring(8, 10);
        return new Date(fudate);
    }

    function DencDay(date, n) {
        var fudate = new Date(new Date(date).setDate(new Date(date).getDate() - n));
        fudate = fudate.getFullYear() + '-' + (fudate.getMonth() - 1) + '-' + fudate.toDateString().substring(8, 10);
        return new Date(fudate);
    }

    function getDayName(dateStr, locale,type='day')
{
    var date = new Date(dateStr);
    if(type=='day')
    return date.toLocaleDateString(locale, { weekday: 'long' });        
    if(type=='month')
    {
        return date.toLocaleDateString(locale, { month: 'long' });  
    }
}

function refreshByDate(date,period,add="",realtime=false)
{
    console.log(period);
    var today =date;
    console.log('today is',today)
    if(period == "right")
    {
        var data = "";
        if(!realtime)
        today = incDay(today,1);
        var dayis = getDayName(today,"fr");
        


       data+="<div>"+dayis+" "+today.getDate()+" "+getDayName(today,'fr','month')+" "+today.getFullYear()+"</div>";
       lastDate = "";
       for(var i=1;i<=2;i++)
       {
           if(!todayPlus5Day)
           {
            var todayPlus5Day = incDay(today,1);
           }else{
             todayPlus5Day = incDay(todayPlus5Day,1);
           }
        
       
      
        var dayis2 = getDayName(todayPlus5Day,"fr");

        lastDate = todayPlus5Day;
       data+="<div>"+dayis2+" "+todayPlus5Day.getDate()+" "+getDayName(todayPlus5Day,'fr','month')+" "+todayPlus5Day.getFullYear()+"</div>";

       }
        $(".calendarWidget__items").html(data);
        if(add)
        {
            $(".left_controls").attr('data-first',date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate());
        }
        $(".right_controls").attr('data-last',lastDate);
    }  

    if(period == "left")
    {
        var data = "";
        
        console.log(today)
       
        today.setDate( today.getDate() - 2 );
        console.log("Today is ",today)
        var dayis = getDayName(today,"fr");
        
        console.log('period',period)

       data+="<div>"+dayis+" "+today.getDate()+" "+getDayName(today,'fr','month')+" "+today.getFullYear()+"</div>";
       lastDate = "";
       for(var i=1;i<=2;i++)
       {
           if(!todayPlus5Day)
           {
            var todayPlus5Day = incDay(today,1);
           }else{
             todayPlus5Day = incDay(todayPlus5Day,1);
           }
        
       
      
        var dayis2 = getDayName(todayPlus5Day,"fr");

        lastDate = todayPlus5Day;
       data+="<div>"+dayis2+" "+todayPlus5Day.getDate()+" "+getDayName(todayPlus5Day,'fr','month')+" "+todayPlus5Day.getFullYear()+"</div>";

       }
        $(".calendarWidget__items").html(data);
        console.log(add)
        if(add)
        {
            $(".left_controls").attr('data-first',today);
        }
        $(".right_controls").attr('data-last',lastDate);
    }
        
}
    function refreshDate(type="",leftDate)
    {
        if(type== "")
        {
            refreshByDate(new Date(),"right",'',true);
           /* var today = new Date();
      
        var data = "";
        var dayis = getDayName(today,"fr");


       data+="<div>"+dayis+" "+today.getDate()+" "+getDayName(today,'fr','month')+" "+today.getFullYear()+"</div>";
       lastDate = "";
       for(var i=1;i<=2;i++)
       {
           if(!todayPlus5Day)
           {
            var todayPlus5Day = incDay(today,1);
           }else{
             todayPlus5Day = incDay(todayPlus5Day,1);
           }
        
       
      
        var dayis2 = getDayName(todayPlus5Day,"fr");

        lastDate = todayPlus5Day;
       data+="<div>"+dayis2+" "+todayPlus5Day.getDate()+" "+getDayName(todayPlus5Day,'fr','month')+" "+todayPlus5Day.getFullYear()+"</div>";

       }
        $(".calendarWidget__items").html(data);
        $(".right_controls").attr('data-last',lastDate);*/
        return; 
        }

        if(type == "right")
        {
            var last =  new Date($(".right_controls").attr('data-last'));
           refreshByDate(last,"right","add");
        }else if(type == "left")
        {
            var last =  new Date(leftDate);
           
             
             refreshByDate(last,"left","yes");
        }
        
        

    }
    $(function(){

       

        //refresh liste 
       


    refreshDate();






        //selection 
        $(document).on('click','.element',function(){
            $(".element.active").removeClass('active');
            $(this).addClass('active');
        });      

        //change range 
        $(document).on('click','.right_controls',function(e){
            e.preventDefault();
            refreshDate('right');


            return false;
        });


        $(document).on('click','.left_controls',function(e){
            e.preventDefault();
            refreshDate('left',$(this).data('first'));


            return false;
        });

    });
})(jQuery);