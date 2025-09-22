document.addEventListener("DOMContentLoaded", function(){
const tasks = document.querySelector(".list");

tasks.addEventListener("click", function(e){
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
    var high = priority === "high" ? "selected" : "";
    var medium = priority === "medium" ? "selected" : "";
    var low = priority === "low" ? "selected" : ""
    form.innerHTML = `
      <input type="text" name="title" value="${title}" required>
      <select name="priority" required>
         <option value="high" ${high}>High</option>
         <option value="medium" ${medium}>Medium</option>
         <option value="low" ${low}>Low</option>
      </select>
      <button type="submit">Update</button>
      <button type="button" class="cancel-edit">Cancel</button>
    `;

  li.insertAdjacentElement("afterend", form);

  var cancel = form.querySelector(".cancel-edit");
    cancel.addEventListener("click", function(){
    form.remove();
  });
  });
});
