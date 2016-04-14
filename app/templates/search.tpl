<tpl id="tplSearch">
    <div class="top">
        <a class="btn-lightblue" href="https://1worldonline.com/#!/become-partner" target="_blank">Sign up</a>
    </div>
    <div class="container">
        <a href="https://1worldonline.com/" target="_blank"><div class="owo-logo"></div></a>
        <form class="wrapper" action="javascript:void(0);">
            <div class="inline-block-tmp">
                <select id="select-language" class="textfield">&nbsp;</select>
            </div>
            <input id="search-input" class="textfield" type="text" placeholder="Search polls">
            <input class="js-search btn-lightblue" type="submit" value="Search"/>
        </form>
        <div id="polls-list" class="polls-list">&nbsp;</div>
    </div>
</tpl>

<tpl id="tplImageCell">
    <a href="https://1worldonline.com/#!/<%= cellModel.get('locale') %>/poll/<%= cellModel.get('id') %>" target="_blank">
        <div class="mymargin">
            <% if (cellModel.get('image') && cellModel.get('image').url) { %>
                <img src="<%= cellModel.get('image').url + '-48x48' %>" width="50" height="50">
            <% } else { %>
                <img src="dist/img/background-gray-6x6" width="50" height="50">
            <% } %>
        </div>
    </a>
</tpl>

<tpl id="tplTaglineCell">
    <a href="https://1worldonline.com/#!/<%= cellModel.get('locale') %>/poll/<%= cellModel.get('id') %>" target="_blank"><div class="tagline"><%= cellModel.get('tagline') %></div></a>
</tpl>

<tpl id="tplEngagementCell">
    <div class="ico-views"><%= cellModel.get('totalViewsFormatted') %></div>
	<div class="ico-votes"><%= cellModel.get('totalVotesFormatted') %></div>
</tpl>

<tpl id="tplSourceCell">
    <div class="poll-author-avatar">
        <% if (cellModel.get('adminObject') && cellModel.get('adminObject').thumbnailUrl) { %>
            <img src="<%= cellModel.get('adminObject').thumbnailUrl + '-48x48' %>">
        <% } else if (cellModel.get('partner') && cellModel.get('partner').widgetIcon && cellModel.get('partner').widgetIcon.url) { %>
            <img src="<%= cellModel.get('partner').widgetIcon.url %>">
        <% } else { %>
            <img src="dist/img/default-avatar-light-120x120.png">
        <% } %>
    </div>
    <h5 class="asked-by">
            Asked by:
            <br>
            <%= cellModel.get('partner') ? cellModel.get('partner').name : cellModel.get('adminObject').fullName %>
    </h5>
</tpl>

<tpl id="tplButtonCell">
    <div class="showPopup"></div>
</tpl>

<tpl id="tplPopupDiv">
    <div class="popupDiv">
      <a target="_blank" href="#eye"><div class="view-page"></div></a>
      <div class="poll-author-avatar">
          <% if (cellModel.get('adminObject') && cellModel.get('adminObject').thumbnailUrl) { %>
              <img src="<%= cellModel.get('adminObject').thumbnailUrl + '-48x48' %>">
          <% } else if (cellModel.get('partner') && cellModel.get('partner').widgetIcon && cellModel.get('partner').widgetIcon.url) { %>
              <img src="<%= cellModel.get('partner').widgetIcon.url %>">
          <% } else { %>
              <img src="dist/img/default-avatar-light-120x120.png">
          <% } %>
      </div>
        <h5 class="asked-by">
            Asked by:
            <%= cellModel.get('partner') ? cellModel.get('partner').name : cellModel.get('adminObject').fullName %>
        </h5>
        <div class="info-string">
            <% if(cellModel.get('status') === "closed") { %>
                <span class="item status"><%= cellModel.get('status') %></span>
            <% } %>
            <span class="item"><%= cellModel.get('categoryName') %></span>
            <span class="item floating"><%= cellModel.get('newTime') %></span>
        </div>
        <ol class="answers">
            <% _.each(cellModel.get('sides'), function(sides) { %>
                <li>
                    <%= sides.answer %>
                </li>
            <% }); %>
        </ol>
        <div class="source">
            Primary source of collected votes:
            <span class="source-name">Temp name</span>
        </div>
    </div>
</tpl>
