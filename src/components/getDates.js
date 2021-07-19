export function findDate(date)
{
    let yesterday = new Date(Date.now() - 24*60*60*1000);
    var start = new Date();
    start.setHours(0,0,0,0);
    var yesterdayStart = new Date(yesterday);
    yesterdayStart.setHours(0,0,0,0);
    
    let date1 = new Date(date);
    
    const localTime = date1.getTime()
    const localOffset = date1.getTimezoneOffset() * 60 * 1000
    const utcTime = localTime
    const date_ob = new Date(utcTime);

    let d = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0"+date_ob.getHours()).slice(-2);
    let minutes = ("0"+date_ob.getMinutes()).slice(-2);
    let seconds = ("0"+date_ob.getSeconds()).slice(-2);
    if(new Date(date)>new Date(start))
    {
      return `${hours}:${minutes}:${seconds}`;
    }
    else if(new Date(date)>new Date(yesterdayStart))
    {
        return "yesterday";
    }
    else
    {
        return `${year}-${month}-${d}`;
    }
}

export function findDifferenceInTime(date)
{
    let date3=new Date();
    var Difference_In_Time = date3.getTime() - new Date(date).getTime();
    let hour =Math.floor(Difference_In_Time / (1000*3600));
    let days =Math.floor(Difference_In_Time / (1000*3600*24));
    let months =Math.floor(Difference_In_Time / (1000*3600*24*30));
    let years =Math.floor(Difference_In_Time / (1000*3600*24*365));
    if(years>0)
    {
        return years+" years ago";
    }
    else if(months>0)
    {
        return months+" months ago";
    }
    else if(days>0)
    {
        return days+" days ago";
    }
    else if(hour>0)
    {
        return hour+" hour ago";
    }
    return hour+" hour ago";
}