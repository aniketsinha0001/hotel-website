
async function book(){

const data={
name:document.getElementById("name").value,
phone:document.getElementById("phone").value,
room:document.getElementById("room").value,
checkin:document.getElementById("checkin").value,
checkout:document.getElementById("checkout").value,
payment:document.getElementById("payment").value
};

const res=await fetch('/book',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(data)
});

const result=await res.json();

document.getElementById("status").innerHTML =
result.message + "<br><a target='_blank' href='"+result.whatsapp+"'>Send WhatsApp confirmation</a>";
}
