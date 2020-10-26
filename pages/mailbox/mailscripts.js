function getAllMessagesForReciever(type) {
  var request = new XMLHttpRequest()

  request.open('GET', 'http://localhost:3002/messges')
  request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3002')
  request.setRequestHeader('Access-Control-Allow-Methods', 'GET')

  request.onload = function () {
    // Begin accessing JSON data here
    var table = document.getElementsByClassName("table table-hover table-striped")
    if (table.length >= 1) {
      //var rows = table[0].getElementsByTagName("tr")
      var rows = table[0].rows;
      var i = rows.length;
      while (--i) {
        if (rows[i].id != "templateRow") {
          rows[i].parentNode.removeChild(rows[i]);
          console.log('length ' + rows.length)
        }
      }
    }
    console.log("json response is ", this.response)
    var data = JSON.parse(this.response);
    var dataTemp = Array();
    //data = data.reverse();
    console.log("json response is data ", data)
    var maxID = 0;
    if (request.status >= 200 && request.status < 400) {
      dataTemp = Array();
      for (var i = 0; i < data.length; i++) {
        if (type == "All") {
          dataTemp.push(data[i])
          addRow(i)
        } else if (data[i].product == type) {
          dataTemp.push(data[i])
          addRow(i)
        }
      }
      var table = document.getElementsByClassName("table table-hover table-striped")
      console.log(table)
      function getTemplateRow(i) {
        console.log('here it sis ' + document.getElementById("templateRow"))
        var x = document.getElementById("templateRow").cloneNode(true);
        x.id = "";
        x.style.display = "";
        var name = x.getElementsByClassName("mailbox-name")[0];
        console.log(name.length)
        name.innerHTML = data[i].product;
        var name1 = x.getElementsByClassName("mailbox-subject")[0];
        console.log(name1.length)
        name1.innerHTML = data[i].consumer_complaint_narrative;
        var name2 = x.getElementsByClassName("mailbox-date")[0];
        console.log(name2.length)
        name2.innerHTML = data[i].time;
        return x;
      }
      function addRow(i) {
        var t = document.getElementsByClassName("table table-hover table-striped")
        var rows = t[0].getElementsByTagName("tr");
        var r = rows[rows.length - 1];
        r.parentNode.insertBefore(getTemplateRow(i), r);
      }
    }
    var t = document.getElementsByClassName("table table-hover table-striped")
    var rows = t[0].getElementsByTagName("tr");
    var docname  = document.getElementById(type)

    table[0].addEventListener("click", function () {
      console.log("clicked table is ")
      var t = document.getElementsByClassName("table table-hover table-striped")
      var rows = table[0].getElementsByTagName("tr");
      console.log("clicked table is ", rows.length)
      for (var index = 0; index < rows.length; index++) {
        (function (index) {
          rows[index].addEventListener("click", function (event) {
            //alert("Row " + index + " Clicked");
            console.log("index is ", dataTemp[index - 1])
            localStorage.setItem('obj', JSON.stringify(dataTemp[index - 1]))
            // if (typeof localStorage["obj"] !== "undefined") {
            //   var localObj = JSON.parse(localStorage["obj"]);
            //   console.log('data recieajhsgdsg  trtefs vedddd ', localObj.consumer_complaint_narrative)
            // }
            //var localObj = JSON.parse(localStorage.getItem('obj'));
            window.location.href = "./read-mail.html";
            console.log("index is ", dataTemp[index - 1])
          });
        }(index));
      }
    });
  }
  // Send request
  request.send()
}

function getReceivedData() {
  var localObj = JSON.parse(localStorage.getItem('obj'));
  console.log('data recievedddd ', localObj)
  //alert(localObj.product);mailbox-read-time pull-rightclass="mailbox-read-message"
  var subjectTxt = document.getElementById("subject")
  subjectTxt.innerHTML = localObj.product
  var subjectTxt = document.getElementById("time")
  subjectTxt.innerHTML = localObj.time
  var subjectTxt = document.getElementById("customer_narrative")
  subjectTxt.innerHTML = localObj.consumer_complaint_narrative
}


function postMessage() {
  console.log('inside post message method')
  var http = new XMLHttpRequest();
  var url = 'http://localhost:3002/messges';
  var d = new Date();
  console.log('node elements is ' + d.toLocaleDateString())
  var json = {
    "product": document.getElementById('subject').value,
    "consumer_complaint_narrative": document.getElementById('compose-textarea').value,
    "time": d.toLocaleDateString()
  };
  var element = document.getElementById('subject').value
  console.log('node elements is ' + element)
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/json');
  http.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3002')
  http.setRequestHeader('Access-Control-Allow-Methods', 'POST')
  http.send(JSON.stringify(json));
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      alert(http.responseText);
      if (window.confirm) {
        console.log('window.confirm' + http.statusText)
        document.getElementById('subject').value = ""
        document.getElementById('compose-textarea').value = ""
      }
    } else {
      console.log('error is ' + http.statusText)
    }
  }
}

function getTableRowsCount() {
  var table = document.getElementsByClassName("table table-hover table-striped")
  var rows = table[0].rows;
  var i = rows.length;

  return i
}


// var table = document.getElementsByClassName("table table-hover table-striped");
// var trList = table[0].getElementsByTagName("tr");
// for (var index = 0; index < trList.length; index++) {
//   (function (index) {
//     trList[index].addEventListener("click", function (event) {
//       alert("Row " + (index + 1) + " Clicked");
//     });
//   }(index));
// }