$(()=>{
    
    $.get('/addtocart',(data)=>{
        console.log(data)
        refresh(data)
    })
    function refresh(data){
        $('#table1').empty()
        data.forEach(item => {
    var inf=$(`      <tr>
    <th scope="row">${item.name}</th>
    <td>${item.price}</td>
    <td>1</td>
    <td>ab</td>
  </tr>`)




            $('#table1').append(inf)
        })
    }
})