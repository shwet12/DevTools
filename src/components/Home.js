export default function Home() {
  const init = () => {
    const home = document.createElement('div');
    home.classList.add('home');
    home.innerHTML = `
        <h1>Welcome to Dev Tools</h1>
        <p>
            One place to help you with day to day development tasks. Take notes on the fly, Preview your JSONs and much more. 
        </p>`;
    return home;
  };
  return {
    init,
  };
}
