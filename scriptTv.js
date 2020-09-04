const startnode = () => {
  sidebar();
  let tvref = document.querySelector(".tvlink");
  tvref.addEventListener("click", loadtv());
  let loadselectTV = document.querySelector("#cards");
  loadselectTV.innerHTML = mainload;
  startModalTv();
};
const startModalTv = () => {
  var elems2 = document.querySelectorAll(".modal");
  const options2 = {
    opacity: 0.7
  };
  let instances2 = M.Modal.init(elems2, options2);
  return instances2;
};
const getTvInfo = api => {
  const cardElem = document.querySelector("#cards");
  getTvshow(api)
    .then(res => {
      cardElem.innerHTML = res;
    })
    .catch(e => {
      console.error(e);
    })
    .finally(() => {
      setClickListenersTv(apitv);
      var elems = document.querySelectorAll(".materialboxed");
      var instances = M.Materialbox.init(elems, {});
    });
};
const loadtv = () => {
  getTvInfo(apitv);
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
window.addEventListener("DOMContentLoaded", startnode);

const setClickListenersTv = api => {
  const fabele = document.querySelectorAll(".fabutton");
  const modalls = document.querySelector("#modalcont");

  fabele.forEach(element => {
    element.addEventListener("click", e => {
      const temp = e.target;
      modalls.innerHTML = loading;
      getTvModal(temp.id, apitv)
        .then(res => {
          modalls.innerHTML = res;
        })
        .catch(e => console.error(e));
    });
  });
};
