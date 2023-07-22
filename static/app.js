base_url = "http://127.0.0.1:5000/api";

function createCupcake(cupcake) {
  return `<li data-id=${cupcake.id}>
  ${cupcake.flavor}, ${cupcake.size}, ${cupcake.rating}  -- 
  <button class = "delete">X</button></br>
  <img id="image-c" src=${cupcake.image}>
  </li>`;
}

async function showCupcakes() {
  const resp = await axios.get(`${base_url}/cupcakes`);
  for (let cupcake of resp.data.cupcakes) {
    let newCupcake = $(createCupcake(cupcake));
    $(".list-cupcakes").append(newCupcake);
  }
}

$(".cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();
  let flavor = $("#flavor").val();
  let size = $("#size").val();
  let rating = $("#rating").val();
  let image = $("#image").val();

  let resp = await axios.post(
    `${base_url}/cupcakes`,
    (json = {
      flavor,
      size,
      rating,
      image,
    })
  );
  let newCupcake = $(createCupcake(resp.data.cupcakes));
  $(".list-cupcakes").append(newCupcake);
  $(".cupcake-form")[0].trigger("reset");
});

$(".list-cupcakes").on("click", ".delete", deleteCupcake);

async function deleteCupcake(evt) {
  evt.preventDefault();
  let cupcake = $(evt.target).closest("div");
  let id = cupcake.attr("data-id");

  await axios.delete(`${base_url}/cupcakes/${id}`);
  cupcake.remove();
}

$(showCupcakes);
