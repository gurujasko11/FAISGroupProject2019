
function sendResetLink(isBar,email)
{
    if(isBar == true) isBar = 0; else isBar = 1;
    window.location.href = "/sentReset/"+isBar+"/"+email;
}