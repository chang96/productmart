async function storeDocs(btntype){

    const unit = document.getElementById("unit").value
    const weight = document.getElementById("weight").value

    const price = document.getElementById("price").value
    const shippingPackageUnit = document.getElementById("shipping").value
    const shippingWeight = document.getElementById("shippingWeight").value
    const dimension = document.getElementById("dimension").value
    const priceOfShipment = document.getElementById("priceOfShipment").value
    const numberOfUnitsPerShipment = document.getElementById("numberOfUnitsPerShipment").value
    const shippingInContainer = document.getElementById("shippingInContainer").value

    return auth.onAuthStateChanged(async user => {
        if(user){
            let owner =  user.email
            // console.log(files, option)
            const urls = []
            // var b =  await store(urls, "/productImages/", files)
            const newDoc = {
                // url: b,
                unit: unit,
                weight: weight,
                price: price,
                shippingPackageUnit: shippingPackageUnit,
                shippingWeight: shippingWeight,
                dimension: dimension,
                priceOfShipment: priceOfShipment,
                numberOfUnitsPerShipment: numberOfUnitsPerShipment,
                shippingInContainer: shippingInContainer
            }
            let userId = await finder("email", owner)
            const productUpdate = await update("products", newDoc, userId[0].currentproduct).then(res=> "updated").catch(e=> e)
            console.log(productUpdate)
            if(btntype === "next"){
                window.location.href = "/dashboard/sdashboard.html"
            } else {
                alert("Product Details saved")
                // window.location.href = "/dashboard/packaging.html"
            }
        }
    })

}
async function uploadImageAsPromise (imageFile, location) {
    return new Promise(function (resolve, reject) {
        var storageRef = storage.ref(location+imageFile.name);
        var task = storageRef.put(imageFile);

        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 
                     100;
                     console.log(percentage)
            },
            function error(err){
                console.log(err);
                reject(err);
            },
            function complete(){
                var downloadURL = task.snapshot.ref.getDownloadURL().then((url)=> {
                   //console.log(url)
                   resolve(url)
                });
                //console.log(task.snapshot, downloadURL)
                //resolve(downloadURL);
            }
        );
    });
}

async function store(arr, location, files){
    let a = [...files.files]
    // console.log(a)
    a.forEach((element,i) => {
        if(element == undefined || element.name == undefined){
            let j = files.files.indexOf(element)
            files.files.splice(j ,1)
        }
    });
    // console.log(files.files)
    if(files.files.length <1 || files.files[0] === undefined){
        return
    }
    for (var i = 0; i < files.files.length; i++) {
        if(files.files[i] === undefined){
            continue
        }
        console.log(i, files.files.length, i === files.files.length)
        if(i === files.files.length - 1){
            var imageFile = files.files[i];
            await uploadImageAsPromise(imageFile, location).then((res)=>{
                console.log(res)
                arr.push(res)
                console.log(arr);
            })
            return arr
        }
        var imageFile = files.files[i];
        await uploadImageAsPromise(imageFile, location).then((res)=>{
         arr.push(res);
          });
    }
}

async function update(collection, obj, id){
    return await db.collection(collection).doc(id).update(obj).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}

async function finder(key, value){
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}