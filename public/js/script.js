document.addEventListener("DOMContentLoaded", function(){
const taskList = document.querySelector(".task-list");

taskList.addEventListener("click", function(e){
  if(!e.target.classList.contains("edit-btn")){
     return;
  }

  e.preventDefault();
  var btn = e.target;
  var li = btn.closest("li");
  var id = btn.dataset.id;
  var title = btn.dataset.title;
  var priority = btn.dataset.priorit
  document.querySelectorAll(".edit-form").forEach(function(f){
    f.remove();
  });
  var form = document.createElement("form");
    form.className = "edit-form";
    form.method = "POST";
    form.action = "/tasks/edit/" + id
    var highSelected = priority === "high" ? "selected" : "";
    var mediumSelected = priority === "medium" ? "selected" : "";
    var lowSelected = priority === "low" ? "selected" : ""
    form.innerHTML = `
      <input type="text" name="title" value="${title}" required>
      <select name="priority" required>
         <option value="high" ${highSelected}>High</option>
         <option value="medium" ${mediumSelected}>Medium</option>
         <option value="low" ${lowSelected}>Low</option>
      </select>
      <button type="submit">Update</button>
      <button type="button" class="cancel-edit">Cancel</button>
    `;

  li.insertAdjacentElement("afterend", form);

  var cancelBtn = form.querySelector(".cancel-edit");
    cancelBtn.addEventListener("click", function(){
    form.remove();
  });
  });
});
