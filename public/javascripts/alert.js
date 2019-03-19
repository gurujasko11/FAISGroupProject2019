
function Alert(title,text)
{
    document.getElementById("page").innerHTML="<div class=alert><span class=closebtn onclick=\"this.parentElement.style.display='none';\">&times;</span><strong>"+title+" </strong>"+text+"</div>"+document.getElementById("page").innerHTML;
}

function AlertError(title,text)
{
    document.getElementById("page").innerHTML="<div class=alert style=\"background-color: #f44336\"><span class=closebtn onclick=\"this.parentElement.style.display='none';\">&times;</span><strong>"+title+" </strong>"+text+"</div>"+document.getElementById("page").innerHTML;
}
function AlertSuccess(title,text)
{
    document.getElementById("page").innerHTML="<div class=alert style=\"background-color: #4CAF50\"><span class=closebtn onclick=\"this.parentElement.style.display='none';\">&times;</span><strong>"+title+" </strong>"+text+"</div>"+document.getElementById("page").innerHTML;
}
function AlertWarning(title,text)
{
    document.getElementById("page").innerHTML="<div class=alert style=\"background-color: #ffb428\"><span class=closebtn onclick=\"this.parentElement.style.display='none';\">&times;</span><strong>"+title+" </strong>"+text+"</div>"+document.getElementById("page").innerHTML;
}
