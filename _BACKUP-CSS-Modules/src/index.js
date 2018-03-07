import styles from './app.scss';
import styles2 from './app2.scss';

let element = `
  <div class="${styles.element}">
    <p>Using Sass source files.</p>
  </div>
`;

let element2 = `
  <div class="${styles.element} ${styles2.element}">
    <p>Override color.</p>
  </div>
`;

document.write(element, element2);
