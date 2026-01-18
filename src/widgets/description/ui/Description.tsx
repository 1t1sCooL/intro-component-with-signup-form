import styles from './Description.module.css'

export const Description = () => {
    return (
        <section className={styles.description}>
            <h1 className={styles.header}>Learn to code by watching others</h1>
            <p className={styles.text}>
                See how experienced developers solve problems in real-time. Watching scripted tutorials is great,
                but understanding how developers think is invaluable.
            </p>
        </section>
    )
}