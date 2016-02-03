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
        <div id="polls-list" class="polls-list">&nbsp;</div>
    </div>
</tpl>

<tpl id="tplImageCell">
    <div class="mymargin"><img src="<%= cellModel.get('image') ? cellModel.get('image').url : "http://3.bp.blogspot.com/-JhISDA9aj1Q/UTECr1GzirI/AAAAAAAAC2o/5qmvWZiCMRQ/s1600/Twitter.png" %>" width="50" height="50"></div>
</tpl>

<tpl id="tplTaglineCell">
    <div class="tagline"><%= cellModel.get('tagline') %></div>
</tpl>

<tpl id="tplEngagementCell">
    <div class="ico-views"><%= cellModel.get('totalViews') %></div>
	<div class="ico-votes"><%= cellModel.get('totalVotes') %></div>
</tpl>

<tpl id="tplAnswersCell">
    <ol class="answers">
        <% _.each(cellModel.get('sides'), function(sides) { %>
        <li>
            <%= sides.answer %>
        </li>
        <% }); %>
    </ol>
</tpl>

<tpl id="tplButtonCell">
    <div class="showPopup"></div>
</tpl>

<tpl id="tplPopupDiv">
    <div class="popupDiv">
        <div class="view-page"></div>
        <h5 class="asked-by">Asked by: <div class="link"><%= cellModel.get('partner') ? cellModel.get('partner').name : cellModel.get('adminObject').fullName %></div></h5>
        <div class="info-string"><span class="item status">closed</span><span class="item"><%= cellModel.get('categoryName') %></span><span class="item floating"><%= cellModel.get('newTime') %></span></div>
        <ol class="answers">
        <% _.each(cellModel.get('sides'), function(sides) { %>
        <li>
            <%= sides.answer %>
        </li>
        <% }); %>
        </ol>
        <div class="source">Primary source of collected votes: <span class="source-name">Temp name</span></div>
    </div>
</tpl>