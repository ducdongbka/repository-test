/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////// var apiKey = "AIzaSyDppf9BzCqWQ3EZgTdfIJSedczjeXl9FXs";                                                                      //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var apiKey = "AIzaSyDppf9BzCqWQ3EZgTdfIJSedczjeXl9FXs";
//var channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw";
var maxResults = 20;
var url = "";
var arrPlayed = [];
function itemPLAYED(thumbnails, title, description, videoId){
	this.thumbnails = thumbnails;
	this.title = title;
	this.description = description;
  this.videoId = videoId;
}
//var url ="https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&channelId=" + channelId + "&part=snippet,id&order=date&maxResults=" + maxResults;
function getData(v_channelId){
	changeBG();
  if (v_channelId == null) {
    v_channelId = "UC_x5XG1OV2P6uZZ5FSM9Ttw"; // Google Developers
  };
  url ="https://www.googleapis.com/youtube/v3/search?key=" + apiKey + "&channelId=" + v_channelId + "&part=snippet,id&order=date&maxResults=" + maxResults;
    $.get( url, function(data, status){
        var html = "";
        html += "<input type=\"text\" id=\"myInput\" onkeyup=\"search();\" placeholder=\"Tìm theo tiêu đề và mô tả video (lọc kết quả hiển thị)...\" title=\"Lọc kết quả hiển thị\">";
        html += "<table id=\"myTable\" class=\"myTable\">";
        html += "<tbody>";
        for (var i = 0; i < data.items.length; i++) { //html += "";
        html += "<tr onclick='playVideo("+i+");' id='trP"+i+"'>";
        html += "<td><img src=\"" + data.items[i].snippet.thumbnails.default.url + "\" width=\"120\" height=\"90\"></td>"; //Ảnh nhỏ
        html += "<td><h6>" + data.items[i].snippet.title.slice(0,50) + "</h6>";//Tiêu đề...
        html += "<em>" + data.items[i].snippet.description.slice(0,60) + "</em></td>";//mô tả ...
        html += "</tr>";                
        }// end for
        html += "</tbody>";
        html += "</table>";
        document.getElementById("showList").innerHTML = html;
	}); // end $.get
}// end of getData()
// search()
function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
// playVideo()
function playVideo(j){
  ///////////////// MODAL
  // Get the modal
  var modal = document.getElementById('myVideoPlayerModal');
  modal.style.display = "block";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          document.getElementById("videoPlayer").innerHTML = '';
      }
  }
  /////// END MODAL
    $.get( url, function(data, status){
    var v_thumbnails = data.items[j].snippet.thumbnails.default.url;
    var v_title = data.items[j].snippet.title;
    var v_description = data.items[j].snippet.description;
    var v_videoId = data.items[j].id.videoId;

    var html = "<iframe width=\"660\" height=\"370\" src=\"https://www.youtube.com/embed/"+ v_videoId +"?rel=0&autoplay=1&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>";
    // PLAY VIDEO
	changeBG();
    document.getElementById("videoPlayer").innerHTML = html;
    // clear
    for (var index = 0; index < data.items.length; index++) {
        document.getElementById("trP"+index).style = "";        
    }
    // mark
    document.getElementById("trP"+j).style = "background-color:rgba(0,0,0,.08);box-shadow: 10px 10px 15px rgba(0,0,0,.06);";
    // push
    var found = 0;
    for (var index = 0; index < arrPlayed.length; index++) {
        if (v_videoId == arrPlayed[index].videoId) {
            found = 1;
        }
    }
    if (found != 1) {
        // session 9
        var itemP = new itemPLAYED(v_thumbnails, v_title, v_description, v_videoId);
        arrPlayed.push(itemP);
        //push
        document.getElementById("badgePlayed").innerHTML = '<span class="mdl-badge" data-badge="'+arrPlayed.length+'">Video Đã Xem</span>';
    }
    });//end get
}//end function
// myData(); // tùy chọn xem
function myData(){
var v_channelId = "";
do {
  v_channelId = prompt("Nhập vào ID kênh muốn lấy dữ liệu (không để trống!!)", "UCJtEP0GoT7Xndn3LZKrgVxA");
} while (v_channelId.trim() == "");
var v_maxResults = 0;
do {
  v_maxResults = prompt("Nhập vào Số video hiển thị (không để trống!!)", 20);
} while (v_maxResults == 0);
if ((v_channelId == null)||(v_maxResults == null)) {
  return; // Fix lỗi nếu cancel
}
maxResults = v_maxResults;
getData(v_channelId);
};//end function
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////// PREMIUM :D _ĐÃ XEM //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
function _getData(){
  var html = "";
  if (arrPlayed.length == 0) {
        html = "<h5>Bạn vẫn chưa xem video nào!</h5>Hãy xem video trước tiên :)";
    }else{        
        html += "<input type=\"text\" id=\"myInput\" onkeyup=\"search();\" placeholder=\"Tìm theo tiêu đề và mô tả video (lọc kết quả hiển thị)...\" title=\"Lọc kết quả hiển thị\">";
        html += "<table id=\"myTable\" class=\"myTable\">";
        html += "<tbody>";
        for (var i = 0; i < arrPlayed.length; i++) { //html += "";
        html += "<tr onclick='_playVideo("+i+");' id='trP"+i+"'>";
        html += "<td><img src=\"" + arrPlayed[i].thumbnails + "\" width=\"120\" height=\"90\"></td>"; //Ảnh nhỏ
        html += "<td><h6>" + arrPlayed[i].title.slice(0,50) + "</h6>";//Tiêu đề...
        html += "<em>" + arrPlayed[i].description.slice(0,60) + "</em></td>";//mô tả ...
        html += "</tr>";                
        }// end for
        html += "</tbody>";
        html += "</table>";
        //alert(item.length);
    }//end if else
        document.getElementById("showList").innerHTML = html;
}// end of _getData()
// _playVideo()
function _playVideo(j){
  ///////////////// MODAL
  // Get the modal
  var modal = document.getElementById('myVideoPlayerModal');
  modal.style.display = "block";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          document.getElementById("videoPlayer").innerHTML = '';
      }
  }
  /////// END MODAL
    
    var v_thumbnails = arrPlayed[j].thumbnails;
    var v_title = arrPlayed[j].title;
    var v_description = arrPlayed[j].description;
    var v_videoId = arrPlayed[j].videoId;

    var html = "<iframe width=\"660\" height=\"370\" src=\"https://www.youtube.com/embed/"+ v_videoId +"?rel=0&autoplay=1&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>";
    
	changeBG();
	document.getElementById("videoPlayer").innerHTML = html;
    for (var index = 0; index < arrPlayed.length; index++) {
        document.getElementById("trP"+index).style = "";        
    }
    document.getElementById("trP"+j).style = "background-color:rgba(0,0,0,.08);box-shadow: 10px 10px 15px rgba(0,0,0,.06);";
}//end function
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////  Lấy Video về //////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
var page; // default = 1
var limit; // default = 10
var urlAssignment = "http://youtube-video-api-1608.appspot.com/youtube/api";

