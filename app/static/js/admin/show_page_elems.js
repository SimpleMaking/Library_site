function edit_elem_state(id)
{
    if (document.getElementById(id).style.display == "block")
    {
        document.getElementById(id).style.display = "none";
    }
    else
    {
        document.getElementById(id).style.display = "block";
    }
}

function openCategoryForm() 
{
  document.getElementById("popupCategoryForm").style.display = "block";
}

function closeCategoryForm() 
{
  document.getElementById("popupCategoryForm").style.display = "none";
}

