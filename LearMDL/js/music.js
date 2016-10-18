/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING! List này có thể thay đổi khi mp3.zing update (đoán vậy, chắc là nó cũng ko thay đổi quá thường xuyên :D)                   //
// do vậy website có thể không hoạt động như mong muốn do bị sai dữ liệu nguồn                                                         //
// trong trường hợp đó vui lòng liên hệ: donghdd00342@fpt.edu.vn / 0979.586.328 để mình cập nhật lại đường link (list data). thanks :D //
///////// var listVietNam ="http://mp3.zing.vn/xml/album-xml/kHJHyLmNdcRHczgtZbxyFHkn";                                                //
///////// var listAuMy = "http://mp3.zing.vn/xml/album-xml/kHcHyLnNdJRHJWiTLbxtbHLH";                                                  //
///////// var listChauA = "http://mp3.zing.vn/xml/album-xml/ZmxHTkGadximiGcyLvJtbHZm";                                                 //
///////// var listHoaTau = "http://mp3.zing.vn/xml/album-xml/knxHykmadcuGRklykbcyFGLm";                                                //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var html = "";
var xmlData ="";
var oldIndex = 1;
var chosen = "";
var xmlDoc;
var arrPlayed = [];
// session 9: 
function itemPLAYED(title, performer, source, backimage){
	this.title = title;
	this.performer = performer;
	this.source = source;
    this.backimage = backimage;
}
// search()
function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
//myOption()
function myOption(j) {
    var repeat = document.getElementById("repeat").checked;
    var random = document.getElementById("random").checked;
    var auto = document.getElementById("auto").checked;
	var item = xmlDoc.getElementsByTagName("item");
	if (j > (item.length-1)) {
		return false;
	}
    if (repeat) {
        playMusic(j);
		return;
    }
    if (auto && random) {		
        var x = Math.floor((Math.random() * item.length) + 0); // WARNING
		//alert(x);
        playMusic(x);
		return;
    }
    if(auto){
        if(j == (item.length-1)){
            playMusic(0);
			return;
        }else{
            playMusic(j+1);
			return;
        }
    }
}
// playMusic()
function playMusic(j){
    var mp3p = "";
	document.getElementById("mp3Player").innerHTML = "";
	document.getElementById("mp3Player").innerHTML = "";
    var source = xmlDoc.getElementsByTagName("source");
    var backimage = xmlDoc.getElementsByTagName("backimage");
    // title
    var title = xmlDoc.getElementsByTagName("title");
    var v_title = title[j].childNodes[0].nodeValue;
    // performer (ca sĩ)
    var performer = xmlDoc.getElementsByTagName("performer");
    var v_performer = performer[j].childNodes[0].nodeValue;
    // source
    var v_source = source[j].childNodes[0].nodeValue;
    // backimage
    var v_backimage = backimage[j].childNodes[0].nodeValue;

    mp3p = "<audio controls autoplay onended=\"myOption("+j+");\">";
    mp3p += "<source type=\"audio/mpeg\" src=\""+v_source+"\"></audio>";
    document.getElementById("mp3Player").innerHTML = mp3p;
	// màu mè tí :D
	changeBG();
    document.getElementById("downloadM").innerHTML = "<a href=\""+v_source+"\" download=\""+v_title+"\" style=\"text-decoration: none;\">&nbsp;"+v_title.slice(0,35)+"</a>";
    // Clear
    if (document.getElementById("iconP"+oldIndex) != null) {
        document.getElementById("iconP"+oldIndex).innerHTML = (oldIndex + 1) + ". ";
        document.getElementById("trP"+oldIndex).style = "";        
    }
    //if(backimage[j].childNodes[0].nodeValue.match(/.jpg/g) == null){
    //    document.getElementById("cover").style.backgroundImage = "url('css/cover1.jpg')";
    //}else{
    //    document.getElementById("cover").style.backgroundImage = "url('"+v_backimage+"')";
    //}
    // mark
    if (document.getElementById("iconP"+j) != null) {
        document.getElementById("iconP"+j).innerHTML = "<img src='images/playing.gif'>&nbsp;&nbsp;";
    }
    if (document.getElementById("trP"+j) != null) {
        document.getElementById("trP"+j).style = "background-color:rgba(0,0,0,.06);";
    }    
    // kiểm tra found
    var found = 0;
    for (var index = 0; index < arrPlayed.length; index++) {
        if (v_title.toLowerCase() == arrPlayed[index].title.toLowerCase()) {
            found = 1;
        }
    }
    if (found != 1) {
        // session 9
        var itemP = new itemPLAYED(v_title, v_performer, v_source, v_backimage);
        arrPlayed.push(itemP);
        document.getElementById("badgePlayed").innerHTML = '<span class="mdl-badge" data-badge="'+arrPlayed.length+'">Đã Nghe</span>';
    }
    oldIndex = j;  
}
// showPlayList()
function showPlayList(){
        var item = xmlDoc.getElementsByTagName("item");
        var title = xmlDoc.getElementsByTagName("title");
        var performer = xmlDoc.getElementsByTagName("performer");
        var source = xmlDoc.getElementsByTagName("source");
        var backimage = xmlDoc.getElementsByTagName("backimage");
        html += "<input type=\"text\" id=\"myInput\" onkeyup=\"search();\" placeholder=\"Tìm theo tên bài hát (lọc kết quả hiển thị)...\" title=\"Lọc kết quả hiển thị\">";
        html += "<table id=\"myTable\" class=\"myTable\">";
        html += "<tbody>";
        for (var i = 0; i < item.length; i++) { //html += "";
        html += "<tr onclick='playMusic("+i+");' id='trP"+i+"'>";
        html += "<td><span id='iconP"+i+"'>"+(i+1)+".  </span>";
        html += " <span onclick='playMusic("+i+");'>" + title[i].childNodes[0].nodeValue.slice(0,35) + "</span></td>"; //title
        html += "<td><span onclick='playMusic("+i+");'>" + performer[i].childNodes[0].nodeValue.slice(0,20) + "</span></td>";//performer
        html += "</tr>";                
        }// end for
        html += "</tbody>";
        html += "</table>";
        //alert(item.length);
        document.getElementById("showList").innerHTML = html;
}
// playList(listData)
function playList(listData) {
    // chosen
    if(chosen == listData){
        return false;
    }else{
		chosen = listData;
	}
	xmlData = "http://mp3.zing.vn/xml/album-xml/" + listData;
    html = "";
    
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        letsPlay(this);
    }
};
xhttp.open("GET", xmlData, true);
xhttp.send();
//letsPlay()
function letsPlay(xml) {
    xmlDoc = xml.responseXML;
    showPlayList();
}// end function letsPlay(xml)
}//*end FUNCTION playList(listData)

