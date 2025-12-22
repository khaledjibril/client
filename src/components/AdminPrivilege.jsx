const AdminPrivilege = ({ user, onUpdate }) => {
  const updateRole = async isAdmin => {
    // Optimistic UI update
    onUpdate(user.id, isAdmin);

    try {
      await fetch(`https://photography-server-catq.onrender.com/api/users/${user.id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_admin: isAdmin })
      });
    } catch (err) {
      console.error("Failed to update role", err);
    }
  };

  return (
    <div className="flex justify-end gap-6">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={`admin-${user.id}`}
          checked={user.is_admin === true}
          onChange={() => updateRole(true)}
        />
        Yes
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={`admin-${user.id}`}
          checked={user.is_admin === false}
          onChange={() => updateRole(false)}
        />
        No
      </label>
    </div>
  );
};

export default AdminPrivilege;