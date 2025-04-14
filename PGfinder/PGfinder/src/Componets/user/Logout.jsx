const Logout = () => {
  if (window.confirm("Are you sure you want to logout?")) {
    // Clear all local storage data
    localStorage.clear();

    // Optionally, if you only want to remove specific items, you can use:
    // localStorage.removeItem('token');
    // localStorage.removeItem('userRole');
    // localStorage.removeItem('userId');
    // (add more as per your project)

    // Redirect to login page
    window.location.href = "/login";
  }
};

export default Logout;
