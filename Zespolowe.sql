<!DOCTYPE html>
<html>
    <% include head.ejs %>      <!--Include head section (same for all pages)-->
    <!--Javascripts includes-->
    <script src='/javascripts/alert.js' type='text/javascript' ></script>

    <script>
        function validateFormTeam()
        {
            var search_text_team = document.forms["teamForm"]["search_text_team"].value;
            if(search_text_team == "")
            {
                AlertError('Błąd!',"Wpisz nazwę drużyny");
                return false;
            }
            return true;
        }
        function validateFormLeague()
        {
            var search_text_league = document.forms["leagueForm"]["search_text_league"].value;
            if(search_text_league == "")
            {
                AlertError('Błąd!',"Wpisz nazwę rozgrywek");
                return false;
            }
            return true;
        }
        function getMessages()
        {
            var msg = "<%= (!!locals.msg)?msg:'' %>";
            var type = "<%= (!!locals.type)?type:'' %>";
            var flash_messages = document.getElementById('flash_msg');

            showAlert(type, msg);
            if(flash_messages != null) {
                flash_messages = flash_messages.innerHTML.split(',');
                if(flash_messages.length > 1)
                    showAlert(flash_messages[0], flash_messages.slice(1, flash_messages.length).join(', '));
            }
        }
        function showAlert(msg_type, msg)
        {
            if(msg_type == 'ERROR') AlertError("Błąd!", msg);
            else if(msg_type == 'SUCCESS') AlertSuccess("Sukces", msg);
            else if(msg_type == 'INFO') AlertWarning("Informacja", msg);
            else if(msg_type != '') console.log("[FAILED ALERT] " + msg_type + ": " + msg);
        }
    </script>

    <body onLoad='getMessages()'>
        <div id="alerts"></div><br>
        <% if (flash_messages) { %>
            <div id='flash_msg' style="display: none;"><%= flash_messages %></div>
        <% } %>

        <div id="page" class=page>      <!--Div page with id=page - main container-->
            <h1>Wyszukaj mecz!</h1>
            <table align="left">
                <form method="POST" action="/search_match_by_team" onsubmit="return validateFormTeam();" name="teamForm">
                <tr>
                    <td>
                        po nazwie drużyny
                    </td>
                    <td>
                        <input tabindex="100" type="text" name="search_text_team">
                    </td>
                    <td>
                        <input type="submit" tabindex="100" value="Szukaj" if="search_text_team">
                    </td>
                </tr>
                </form>
                <form method="POST" action="/search_match_by_league" onsubmit="return validateFormLeague();"name="leagueForm">
                    <tr>
                        <td>
                            po nazwie rozgrywek
                        </td>
                        <td>
                            <input tabindex="100" type="text" name="search_text_league">
                        </td>
                        <td>
                            <input type="submit" tabindex="100" value="Szukaj" if="search_text_league">
                        </td>
                    </tr>
                </form>
            </table>
        </div>
        <div>
            <h2>Najbliższe mecze</h2>
            <table class="table">
                <th>Gospodarze</th>
                <th>Goście</th>
                <th>Data i godzina meczu</th>
                <%mecze.forEach(function (mecz) { %>
                    <tr>
                        <td><a href="<%= "/about/match/" + mecz.id_meczu %>" class=link ><%=mecz.team1%></a></td>
                        <td><a href="<%= "/about/match/" + mecz.id_meczu %>" class=link ><%=mecz.team2%></a></td>
                        <td><a href="<%= "/about/match/" + mecz.id_meczu %>" class=link ><%=mecz.czas%></a></td>
                    </tr>
                <%})%>
            </table>
        </div>
        <% include header.ejs %>      <!--Include header (top menu logo etc)-->
        <% include footer.ejs %>      <!--Include footer-->
    </body>
</html>
