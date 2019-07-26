$(()=>{
   
    // $('#addtocart').click(function(e){
    //     const item =($(this).parent()[0].innerText).split('\n')[0]
    //     $.post('/tobeaddedtocart',{name:item},function(data){
    //          console.log(data)
             
    //     })
    // })



function refreshComplete(items){
    items.forEach(i=>{
        console.log(i)
      var item = $(`<div class="col-2 mx-3 pt-2">
        <div class="card" style="width:200px">
          <img class="card-img-top" src="iphone.jpeg" alt="iphone x" style="width:50%">
          <div class="card-body">
            <h4 class="card-header">${i.name}</h4>
            <p class="card-body">&nbsp;${i.price}</p>
            <p class="card-footer">${i.manufacturer}</p>`)
      var del = $("<button class='btn btn-primary' id='addtocart'>Add to Cart</button>").click(function(e){
          console.log("click wokringggg")
        const abcd =($(this).parent()[0].innerText).split('\n')[0]
        console.log(abcd)
        $.post('/tobeaddedtocart',{name:abcd},function(data){
             console.log(data)
             
        })
    })
    var abc =$(`</div>
    </div>
  </div>`)
    item.append(del);
    item.append(abc)
      $("#list").append(item);
    })
  }

  $.get('/prod',{},function(data){
    refreshComplete(data)
    
})
})