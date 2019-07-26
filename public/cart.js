$(()=>{
    
    $.get('/addtocart',(data)=>{
        console.log(data)
        refresh(data)
    })
    function refresh(data){
        $('#table1').empty()
        var totalcost=0
        data.forEach(item => {
            console.log(item)
            var totalrate=(item.quantity)*(item.price)
            totalcost+=totalrate
            var ent=$(`<tr></tr>`)
    var inf=$(`<th scope="row">${item.name}</th>
    <td>${item.price}</td>
    <td>${item.quantity}</td>
    <td>₹${totalrate}</td>`)
 var del=$(`<td><button class='btn btn-primary'>Delete</button></td>`).click((e)=>{
  var item_name=(e.target.parentElement.parentElement.innerText).split("	")[0] 
    // console.log(e.target.parent())
    // console.log($(this).previousSibling.innerHTML)
    window.alert('item deleted from the cart')
     $.post('/delcart',{name:item_name},(data)=>{
        $.get('/addtocart',(data1)=>{
             refresh(data1)
        })
     })
 })

ent.append(inf)
ent.append(del)
            $('#table1').append(ent)
        })
    var tot=$(`<div class="col"> Total Cost (in INR) = ₹${totalcost} </div>`)
    $('#total').append(tot)
    }
})