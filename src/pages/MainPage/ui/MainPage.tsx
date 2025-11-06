import {Footer} from "@/shared/ui/footer";
import {Description} from "@/widgets/description";
import {Form} from "@/widgets/form";
import styles from './MainPage.module.css'

export const MainPage = () => {
    return (
        <>
            <div className={styles.container}>
                <Description/>
                <Form/>
            </div>
            <Footer/>
        </>
    )
}