function next(){	
	page+=1;
	loadVideo();
}

function previous(){	
	if(page > 1){
		page -= 1;	
		loadVideo();	
	}
}

function deleteVideo(videoId){
  var configDelete = confirm("Bạn có chắc chắn muốn xóa?");
  //do {
  //  configDelete = prompt("Bạn có chắc chắn muốn xóa? (Hãy nhập vào y/n)", "n");
  //} while ("yYnN".indexOf(configDelete) < 0);
  // có hàm confirm sẵn
  
  //if ((configDelete == 'y')||(configDelete == 'Y')) {
    if (configDelete) {
    $.ajax({
            url: urlAssignment + '?id='+ videoId,	    
            type: 'DELETE',
            success: function(data, status) { 		    		    	
              alert('Đã xóa thành công!');
              getVideo();
          },
            error: function() { 
              alert('Lỗi không thể xóa dữ liệu! (tên video hoặc thông tin xóa chứa ký tự đặc biệt...)');
          }
        });
  } // end IF
}


function loadVideo(){
	$.ajax(
	{
	    url: urlAssignment + '?page=' + page + '&limit=' + limit,	    
	    type: 'GET',
	    success: function(data, status) { 		    		    	
	    	//var appendHTML = '';
	    	//for (var i = 0; i < data.length; i++) {	    			
	    	// 		appendHTML += '<p>' + data[i].name + ' (<a href="#">Delete </a>)</p>';
	    	// 		appendHTML += '<img style="width:200px" src="https://i.ytimg.com/vi/' + data[i].videoId + '/hqdefault.jpg" />';
        ////////////////////
        var html = "";
        html += "<input type=\"text\" id=\"myInput\" onkeyup=\"search();\" placeholder=\"Tìm theo tiêu đề và mô tả video (lọc kết quả hiển thị)...\" title=\"Lọc kết quả hiển thị\">";
        html += "<table id=\"myTable\" class=\"myTable\">";
        html += "<tbody>";
        for (var i = 0; i < data.length; i++) { //html += "";
        ////////////////// var
        var v_thumbnails = "https://i.ytimg.com/vi/" + data[i].videoId + "/hqdefault.jpg";
        var v_title = data[i].name;
        var v_description = data[i].videoId + "<br>" + data[i].description.slice(0,40) + "<br>" + data[i].authorName.slice(0,30) + "<br>" + data[i].authorEmail;
        var v_videoId = data[i].videoId;
        /////////////////
        html += "<tr id='trP"+i+"'>";
        html += "<td title=\"Play this Video!\" onclick='playAssignment(\""+v_thumbnails+"\", \""+v_title+"\", \""+v_description+"\", \""+v_videoId+"\", "+i+");'><img src=\"" + v_thumbnails + "\" width=\"120\"></td>"; //Ảnh nhỏ
        html += "<td title=\"Play this Video!\" onclick='playAssignment(\""+v_thumbnails+"\", \""+v_title+"\", \""+v_description+"\", \""+v_videoId+"\", "+i+");'><h6>" + v_title.slice(0,30) + "</h6>";//Tiêu đề...
        html += "<em>" + v_description.slice(0,60) + "</em></td>";//mô tả ...
        html += "<td><i onclick=\"deleteVideo('"+v_videoId+"')\" title=\"Delete this Video!\" class=\"material-icons\">&#xE92B;</i><br>";
        html += "<i onclick=\"editVideo('"+v_title+"','"+v_description+"','"+v_videoId+"')\" class=\"material-icons\">&#xE254;</i>";
        html += "</td>";
        html += "</tr>";
        }// end for
        html += "      <span class=\"btn-control btn-previous\" id=\"btn-previous\" onclick=\"previous()\">Previous</span>";
        html += "      <span class=\"btn-control btn-next\" onclick=\"next();\">Next</span>";
        document.getElementById("showList").innerHTML = html;
        // Fix function next()
        if(page == 1){
                        $('.btn-previous').css("visibility","visible");	
                      }
        // Fix function previous()
        if(page == 1){
                        $('.btn-previous').css("visibility","hidden");
                      }
        // Fix limit next
        if (data.length < limit) {
          $('.btn-next').css("visibility","hidden");
        }else{
          $('.btn-next').css("visibility","visible");
        }
	    	}, //end success
        error: function() { 
          alert('Lỗi không thể đọc dữ liệu!'); 	
        }
	}); // end ajax
}// end funciton

