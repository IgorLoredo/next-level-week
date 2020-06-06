
function populateUFs(){

    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() )
    .then( states => {

        for(const state of states ){
             ufSelect.innerHTML += ` <option value ="${state.id}">${state.nome}</option>`
        }       
    } )
}



populateUFs()

// 
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const index = event.target.selectedIndex;

    stateInput.value = event.target.options[index].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = false;

    fetch(url)
    .then(res => res.json() )
    .then( cities => {
        
        for(const city of cities ){
            citySelect.innerHTML += ` <option value ="${city.nome}">${city.nome}</option>`
        }       
    } )

    

}


document
    .querySelector("select[name =uf]")
    .addEventListener("change", getCities)

// itens de coleta
//pegar todo so li

const itemsToCollect = document.querySelectorAll(".items-grid li")
    for(const item of itemsToCollect){
        item.addEventListener("click",handleSelectedItem)
    }

    const collecteditems = document.querySelector("input[name=items]")

    let selectedItems = []



function handleSelectedItem(event){
    const itemLi = event.target
        //função toggle serve pra marcar ou desmarcar 
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId
        return itemFound
    })

    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item =>{
            const itemDifferent = item != itemId
            return itemDifferent
        })

        selectedItems = filteredItems
    }else{


        selectedItems.push(itemId)
    }

    collecteditems.value = selectedItems
    console.log(selectedItems); 
}