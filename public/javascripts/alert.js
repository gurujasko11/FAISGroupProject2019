
function Alert(title,text)
{
    document.getElementById("alerts").innerHTML="<div class=alert><span class=closebtn onclick=\"this.parentElement.style.display='none';\">&times;</span><strong>"+title+" </strong>"+text+"</div>"+document.getElementById("alerts").innerHTML;
}

function AlertError(title,text)
{
    document.getElementById("alerts").innerHTML="<div class=alert style=\"background-color: #f44336\"><span class=closebtn onclick=\"this.parentElement.style.display='none';\">&times;</span><strong>"+title+" </strong>"+text+"</div>"+document.getElementById("alerts").innerHTML;

}
function AlertSuccess(title,text)
{
    document.getElementById("alerts").innerHTML="<div class=alert style=\"background-color: #4CAF50\"><span class=closebtn onclick=\"this.parentElement.style.display='none';\">&times;</span><strong>"+title+" </strong>"+text+"</div>"+document.getElementById("alerts").innerHTML;
}
function AlertWarning(title,text)
{
    document.getElementById("alerts").innerHTML="<div class=alert style=\"background-color: #ffb428\"><span class=closebtn onclick=\"this.parentElement.style.display='none';\">&times;</span><strong>"+title+" </strong>"+text+"</div>"+document.getElementById("alerts").innerHTML;
}
