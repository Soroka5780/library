import { useRouter } from "next/router";
import styles from '../styles/New_Kniznica.module.css';
import { useState } from "react";
import axios from "axios";

const KniznicaNew = () => {
    const router = useRouter();
    const [nazov, setNazov] = useState('');
    const [ulica, setUlica] = useState('');
    const [mesto, setMesto] = useState('');
    const [email, setEmail] = useState('');
    const [kontakt, setKontakt] = useState('');

    const handleSubmit =  (event) => {
        event.preventDefault ();
        const data = 
            {
                "nazov": `${nazov}`,
                "ulica": `${ulica}`,
                "mesto": `${mesto}`,
                "email": `${email}`,
                "kontakt": `${kontakt}`,
            };
        
         axios.post('http://localhost:3000/kniznica/', data).then(alert('Nova kniznica bola uspesne ulozena.'));
         router.push("/kniznica");
    }
    
    const zrusitKniznica = (e) => {
        router.push("/kniznica");
    }

    return (
        <div className={styles.div}>
            <form  onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.h2}>VYPLŇTE ÚDAJE O KNIŽNICI:</h2>
                <labe className={styles.labe} >Názov</labe>
                <p><input className={styles.input} type="text" name="nazov" placeholder="Názov" onChange={(e) => setNazov(e.target.value)} ></input></p>
                <labe className={styles.labe} >Ulica</labe>
                <p><input className={styles.input} type="text" name="ulica" placeholder="Ulica" onChange={(e) => setUlica(e.target.value)} ></input></p>
                <labe className={styles.labe} >Mesto</labe>
                <p><input className={styles.input} type="text" name="mesto" placeholder="Mesto" onChange={(e) => setMesto(e.target.value)} ></input></p>
                <labe className={styles.labe} >E-mail</labe>
                <p><input className={styles.input} type="text" name="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}  ></input></p>
                <labe className={styles.labe} >Kontakt</labe>
                <p><input className={styles.input} type="text" name="kontakt" placeholder="Kontakt"  onChange={(e) => setKontakt(e.target.value)} ></input></p>
                <button className={styles.button} onClick = {zrusitKniznica} >Zrušiť</button>
                <button  className={styles.button1}>Potvrdiť</button>
            </form>

        </div>
    );
}

export default KniznicaNew;