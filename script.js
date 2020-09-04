const startjava = () => {
  sidebar();
  let loadselect = document.querySelector("#cards");
  loadselect.innerHTML = mainload;
  getMovieInfo(apimovie);
  startModal();
};

const setClickListenersMovie = api => {
  const fabele = document.querySelectorAll(".fabutton");
  const modalls = document.querySelector("#modalcont");

  fabele.forEach(element => {
    element.addEventListener("click", e => {
      const temp = e.target;
      modalls.innerHTML = loading;
      getMovieModal(temp.id, apimovie)
        .then(res => {
          console.log("then block");
          modalls.innerHTML = res;
        })
        .catch(e => console.error(e));
    });
  });
};

const startModal = () => {
  var elems2 = document.querySelectorAll(".modal");
  const options2 = {
    opacity: 0.7
  };
  let instances2 = M.Modal.init(elems2, options2);
  return instances2;
};
const sidebar = () => {
  const elems = document.querySelector(".sidenav");
  const options = {
    edge: "left",
    draggable: true,
    preventScrolling: true
  };
  const instances = M.Sidenav.init(elems, options);
  return instances;
};

const getMovieInfo = api => {
  const cardElem = document.querySelector("#cards");
  getMovie(api)
    .then(res => {
      cardElem.innerHTML = res;
    })
    .catch(e => {
      console.error(e);
    })
    .finally(() => {
      setClickListenersMovie(apimovie);
      var elems = document.querySelectorAll(".materialboxed");
      var instances = M.Materialbox.init(elems, {});
    });
};

window.addEventListener("DOMContentLoaded", startjava);
