document.addEventListener("DOMContentLoaded", function () {
    const showLoaderDuration = 1000; 
    const hasShownLoader = sessionStorage.getItem("hasShownLoader");
  
    if (!hasShownLoader) {
      showLoader();
      setTimeout(() => {
        hideLoader();
        sessionStorage.setItem("hasShownLoader", true);
      }, showLoaderDuration);
    } else {
      hideLoader();
    }
  
    function showLoader() {
      document.getElementById("loading-overlay").style.display = "flex";
    }
  
    function hideLoader() {
      document.getElementById("loading-overlay").style.display = "none";
    }
  });
  