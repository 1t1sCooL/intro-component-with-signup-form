import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <footer>
            <p className={styles.footer}>
                Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank"> Frontend Mentor</a>
                Coded by <a href="#">1t1sCooL</a>
            </p>
        </footer>
    )
}