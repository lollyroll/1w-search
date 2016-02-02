<tpl id="tplSearch">
    <div class="container">
        <div class="owo-logo"></div>

        <form class="wrapper" action="javascript:void(0);">
            
            <div class="inline-block-tmp" value="Test">
                <select id="select-language" class="textfield" >
                    
                </select>
            </div>

            <input class="textfield" type="text" id="search-input" placeholder="Search polls">
            <input class="js-search btn-lightblue" type="submit" value="Search"/>
        </form>
        <div id="polls-list">&nbsp;</div>
    </div>
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