function getVideo() {
  page = 1; // set value
  limit = 6; // set value
  loadVideo();
}

function playAssignment(v_thumbnails, v_title, v_description, v_videoId, j) { // play for assignment videos
  ///////////////// MODAL
  // Get the modal
  var modal = document.getElementById('myVideoPlayerModal');
  modal.style.display = "block";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
          document.getElementById("videoPlayer").innerHTML = '';
      }
  }
  /////// END MODAL
//alert("Playing "+id);
    var html = "<iframe width=\"660\" height=\"370\" src=\"https://www.youtube.com/embed/"+ v_videoId +"?rel=0&autoplay=1&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>";
    document.getElementById("videoPlayer").innerHTML = html;
    for (var index = 0; index < limit; index++) {
        if (document.getElementById("trP"+index) != null) {
            document.getElementById("trP"+index).style = "";
        }       
    }
    document.getElementById("trP"+j).style = "background-color:rgba(0,0,0,.08);box-shadow: 10px 10px 15px rgba(0,0,0,.06);";
    var found = 0;
    for (var index = 0; index < arrPlayed.length; index++) {
        if (v_videoId == arrPlayed[index].videoId) {
            found = 1;
        }
    }
    if (found != 1) {
        // session 9
        var itemP = new itemPLAYED(v_thumbnails, v_title, v_description, v_videoId);
        arrPlayed.push(itemP);
        //push
        document.getElementById("badgePlayed").innerHTML = '<span class="mdl-badge" data-badge="'+arrPlayed.length+'">Video Đã Xem</span>';
    }
}
//////////////////// funciton PUT video
function putVideo() {
  var youtubeVideo = {
		"videoId": $("#youtubeId").val(), 
	    "name": $("#name").val(),
	    "description": $("#description").val(),
	    "keywords": $("#keyword").val(),
	    //"category": $("#cataloge").val(),
	    //"genre": $("#genre").val(),
	    "authorName": $("#authorName").val(),
	    "authorEmail": $("#email").val(),
	    "birthday": $("#birthday").val(),
	    };
        var url = "http://youtube-video-api-1608.appspot.com/youtube/api";
        $.ajax({
                url: url,
                data: JSON.stringify(youtubeVideo),
                type: 'PUT',	    	   
                success: function(data, status) { 
                    alert("Success, " + data.name); 
                    //refresh();
                    document.getElementById('myModal').style.display = "none";
                    getVideo();
                },
                error: function() { 
                    alert('Failed!'); 	
                }
            });  
}
//////////////////// END funciton PUT video

