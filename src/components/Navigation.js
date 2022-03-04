// export default class extends Base {
//   constructor() {
//     super();
//     this.setTitle('Home');
//   }

//   static async render() {
//     return `
//             <h1>Welcome back, Dom</h1>
//             <p>
//                 Fugiat voluptate et nisi Lorem cillum anim sit do eiusmod occaecat irure do. Reprehenderit anim fugiat sint exercitation consequat. Sit anim laborum sit amet Lorem adipisicing ullamco duis. Anim in do magna ea pariatur et.
//             </p>
//             <p>
//                 <a href="/blogs" data-link>View Blogs</a>.
//             </p>
//         `;
//   }
// }

export const Navigation = function () {
  this.render = function () {
    return `
        <nav class="nav">
        <a href="/" class="nav__link" data-link>Home</a>
        <a href="/profile" class="nav__link" data-link>Profile</a>
        <a href="/notes" class="nav__link" data-link>Notes</a>
    </nav>
        `;
  };
};