////////////////////////////////////////////////////////////////////////////////////////
/////////// PREMEUM :D _ĐÃ NGHE ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//_myOption()
function _myOption(j) {
    var repeat = document.getElementById("repeat").checked;
    var random = document.getElementById("random").checked;
    var auto = document.getElementById("auto").checked;
    if (repeat) {
        _playMusic(j);
    }
    if (auto && random) {
        var x = Math.floor((Math.random() * arrPlayed.length) + 0);
        _playMusic(x);
    }
    if(auto){
        if(j == (arrPlayed.length-1)){
            _playMusic(0);
        }else{
            _playMusic(j+1);
        }
    }
}
//_playMusic(j)
function _playMusic(j){
    var mp3p = "";
	document.getElementById("mp3Player").innerHTML = "";
	document.getElementById("mp3Player").innerHTML = "";
    var source = arrPlayed[j].source;
    var backimage = arrPlayed[j].backimage;    

    mp3p = "<audio controls autoplay onended=\"_myOption("+j+");\">";
    mp3p += "<source type=\"audio/mpeg\" src=\""+source+"\"></audio>";
    document.getElementById("mp3Player").innerHTML = mp3p;
	// màu mè tí :D
	changeBG();
    document.getElementById("downloadM").innerHTML = "<a href=\""+source+"\" download=\""+arrPlayed[j].title+"\" style=\"text-decoration: none;\">&nbsp;"+arrPlayed[j].title.slice(0,35)+"</a>";
    // Clear
    for (var index = 0; index < arrPlayed.length; index++) {
        document.getElementById("iconP"+index).innerHTML = (index + 1) + ". ";
        document.getElementById("trP"+index).style = "";        
    }
    //if(backimage.match(/.jpg/g) == null){
    //    document.getElementById("cover").style.backgroundImage = "url('css/cover1.jpg')";
    //}else{
    //    document.getElementById("cover").style.backgroundImage = "url('"+backimage+"')";
    //}
    if (document.getElementById("iconP"+j) != null) {
        document.getElementById("iconP"+j).innerHTML = "<img src='images/playing.gif'>&nbsp;&nbsp;";
    }
    if (document.getElementById("trP"+j) != null) {
        document.getElementById("trP"+j).style = "background-color:rgba(0,0,0,.06);";
    }    
} // End _playMusic
// function _playList()
function _playList(){
    chosen = "danghe";
    var html = "";
    if (arrPlayed.length == 0) {
        html = "<h5>Bạn vẫn chưa nghe bài nào! Hãy nghe nhạc trước tiên :)</h5>";
    }else{
            html += "<input type=\"text\" id=\"myInput\" onkeyup=\"search();\" placeholder=\"Tìm theo tên bài hát (lọc kết quả hiển thị)...\" title=\"Lọc kết quả hiển thị\">";
            html += "<table id=\"myTable\" class=\"myTable\">";
            html += "<tbody>";
            for (var index = 0; index < arrPlayed.length; index++) {
            // Hiển thị những bài đã nghe
            var itemP = arrPlayed[index];
            html += "<tr onclick='_playMusic("+index+");' id='trP"+index+"'>";
            html += "<td><span id='iconP"+index+"'>"+(index+1)+".  </span>";
            html += " <span onclick='_playMusic("+index+");'>" + itemP.title + "</span></td>"; //title
            html += "<td><span onclick='_playMusic("+index+");'>" + itemP.performer + "</span></td>";//performer
            html += "</tr>";    
            }
            html += "</tbody>";
            html += "</table>";
    }
    document.getElementById("showList").innerHTML = html;
}