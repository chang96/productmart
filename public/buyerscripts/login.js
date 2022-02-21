async function findUser(email){
    return await db.collection('users').where("email", '==', email).get().then(data=>{
        return data.docs[0].data()
    }).catch(e=> console.log(e))
}
async function finder(key, value){
    console.log(key, value)
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        console.log(data)
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}
async function update(key, value, id){
    return await db.collection('users').doc(id).update({[key]: value}).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}
async function login(){

    const email = document.getElementById('email').value.toLowerCase()
    const password = document.getElementById('password').value
    console.log(email, password)
    auth.signInWithEmailAndPassword(email, password).then(async c => {
        const u = await finder('email', email)
        console.log(u)
        auth.onAuthStateChanged(async user=>{
            if(user.emailVerified === true || user.email=='rorewole@gmail.com'){
                // alert("you will be logged in now") 
                if(u[0].buyer === "yes"){
                    window.location.reload()
                } else {
                    window.location = "/dashboard/sdashboard.html"
                }
               
            } else {
                alert('To continue, Kindly login to your email and verify it')
            }
        })
    //   const finalizing = await update('loggedIn', true, u[1])
    //   console.log(finalizing)

//    window.location.href = '/logged.html' 
    }).catch(e =>{
        console.log(e)
        alert(e.message)
    })
}

// needed forget password page
// verify email page
// 






$(document).ready(function(){
    auth.onAuthStateChanged(async user => {
    if(user){
        const mail = user.email
        document.getElementById("loggedin").innerHTML = `<a style="cursor: pointer; color:red" onclick="signout()" >Sign Out</a>`
        
    } 
})
 
}) 



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


function signout(){
    auth.signOut().then(() => {
        window.localStorage.clear()
        // redirect to home page
        window.location.href='/index.html'
    })
}