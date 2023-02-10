import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const Navbar = () => {

    return (
        <div className={styles.navbar}>
            <div className={styles.links}>
                <Link href="/">Domov</Link>
                <Link href="/kniznica">Knižnica</Link>
                <Link href="/kniha">Kniha</Link>
                <Link href="/student">Študent</Link>
                <Link href="/vypozicky">Vypožicky</Link>
                
            </div>
        </div>
    )
};

export default Navbar;