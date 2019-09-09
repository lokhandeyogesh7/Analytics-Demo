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
        // }else if (rows[i].id != "templateRow"){
        //   rows[i].style.display = "none"    
        // }
      }
    }
    console.log("json response is ", this.response)
    var data = JSON.parse(this.response);
    console.log("json response is data ", data)
    var maxID = 0;
    if (request.status >= 200 && request.status < 400) {
      for (var i = 0; i < data.length; i++) {
        if (type == "All") {
          addRow(i)
        } else if (data[i].product == type) {
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
  }
  // Send request
  request.send()
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


