// var timing = new Date().toLocaleTimeString('en-US', { hour12: false, 
//   hour: "numeric", 
//   minute: "numeric"});

const Time = ()=>{
  var t = new Date();
  var timing = (t.getHours()<12 && "Morning" || t.getHours()<17 && "Afternoon" || "Night");
  const m = t.toLocaleString('default', { month: 'long' });

  var date = m + '-' + t.getDate();

  return {timing,date}
}

export default Time