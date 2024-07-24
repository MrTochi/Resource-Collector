let iconBox=document.getElementById(`iconBox`)
let theIcon=document.getElementById(`icon`)
let secondCont=document.getElementById(`secondCont`)
let resourceButton=document.getElementById(`create`)
let createButton=document.getElementById(`submit`)
let nameField=document.getElementById(`name`)
let linkField=document.getElementById(`link`)
let descriptionField=document.getElementById(`description`)
let nameAlert=document.getElementById(`nameAlert`)
let linkAlert=document.getElementById(`linkAlert`)
let buttonAlert=document.getElementById(`buttonAlert`)
let containerB=document.getElementById(`containerB`)
let form=document.getElementById(`form`)




let resourceArray=[]

resourceButton.addEventListener(`click`,revealModal)

function revealModal(){
    secondCont.style.visibility=`visible`
}

iconBox.addEventListener(`click`,closeModal)
icon.addEventListener(`click`,closeModal)

function closeModal(event){
    let target=event.target
    if(target.className === `secondCont` || target.className===`iconBox` ){
         secondCont.style.visibility=`hidden`
    }
    else{
        return
    }
    
}

secondCont.addEventListener(`click`,closeModal)



form.addEventListener(`submit`,collectResource)

function collectResource(event){
    event.preventDefault()
    let siteName=nameField.value
    let siteLink=linkField.value
    let siteDescription=descriptionField.value
  if(siteName.length===0 || siteLink.length===0 || siteDescription.length===0){
    buttonAlert.textContent=`Please Complete All Fields To Create a Resource`
  }
  else{
    buttonAlert.textContent=``
    let resourceObj={
        nameOfSite:siteName,
        linkofWebsite:siteLink,
        descriptionofWebsite:siteDescription
    }
    resourceArray.unshift(resourceObj)
    localStorage.setItem(`resourceArray`,JSON.stringify(resourceArray))
    fetchResource()
    form.reset()
  }
       
       }



function fetchResource(){
    resourceArray=JSON.parse(localStorage.getItem(`resourceArray`)) || []
    display()
}
fetchResource()



function display(){
    
        containerB.innerHTML=``
    
        resourceArray.forEach(function(resourceObj,resourceInd){
            let resourceContainer=document.createElement(`div`)
            resourceContainer.classList.add(`resourceContainer`)
            resourceContainer.id=resourceInd
           
          
    
            let namedeleteContainer=document.createElement(`div`)
            namedeleteContainer.setAttribute(`class`,`namedeleteContainer`)
    
            let iconBox1=document.createElement(`div`)
            iconBox1.setAttribute(`class`,`iconBox1`)
            
    
            let delicon=document.createElement(`i`)
            delicon.classList.add(`fa-solid`,`fa-trash`)
            delicon.style.cursor=`pointer`
            delicon.setAttribute(`data-action`,`del`)
    
            let editicon=document.createElement(`i`)
            editicon.classList.add(`fa-solid`,`fa-pen-to-square`)
            editicon.style.cursor=`pointer`
            editicon.setAttribute(`data-action`,`edit`)
           
            
    
            let linkForsite=document.createElement(`a`)
            linkForsite.setAttribute(`href`,`${resourceObj.linkofWebsite}`)
            linkForsite.setAttribute(`target`,`_blank`)
            linkForsite.textContent=resourceObj.nameOfSite
            linkForsite.style.textDecoration=`none`
            linkForsite.style.fontSize=`500`
    
            let descriptionForSite=document.createElement(`p`)
            descriptionForSite.textContent=resourceObj.descriptionofWebsite
            descriptionForSite.style.color=`black`
            descriptionForSite.style.cursor=`pointer`
            descriptionForSite.style.fontSize=`1rem`
            descriptionForSite.setAttribute(`data-action`,`edit`)
            descriptionForSite.setAttribute(`title`,`click to edit`)
            
    
            iconBox1.append(delicon,editicon)
            namedeleteContainer.append(linkForsite,iconBox1)
            resourceContainer.append(namedeleteContainer,descriptionForSite)
            containerB.append(resourceContainer)
    
            
        })
    }



containerB.addEventListener(`click`,getAction)
function getAction(event){
let actionTarget=event.target
let targetParent=actionTarget.parentElement.parentElement.parentElement
console.log(targetParent);
let targetParentId=targetParent.id
targetParentId=Number(targetParentId)
let targetAction=actionTarget.dataset.action


    if(targetAction===`del`){
        delTarget(targetParentId)
     
    }
    
    else if(targetAction===`edit`){
        editTarget(targetParentId)

    
}

}


function delTarget(targetParentId){
resourceArray.splice(targetParentId,1)
localStorage.setItem(`resourceArray`,JSON.stringify(resourceArray))
display()
}


function editTarget(targetParentId){
let resourcetoEdit=resourceArray[targetParentId]
nameField.value=resourcetoEdit.nameOfSite
linkField.value=resourcetoEdit.linkofWebsite
descriptionField.value=resourcetoEdit.descriptionofWebsite
createButton.textContent=`SAVE EDIT`
secondCont.style.visibility=`visible`

form.removeEventListener(`submit`,collectResource)
form.addEventListener(`submit`,function saveEdit(event){
    event.preventDefault()
    resourcetoEdit.nameOfSite=nameField.value
    resourcetoEdit.linkofWebsite=linkField.value
    resourcetoEdit.descriptionofWebsite=descriptionField.value
    localStorage.setItem(`resourceArray`,JSON.stringify(resourceArray))
    fetchResource()
    form.reset()
    form.removeEventListener(`submit`,saveEdit)
    form.addEventListener(`submit`,collectResource)
    createButton.textContent=`CREATE`
})


}

