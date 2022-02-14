var available
var sendingBy
function useAvailability(type){
    available = type
    return type
}

function sender(type){
    sendingBy = type
    return type
}

async function storeDocs(){
    let id = localStorage.getItem("quotedproductid")
    console.log(1)
    const amount = document.getElementById('amount').value
    const availabilityType = available
    const date = new Date().toDateString()
    const bags = document.getElementById("amount2").value

    auth.onAuthStateChanged(async user => {
        try {
            if(user){
                let owner = user.email
                const newDoc = await db.collection('requestedProducts').doc(id).update({
                    amount: amount,
                    availability: availabilityType, 
                    datequotewassorted: date,
                    bags: bags
                })
             
                   alert("Product Details saved")
                //    localStorage.setItem("id", newDoc.id)
                    window.location = "/dashboard/SQuote2.html"
                
            }
        } catch(e){
            console.log(e)
        }
    })

}

function gotoq3(){
    window.location = "/dashboard/SQuote3.html"
}


$(document).ready(function(){
    auth.onAuthStateChanged(async user => {
    if(user){
        const mail = user.email
        const id  = localStorage.getItem("quotedproductid")
        const u = await findReqProduct(id)
        console.log(u)
        let date = new Date().toUTCString()
        const v = await findProduct(u.productid)
        const arr = [
            {id:"img1", value: v.url[0]},
            {id:"qty", value: u.amount},
            {id:"weight", value: u.amount1},
            {id:"time", value:u.time || "" },
            {id:"date", value: u.date || date },
            {id: "amount", value:u.amount * u.price || 1000}
          
            
        ]
        populate(arr)
    } else {
        const id  = localStorage.getItem("quotedproductid")
        const u = await findReqProduct(id)
        console.log(u)
        let date = new Date().toUTCString()
        const v = await findProduct(u.productid)
        const arr = [
            {id:"img1", value: v.url[0]},
            {id:"qty", value: u.amount},
            {id:"qty", value: u.amount1},
            {id:"time", value:u.time || "" },
            {id:"date", value: u.date || date },
            {id: "amount", value:u.amount * u.price || 1000}
          
            
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


async function update(key, value, id){
    return await db.collection('users').doc(id).update({[key]: value}).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}

async function finder(key, value){
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}

function checkbox(id){
    if(id === "yearroundyes"){
        productAllYearRound = "yes"
    }else if(id === "yearroundno"){
        productAllYearRound = "no"
    } else if(id === "ssno"){
        specialStorage = "no"
    } else if(id === "ssyes"){
        specialStorage = "yes"
    } else if(id === "tempno"){
        temperatureControlledTransportation = "no"
    } else if(id === "tempyes"){
        temperatureControlledTransportation = "yes"
    }else{

    }

    return id
}