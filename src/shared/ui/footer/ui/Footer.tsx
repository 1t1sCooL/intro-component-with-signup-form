import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer noopener">
          Frontend Mentor
        </a>{' '}
        | Coded by{' '}
        <a href="https://www.frontendmentor.io/profile/1t1sCooL" target="_blank" rel="noreferrer noopener">
          1t1sCooL
        </a>
      </p>
    </footer>
  );
};
