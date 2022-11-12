document.querySelector('#search').addEventListener('input', filterlist)

  function filterlist(){
    const searchInput = document.querySelector('#search')
    const filter = searchInput.value.toLowerCase()
    const items = document.querySelectorAll('#card')
    

    items.forEach(item => {
      let text = item.textContent
      if(text.toLowerCase().includes(filter.toLowerCase())){
        item.style.display=''
      }else{
        item.style.display='none'

      }
    })
  }