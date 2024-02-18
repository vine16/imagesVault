function deleteProduct(id) {
  const resut = confirm("Are you sure you want to delete this product ?");
  if (resut) {
    fetch("/delete-product/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Check if the flag is set in localStorage
  if (!localStorage.getItem("visitFlag")) {
    function setLastVisitCookie() {
      const confirmMessage = "Would you like to save your visit date?";
      const maxAgeInSeconds = 2 * 24 * 60 * 60 * 1000;
      if (window.confirm(confirmMessage)) {
        const lastVisit = new Date().toLocaleString();
        document.cookie = `lastVisit=${lastVisit}; max-age=${maxAgeInSeconds}`;
      }

      // Set the flag in localStorage to indicate that the code has been executed
      localStorage.setItem("visitFlag", "true");
    }

    // Call the function to set the cookie only on the first visit
    setLastVisitCookie();
  }
});
