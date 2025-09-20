document.addEventListener("DOMContentLoaded", () => {
const taskList = document.querySelector(".task-list");

taskList.addEventListener("click", e => {
  if(!e.target.classList.contains("edit-btn")){
     return;
  }
  e.preventDefault();
  const btn = e.target;
  const li = btn.closest("li");
  const id = btn.dataset.id;
  const title = btn.dataset.title;
  const priority = btn.dataset.priority;
  document.querySelectorAll(".inline-edit-form").forEach(f => f.remove());

  const form = document.createElement("form");
  form.className = "inline-edit-form";
  form.method = "POST";
  form.action = `/tasks/edit/${id}`;
  form.innerHTML = `
    <input type="text" name="title" value="${title}" required>
    <select name="priority" required>
      <option value="high" ${priority === "high" ? "selected" : ""}>High 🔥</option>
      <option value="medium" ${priority === "medium" ? "selected" : ""}>Medium ⚡</option>
      <option value="low" ${priority === "low" ? "selected" : ""}>Low 🌿</option>
    </select>
    <button type="submit">Update</button>
    <button type="button" class="cancel-inline-edit">Cancel</button>
  `;

  li.insertAdjacentElement("afterend", form);

  form.querySelector(".cancel-inline-edit").addEventListener("click", () => form.remove());
  });
});
