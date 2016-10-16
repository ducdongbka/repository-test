function home() {
    //alert("home");
    var home = "main.html";
    window.location.href = home;
}
function music() {
    //alert("home");
    var home = "music.html";
    window.location.href = home;
}
function video() {
    //alert("home");
    var home = "video.html";
    window.location.href = home;
}
function about() {
    //alert("about");
    var about = ""; // about += "";
    about += "<h1>Welcome...</h1>";
    about += "<p>Lời đầu tiên, chúng tôi muốn gửi đến quý đọc giả lời chào trân trọng, lời chúc sức khỏe và thành đạt!</p>";
    about += "<p>Cám ơn quý độc giả đã quan tâm và ghé thăm website thường xuyên trong suốt mấy trăm năm qua…</p>";
    about += "<h2>\"Nhặt Trình Viên\"</h2>";
    about += "<p>Hồ Đức Đông / D00342 / C1608L</p>";
    about += "<p>donghdd00342@fpt.edu.vn / 0979.586.328</p>";
    about += "<h2>\"FBI\" Warning...</h2>";
    about += "<p>Website được bảo kê bởi Google Chrome và Microsoft Windows! tuy nhiên nó cũng có thể hiển thị & hoạt động tốt trên hầu hết các trình duyệt hiện đại!</p>";
    about += "<p>Và trang web này chủ yếu phục vụ những quý cô có HTML5 trở lên. Thanh niên hoặc trẻ em như IE thì hãy \"lựa cơm (version) mà gắp mắm\"</p>";
    document.getElementById("main").innerHTML = about;
}