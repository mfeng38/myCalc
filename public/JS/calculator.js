var m = document.getElementById('mean');
var w = document.getElementById('weighted');
var rowButton = document.getElementById('rowbttn');
var gr = document.getElementsByClassName('inpbox');
var tbl = document.getElementById('tbl1');
var numRows = 4;
var first = true;

var numerator = document.getElementsByName('grade');
var denominator = document.getElementsByName('total');
var weights = document.getElementsByName('weight');
var result = document.getElementById('answr');
var prevAnswer = document.getElementById('prvanswr');
var prcnt = document.getElementsByName('percent');

for(i=0; i < gr.length; i++)
{
  gr[i].oninput = percent;
}
m.onclick = mean;
w.onclick = weighted;
rowButton.onclick = addRow;

function percent(){
  for(i=0; i < numerator.length; i++)
  {
    if(isFinite(numerator[i].value/denominator[i].value))
    {
      prcnt[i].innerHTML = parseFloat( ( numerator[i].value/denominator[i].value ) * 100 ) + "%";
    }
    else
    {
      prcnt[i].innerHTML = "";
    }
  }
}

function mean(){
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
    prevAnswer.innerHTML = result.textContent;
    result.innerHTML = parseFloat( (sum/counter)*100 ) + "%";
  }
}

function weighted(){
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
    prevAnswer.innerHTML = result.textContent;
    result.innerHTML = parseFloat( (sum/counter)*100 ) + "%";
  }

}

function addRow(){
  var row = tbl.insertRow();
  numRows++;
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  cell1.innerHTML = "Activity " + numRows;
  cell2.innerHTML = "A" + numRows;
  cell3.innerHTML += "<input type='text' name='weight' class='inpbox'>";
  cell4.innerHTML += "<input type='text' name='grade' class='inpbox'> <font size='5'>/</font><br></br><input type='text' name='total' class='inpbox'>";
  cell5.setAttribute("name", "percent");
  for(i=gr.length-3; i < gr.length; i++)
  {
    gr[i].oninput = percent;
  }
}