function editVideo(v_title, v_description, v_videoId) {
  //// BEGIN VAR FOR PUT ///

  //var put_name = "";
  //var put_videoId = "";
  //var put_description = "";
  //var put_keywords = "";
  //var put_authorName = "";
  //var put_authorEmail = "";
  //var put_birthday = "";

  //// END VAR FOR PUT ///
  
  //alert("Chúng ta sẽ chỉnh sửa video: "+v_title);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  /////////////// MODAL
  // Get the modal
  var modal = document.getElementById('myModal');
  modal.style.display = "block";

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
  /////// END MODAL
  ///////////////////////////////////////// Begin GET videoId
  $.ajax(
	{
	    url: urlAssignment + '?id=' + v_videoId,	    
	    type: 'GET',
	    success: function(data, status) { 		    		    	
	    	//    success
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  //put_name = data.name;
  //put_videoId = data.videoId;
  //put_description = data.description;
  //put_keywords = data.keywords;
  //put_authorName = data.authorName;
  //put_authorEmail = data.authorEmail;
  //put_birthday = data.birthday;
  ////////////////
  var html = '';
  html += '<h5 style="text-align:center;padding:5px 10px;">Bạn đang sửa video: <em>"' + data.name + '"</em></h5>'; //html += '';
  html += '<form onclick="check();" onchange="check();" style="margin: 15px 15px;">';
	html += '                    <h5>Thông tin Video</h5><hr style="box-shadow:0px 3px 15px #ddd;">';
	html += '                    <table>';
	html += '                        <tr>';
	html += '                            <td></td>';
	html += '                            <td><input type="text" id="youtubeId" value="'+ data.videoId +'" class="mdl-textfield__input" placeholder="Youtube ID"><span id="youtubeIdValidate" style="color: red;visibility: hidden;">ID video: min = 6; max = 20</span></td>';                        
	html += '                        </tr>';
	html += '                        <tr>';
	html += '                            <td></td>';
	html += '                            <td><input type="text" id="name" value="'+ data.name +'" class="mdl-textfield__input" placeholder="Tên Video"><span id="nameValidate" style="color: red;visibility: hidden;">Tên video: min = 10; max = 60</span></td>';
	html += '                        </tr>';
	html += '                        <tr>';
	html += '                            <td></td>';
	html += '                            <td><textarea rows="5" cols="80" id="description" class="mdl-textfield__input" placeholder="Mô tả">'+ data.description +'</textarea><span id="descriptionValidate" style="color: red;visibility: hidden;">Mô tả: min = 20; max = 150</span></td>';
	html += '                        </tr>';
	html += '                        <tr>';
	html += '                            <td></td>';
	html += '                            <td><input type="text" id="keyword" value="'+ data.keywords +'" class="mdl-textfield__input" placeholder="Từ khóa video (không để trống)"><span id="keywordValidate" style="color: red;visibility: hidden;">Không để trống ...</span></td>';
	html += '                        </tr>';
	html += '                    </table>';
	html += '                    <h5>Thông tin tác giả</h5><hr style="box-shadow:0px 3px 15px #ddd;">';
	html += '                    <table>';
	html += '                        <tr>';
	html += '                            <td></td>';
	html += '                            <td><input type="text" id="authorName" value="'+ data.authorName +'" class="mdl-textfield__input" placeholder="Tên tác giả (không để trống)" size="80"><span id="authorNameValidate" style="color: red;visibility: hidden;">Không để trống...</span></td>';
	html += '                        </tr>';
	html += '                        <tr>';
	html += '                            <td></td>';
	html += '                            <td><input type="text" name="" id="email" value="'+ data.authorEmail +'" class="mdl-textfield__input" placeholder="Email (định dạng abc@xyz.com)" size="80"><span id="emailValidate" style="color: red;visibility: hidden;">Định dạng: abc@xyz.com</span></td>';
	html += '                        </tr>';
	html += '                        <tr>';
	html += '                            <td></td>';
	html += '                            <td><input type="text" name="" id="birthday" value="'+ data.birthday +'" class="mdl-textfield__input" placeholder="Ngày sinh (định dạng dd/mm/yyyy)" size="80"><span id="birthdayValidate" style="color: red;visibility: hidden;"s>Định dạng: dd/mm/yyyy</span></td>';
	html += '                        </tr>';
	html += '                    </table>';
	html += '                <div id="button" style="text-align: center;margin-top: 10px">';
	html += '                    <input type="button" value="Sửa Video" onclick="putVideo();" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">';
	html += '                    <input type="reset" value="Làm lại" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">';
	html += '                </div>';
	html += '            </form>';
  document.getElementById("myEditContent").innerHTML = html;

  },
	    error: function() { 
	    	alert('Lỗi không thể lấy dữ liệu! (Tên video hoặc các trường khác chứa ký tự đặc biệt...)'); 	
		}
	});
///////////////////////////////////////// GET videoId
} // end function
/////////////////////////////////////////////////////////////////////////////////////