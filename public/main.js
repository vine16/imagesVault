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
