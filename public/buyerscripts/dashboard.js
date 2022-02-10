

  document.addEventListener( 'DOMContentLoaded', function() {
    var splide = new Splide( '.splide', {
        perPage: 3,
        rewind : true,
      } );
      
      splide.mount();
  } );
const List = document.getElementById('list')
const setLists = function (data) {
   
    let html = `<div class="row">
    <div class="col-lg-6" >
        <h5 style="color: rgba(0, 0, 0, 0.59); margin-left: 5%">Open Orders</h5>
    </div>
    <div style="float: left;" class="col-lg-6" >
        <h5 style="color: rgba(0, 0, 0, 0.2); float: right; margin-right: 38%">Closed Orders</h5>
    </div>
</div>

<div style="border: 1px solid #000000; color: #000000" class="col-lg-12 col-xs-12">
    <div class="row">
       <div class="col-lg-3 col-xs-3">
          <h5 style="text-align: center">Order ID</h5>
       </div>
        <div class="col-lg-3 col-xs-3">
            <h5 style="text-align: center">Product</h5>
        </div>
        <div class="col-lg-3 col-xs-3">
            <h5 style="text-align: center">Date</h5>
        </div>
        <div class="col-lg-3 col-xs-3">
            <a href="#"><h5 style="text-align: center;  color: #BA5313">Status </h5></a>
        </div>
    </div>

</div>`
    data.forEach((dat, i)=> {
        const data= dat.data()
        let htm =  `
        <div style="margin-top: 10px; color: #000000;  border-radius: 25px; border: 1px solid green; background-color: rgba(0, 122, 57, 0.14)" class="col-lg-12 col-xs-12">
        <div style="" class="row">
            <div class="col-lg-3 col-xs-3">
                <h5 style="text-align: center">${dat.id}</h5>
            </div>
            <div class="col-lg-3 col-xs-3">
                <h5 style="text-align: center">Cocoa- QBL-18L40</h5>
            </div>
            <div class="col-lg-3 col-xs-3">
                <h5 style="text-align: center">${dat.date || new Date().toDateString()}</h5>
            </div>
            <div class="col-lg-3 col-xs-3">
                <a href="#"><h5 style="text-align: center;  color: #BA5313">Awaiting Quote  </h5></a>
            </div>
        </div>

    </div>
            `
        html+=htm
    })
    return html
}

//   let p=[
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()},
//             {name: 0000, date: new Date().toDateString()}
//         ]
$(document).ready(()=>{
    auth.onAuthStateChanged(async user => {
        if(1 == 1){
            db.collection('requestedProducts').where("who", "==", user.email).get().then(props=>{
                // const props = d.docs[0].data()
                // name.innerHTML = props.firstname
                console.log(props.docs)
                if(props.docs.length < 1 ) {
                    List.innerHTML = '' 
                
                   } else {
                    // let grouped = group(props.docs, 10)
                    // console.log(grouped)
                    // let sp = setPage(grouped, 8)
                    List.innerHTML = setLists(props.docs)
                   }  
               })
        } else if(user.emailVerified !== true){
            window.location = '/sent.html'
        } else {
            window.location = '/index.html'
        }
    })


    // const params = new URLSearchParams(window.location.search)
    // const mode = params.get('mode')
    // if(mode === 'verifyEmail'){
    //     window.location.href = '/login.html'
    // } 
    // if(mode === 'resetPassword'){
    //     window.location.href = '/login.html'
    // }
 
})


function group(arr, group){
    let returnalbleArr = []
    let l = Math.floor(arr.length/group)
    for(let i=0; i<= l; i++){
      returnalbleArr.push(arr.splice(0, group))
    }
    return returnalbleArr
  }

  async function setPage(pages, l){
    let pagination = []
    console.log(pages)
    pages.forEach(function(page, j){
        let html = ''
        console.log(page)
        let p = lp(page, setLists)
        pagination.push(p)
    })
    storedPagination = [...pagination]
    List.innerHTML = pagination[0] + `<div class='' style='display:flex;flex-direction:row;margin-left: 0px;cursor: pointer; text-align:center;width: 50px'>${arrange(pagination)}</div>`
    console.log(pagination.length)
}

function lp(page, fn){
    return [page].map(function(p){
        return fn(p)
    })
}

function arrange(pagination, fg){
    let l = pagination.length
    let pages = pagination.map(function(page, i){
       // return `<div data-site=${page} onclick="setPageNumber(this.id) id=${String(Math.random * Date.now())}"><a>${i+1}</a></div>`
       return `<p style="text-align:center;color: blue" class='container column';cursor: pointer; onclick=setPageNumber(this.id) id=${i} >${i+1}</p>`
    })
    console.log(pages.join(''))
    return pages.join('')
}
function setPageNumber(id){
    console.log(id)
    // let products = document.getElementById(id).getAttribute('data-site')
    let products = storedPagination[id]
    List.innerHTML = products + `<div style='display:flex;flex-direction:row;margin-left: 0px;cursor: pointer; text-align: center; width: 50px'>${arrange(storedPagination)}</div>`
}

function d(){
    const a = document.getElementById('n')
a.addEventListener('click', function(){
    console.log('ckakjd')
   return  $.ajax({
        url: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/31/8744407/8744407_937826b4-86e8-4be0-946d-935c13716dc4_1915_1549.jpg',//'https://cors-anywhere.herokuapp.com/https://firebasestorage.googleapis.com/v0/b/legalbuddie.appspot.com/o/documents%2Fb1.jpeg?alt=media&token=d8ddbd34-cef0-4d0a-a048-c30b6898573d',
        async:true,
        method: 'GET',
        xhrFields: {
            responseType: ''
        },
        // success: function (dat) {
            
        //     const data = dat
            
        //     console.log(data)
            
        //         var a = document.createElement('a');
        //         // a.src = window.URL.createObjectURL(data);
        //         const binaryData = []
        //         binaryData.push(data)
        //         var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
        //         a.href = url;
        //         a.download = 'images.jpg';
        //         document.body.append(a);
        //         a.click();
        //         a.remove();
        //         window.URL.revokeObjectURL(url);
        
        
        // }
    }).then(function(data){
        console.log(data)
                var a = document.createElement('a');
                // a.src = window.URL.createObjectURL(data);
                const binaryData = []
                binaryData.push(data)
                var url = window.URL.createObjectURL(new Blob(binaryData, {type: "image/png"}));
                a.href = url;
                a.download = 'images.jpg';
                console.log(a)
                document.body.append(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
    });
})

}



const goto = function(id){
    localStorage.setItem("id", id)
    window.location = '/product_overview.html'
}

const del = function(id){
    const a = id.split('')
    a.pop()
    console.log(id, a.join(''))
    db.collection('blogImages').doc(a.join('')).delete().then(function(d){
        console.log(d)
        swal('blog deleted')
    }).catch(e=> swal(e))
}

