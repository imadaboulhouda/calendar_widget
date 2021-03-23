function incDay(date, n) {
    var fudate = new Date(new Date(date).setDate(new Date(date).getDate() + n));
    fudate = fudate.getFullYear() + '-' + (fudate.getMonth() + 1) + '-' + fudate.toDateString().substring(8, 10);
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

function dayDiff(d1, d2)
{
  d1 = d1.getTime() / 86400000;
  d2 = d2.getTime() / 86400000;
  return new Number(d2 - d1).toFixed(0);
}

function createHumainDate(today)
{
    var dayis = getDayName(today,"fr");
    return "<div>"+dayis+" "+today.getDate()+" "+getDayName(today,'fr','month')+" "+today.getFullYear()+"</div>";
}