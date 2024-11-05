var theme_anime = [];
if (localStorage.getItem("theme_anime")) { theme_anime = JSON.parse(localStorage.getItem("theme_anime")); }
if (theme_anime.length > 0) {
    if (theme_anime[0] == 0) {
        /* 网易云音乐 */
        if ((typeof jQuery != 'undefined')) { $(".aplayer").remove(); }
    }
    if (theme_anime[1] == 0) {
        /* 背景彩带 */
        if ((typeof jQuery != 'undefined')) { $("canvas[id!='live2dcanvas']").remove(); }
        else {
            var canvas_box = document.getElementsByTagName("canvas");
            for (var j = 0; j < canvas_box.length; j++) {
                if (canvas_box[j].getAttribute("id") != 'live2dcanvas') { canvas_box[j].parentNode.removeChild(canvas_box[j]); }
            }
        }
    }
    if (theme_anime[2] == 1) {
        /* 看板娘 */ L2Dwidget.init({ "pluginRootPath": "live2d_models/", "pluginJsPath": "lib/", "pluginModelPath": "assets/", "tagMode": false, "debug": false, "model": { "jsonPath": "/live2d_models/assets/wanko.model.json" }, "display": { "position": "left", "width": 100, "height": 150, "hOffset": -10, "vOffset": 40 }, "mobile": { "show": true }, "react": { "opacity": 0.7 }, "log": false });
    }
}
else {
    /* 看板娘 */ L2Dwidget.init({ "pluginRootPath": "live2d_models/", "pluginJsPath": "lib/", "pluginModelPath": "assets/", "tagMode": false, "debug": false, "model": { "jsonPath": "/live2d_models/assets/wanko.model.json" }, "display": { "position": "left", "width": 100, "height": 150, "hOffset": -10, "vOffset": 40 }, "mobile": { "show": true }, "react": { "opacity": 0.7 }, "log": false });
}

var webinfo = {
    archives: 2,
    tags: 2, categories: 1,
    category_arry: [{ name: "Web", number: 2}],
    tag_arry: ["github", "hexo"]
}
webinfo.tags = webinfo.tag_arry.length;
webinfo.categories = webinfo.category_arry.length;
/* 加载标签和分类 */
$(function () {
    $("a[href^='/archives'] .length-num").text(webinfo.archives);
    $("a[href^='/tags'] .length-num").text(webinfo.tags);
    $("a[href^='/categories'] .length-num").text(webinfo.categories);

    var category_html = "", tag_html = "";
    for (let i = 0; i < webinfo.category_arry.length; i++) {
        if ($("#aside-cat-list a[href='/categories/"+ webinfo.category_arry[i].name +"/']").length == 0) {
        category_html += '<li class="card-category-list-item"><a class="card-category-list-link" href="/categories/'+ webinfo.category_arry[i].name + '/" data-pjax-state="">' +
                         '<span class="card-category-list-name">'+ webinfo.category_arry[i].name +'</span><span class="card-category-list-count">'+ webinfo.category_arry[i].number +'</span></a></li>';
        } else { $("#aside-cat-list a[href='/categories/"+ webinfo.category_arry[i].name +"/'] .card-category-list-count").text(webinfo.category_arry[i].number); }
    }
    $("#aside-cat-list").append(category_html);
    for (let j = 0; j < webinfo.tag_arry.length; j++) {
        if ($(".card-tag-cloud a[href='/tags/"+ webinfo.tag_arry[j] +"/']").length == 0)
        tag_html += '<a href="/tags/'+ webinfo.tag_arry[j] +'/" style="font-size: 1.1em; color: #999" data-pjax-state="">'+ webinfo.tag_arry[j] +'</a>';
    }
    $(".card-tag-cloud").append(tag_html);

    if($("#site-title").text() == "分类") {
        $("#page .category-amount").text(webinfo.categories);
        var cat_li_html = "";
        for (let c = 0; c < webinfo.category_arry.length; c++) {
            if ($("#page .category-list a[href='/categories/"+ webinfo.category_arry[c].name +"/']").length == 0) {
            cat_li_html += '<li class="category-list-item"><a class="category-list-link" href="/categories/'+ webinfo.category_arry[c].name + '/" data-pjax-state="">' + webinfo.category_arry[c].name +
                           '</a><span class="category-list-count">'+ webinfo.category_arry[c].number +'</span></li>';
            } else { $("#page .category-list a[href='/categories/"+ webinfo.category_arry[c].name +"/']").next().text(webinfo.category_arry[c].number); }
        }
        $("#page .category-list").append(cat_li_html);
    }
    else if($("#site-title").text() == "标签") {
        $("#page .tag-cloud-amount").text(webinfo.tags);
        const tag_color_arry = ["#1f4e28","#1d406b","#3498DB","#32B16C","#D55B38","#7e58c5","#DB4B64","#F09199","#333","#808080","#32a3b1","#FF943A","#B27443","#ad34db","#99dd45","#e01930","#6b1d26","#4934db"];
        var tag_a_html = "", tag_a_color = "";
        for (let t = 0; t < webinfo.tag_arry.length; t++) {
            tag_a_color = tag_color_arry[((t + 1) >= tag_color_arry.length ? 0 : t)];
            if ($("#page .tag-cloud-list.is-center a[href='/tags/"+ webinfo.tag_arry[t] +"/']").length == 0) {
                tag_a_html += '<a href="/tags/'+ webinfo.tag_arry[t] +'/" style="font-size:1.2em;color:'+ tag_a_color +'">'+ webinfo.tag_arry[t] +'</a>';
            }
        }
        $("#page .tag-cloud-list.is-center").append(tag_a_html);
    }
    $("#footer-wrap .copyright").text("© 2021-2024 By mokingbril");
    setTimeout(function () {$(".v[data-class='v'] .vempty").hide();}, 5000);
});

/* 切换音乐频道 */
function switchMusic(playlistid, play_type, play_server) {
    try { window.aplayers[0].destroy(); } catch (e){ }
    if (!playlistid && !play_type && !play_server) { playlistid = "3082704644"; }
    $(".aplayer").attr("class","aplayer no-destroy").attr("data-id", playlistid);
    /* 频道类型：playlist歌单，song单曲，album专辑，search关键词，artist歌手 */
    if (play_type) { $(".aplayer").attr("data-type", play_type); }
    /* 音乐平台：netease网易，tencent腾讯，kugou酷狗，xiami虾米，baidu百度 */
    if (play_server) { $(".aplayer").attr("data-server", play_server); }
    aplayers = [];  loadMeting();
}
