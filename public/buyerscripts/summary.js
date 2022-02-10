function goto(){
    window.location = "/dashboard/dashboard.html"
}


$(document).ready(function(){
    auth.onAuthStateChanged(async user => {
    if(user){
        const mail = user.email
        const id = "m4tDG4jl3qIBS4Q6wxvC" || localStorage.getItem("id")
        const u = await findReqProduct(id)
        console.log(u)
        let date = new Date().toUTCString()
        const v = await findProduct(u.productid)
        const arr = [
            {id:"img1", value: v.url[0]},
            {id:"qty1", value: u.amount},
            {id:"qty2", value: u.amount1},
            {id:"time", value:u.time || "" },
            {id:"date", value: u.date || date },
            {id:"qty11", value:u.amount},
            {id:"qty21", value:u.amount1},
            
        ]
        populate(arr)
    } else {
        const id = localStorage.getItem("id")
        const u = await findReqProduct(id)
        const v = await findProduct(u.productid)
        console.log(u)
        const arr = [
            {id:"img1", value: v.url[0]},
            {id:"qty1", value: u.amount},
            {id:"qty2", value: u.amount1},
            {id:"time", value:u.time || "" },
            {id:"date", value: u.date || date},
            {id:"qty11", value:u.amount},
            {id:"qty21", value:u.amount1},
            // {id:"storage", value:u.specialStorage}
         

        ]
        populate(arr)
    }
})
 
}) 

async function findUser(email){
    return await db.collection('users').where("email", '==', email).get().then(data=>{
        return data.docs[0].data()
    })
}

async function findId(email){
    return await db.collection('users').where("email", '==', email).get().then(data=>{
        return data.docs[0].id
    })
}

async function findProduct(id){
    return await db.collection('products').doc(id).get().then(data=>{
        return data.data()
    })
}

async function findReqProduct(id){
    return await db.collection('requestedProducts').doc(id).get().then(data=>{
        return data.data()
    })
}

function populate(arr){
    return arr.map(element=>{
        if(element.id == 'img1'){
        return document.getElementById(element.id).src = element.value
        }
        else
        return document.getElementById(element.id).innerHTML = element.value
    })
}

function changePw(){
    const pw = document.getElementById('newpassword').value
    return auth.onAuthStateChanged(user =>{
        user.updatePassword(pw).then(function() {
            alert('done')
          }).catch(function(error) {
            alert(error)
          });
    })
}

async function setDetails(){
    const accountnumber = document.getElementById('accountnumber').value
    const bankname = document.getElementById('bankname').value
    await auth.onAuthStateChanged(async user =>{
        const id = await findId(user.email)
        console.log(id)
        await db.collection('users').doc(id).update({bankname: bankname, accountnumber: accountnumber}).then(()=> {
            swal('Your account details has been updated')
            document.getElementById('bankname').value = bankname
            document.getElementById('accountnumber').value = accountnumber
        }).catch(e=> swal(e.message))
    })
    // window.location.reload()
}

async function isLoggedIn(id){
    console.log(id)
    auth.onAuthStateChanged(async user => {
        if(user){
            console.log(user)
            window.location = "/dashboard/request.html"
            
        } else {
            document.getElementById(id).classList.add("modal-trigger")
            document.getElementById(id).href = "#modal1"
        }
    })

    
}
