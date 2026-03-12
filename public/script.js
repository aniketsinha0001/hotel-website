
async function bookRoom(){

const data = {
name: document.getElementById("name").value,
phone: document.getElementById("phone").value,
roomType: document.getElementById("roomType").value,
checkin: document.getElementById("checkin").value,
checkout: document.getElementById("checkout").value
};

const res = await fetch('/book',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(data)
});

const result = await res.json();

document.getElementById("status").innerHTML =
result.message + "<br><a href='"+result.whatsapp+"' target='_blank'>Send WhatsApp Confirmation</a>";
}
