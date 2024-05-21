let enable_scroll = true;

window.onload = () => {
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
  document.addEventListener("scroll", (e) => {
    console.log("enable_scroll", enable_scroll);
  });
  for (let i = 0; i < auto_scroll_el.length; i++) {
    const el = auto_scroll_el[i];
    observer.observe(el);
  }
};
