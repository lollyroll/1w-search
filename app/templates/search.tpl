<tpl id="tplSearch">
    <h1>1WORLD SEARCH</h1>

    <form action="javascript:void(0);">
        <input type="text" id="search-input" placeholder="Search polls">
        <input class="js-search" type="submit" value="Search"/>
    </form>
	<div id="polls-list">&nbsp;</div>
</tpl>

<tpl id="tplImageCell">
    <div class="mymargin"><img src="<%= cellModel.get('image') ? cellModel.get('image').url : "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png" %>" width="50" height="50"></div>
</tpl>

<tpl id="tplTaglineCell">
    <%= cellModel.get('tagline') %>
</tpl>

<tpl id="tplEngagementCell">
    <img src="https://web-1worldonline-biz.s3.amazonaws.com/external/qa/1.37.2-SNAPSHOT/img/common-web/views.svg"><%= cellModel.get('totalViews') %><br>
	<img src="https://web-1worldonline-biz.s3.amazonaws.com/external/qa/1.37.2-SNAPSHOT/img/common-web/checked.svg"><%= cellModel.get('totalVotes') %>
</tpl>

<tpl id="tplButtonCell">
    <button class="showPopup">&gt;</button>
</tpl>

<tpl id="tplPopupDiv">
    <div class="popupDiv">
        <h5><%= cellModel.get('partner') ? cellModel.get('partner').name : cellModel.get('adminObject').fullName %></h5>
        <%= cellModel.get('categoryName') %>
        <span class="floating"><%= cellModel.get('newTime') %><br><br></span>
        <% _.each(cellModel.get('sides'), function(sides) { %>
        <label>
            <%= sides.answer %>
        <label><br>
        <% }); %>
    </div>
</tpl>