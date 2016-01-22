<tpl id="tplSearch">
	<input type="text" id="search-input" placeholder="Search polls">
	<button id="search-btn">Search</button>
	<div id="polls-div"></div>
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
    <div>
    	<button>&gt;</button>
    </div>
</tpl>