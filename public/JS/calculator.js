var m = document.getElementById('mean');
var w = document.getElementById('weighted');
var gr = document.getElementsByClassName('inpbox');
for(i=0; i < gr.length; i++)
{
  gr[i].oninput = percent;
}
m.onclick = mean;
w.onclick = weighted;

function percent(){
  var numerator = document.getElementsByName('grade');
  var denominator = document.getElementsByName('total');
  var rslt = document.getElementsByName('percent');
  for(i=0; i < numerator.length; i++)
  {
    if(isFinite(numerator[i].value/denominator[i].value))
    {
      rslt[i].innerText = parseFloat( ( numerator[i].value/denominator[i].value ) * 100 ).toFixed(2) + "%";
    }
  }
}

function mean(){
  var numerator = document.getElementsByName('grade');
  var denominator = document.getElementsByName('total');
  var result = document.getElementById('answr');
  var sum = 0;
  var counter = 0;
  for(i=0; i < numerator.length; i++)
  {
    if(isFinite(numerator[i].value/denominator[i].value))
    {
      sum += (numerator[i].value/denominator[i].value);
      counter++;
    }
  }
  if(isFinite(sum/counter))
  {
    result.innerHTML = parseFloat( (sum/counter)*100 ).toFixed(2) + "%";
  }
}

function weighted(){
  var numerator = document.getElementsByName('grade');
  var denominator = document.getElementsByName('total');
  var weights = document.getElementsByName('weight');
  var result = document.getElementById('answr');
  var sum = 0;
  var counter = 0;
  for(i=0; i < numerator.length; i++)
  {
    if(isFinite(numerator[i].value/denominator[i].value) && isFinite(weights[i].value))
    {
      sum += ( (numerator[i].value/denominator[i].value) * weights[i].value );
      counter += parseInt(weights[i].value);
    }
  }
  if(isFinite(sum/counter))
  {
    result.innerHTML = parseFloat( (sum/counter)*100 ).toFixed(2) + "%";
  }
}
