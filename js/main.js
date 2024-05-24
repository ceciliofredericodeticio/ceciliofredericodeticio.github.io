let enable_scroll = true;

window.onload = () => {
  init_fullscreen_z_index().then(() => {
    // init_scroll_restriction();
  });
};
const init_fullscreen_z_index = async () => {
  let sections = document.getElementsByClassName("card-section");
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    section.style = `z-Index: ${i}`;
    section.id = `section-${i}`;
    let content = section.innerHTML;
    section.innerHTML =
      `
      <anchor class="auto-scroll auto-scroll-top-indicator" data-section-name="section-${i}" id="top-indicator-${i}"></anchor>
      <anchor class="auto-scroll auto-scroll-bottom-indicator" data-section-name="section-${i}" id="bottom-indicator-${i}"></anchor>
      ` + content;
  }
  return true;
};
const init_scroll_restriction = () => {
  let auto_scroll_el = document.getElementsByClassName("auto-scroll");

  var observer = new IntersectionObserver(
    function (entries) {
      if (enable_scroll === false) return;
      let visible_el = entries.filter((row) => {
        return row?.isIntersecting === true;
      });
      if (visible_el.length !== 0 && visible_el[0].isIntersecting === true) {
        let dataSectionName = visible_el[0]?.target?.getAttribute("data-section-name") || "";
        enable_scroll = false;
        document.body.className = "stop-scrolling";
        setTimeout(() => {
          document.getElementById(dataSectionName).scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            enable_scroll = true;
            document.body.className = "";
          }, 500);
        }, 500);
      }
    },
    { threshold: [0] }
  );

  for (let i = 0; i < auto_scroll_el.length; i++) {
    const el = auto_scroll_el[i];
    observer.observe(el);
  }
};
const on_image_error = (e) => {
  console.log("image_error", e);
  e.src = "./img/svg/image_placeholder.svg";
};
