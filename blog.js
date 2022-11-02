// @ts-nocheck
const maxCount = 100;

async function loadPosts() {
  const response = await fetch("server.json");
  const data = await response.json();
  return data;
}

async function createBlogPostElement(postData, postIndex) {
  if (postIndex >= maxCount) return;

  const { name, imgUrl, content } = postData;

  const response = await fetch("components/blogPost.html");
  const blogPostHTML = await response.text();

  const element = document.createElement("div");
  element.innerHTML = blogPostHTML;

  element.querySelector(".name").innerHTML = name;
  element.querySelector(".content").innerHTML = content.slice(0, 150) + "…";
  element.querySelector("img")?.setAttribute("src", imgUrl);

  document.querySelector(".posts").appendChild(element);
}

function initializeBlog() {
  loadPosts().then((posts) => posts.forEach(createBlogPostElement));
}

initializeBlog();

document.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;

  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;

  const background = `linear-gradient(90deg, hsl(${
    y * 360
  }, 100%, 50%) 0%, hsl(${x * 360}, 100%, 50%) 100%)`;

  document.body.style.background = background;
});

document.querySelector(".posts").addEventListener("wheel", (event) => {
  event.preventDefault();
  if (document.body.style.opacity === "") document.body.style.opacity = 1.0;

  if (event.deltaY > 0) {
    document.body.style.opacity = parseFloat(document.body.style.opacity) + 0.1;
  } else {
    document.body.style.opacity = parseFloat(document.body.style.opacity) - 0.1;
  }
});

particlesJS.load("particles-js", "particlesjs-config.json");
