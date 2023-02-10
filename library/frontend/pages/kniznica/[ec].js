import styles from '../../styles/Edit_Kniznica.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from "axios";

const KniznicaDetail = () => {
    const router = useRouter()
    const ec_kniznica = router.query.ec;
    const [nazov, setNazov] = useState('');
    const [ulica, setUlica] = useState('');
    const [mesto, setMesto] = useState('');
    const [email, setEmail] = useState('');
    const [kontakt, setKontakt] = useState('');
    const apiEndPoint = `http://localhost:3000/kniznica/${ec_kniznica}`;

    useEffect(() => {
        const getKniznica = async () => {
            const response = await fetch(apiEndPoint);
            const result = await response.json();
            setNazov(result.nazov);
            setUlica(result.ulica);
            setMesto(result.mesto);
            setEmail(result.email);
            setKontakt(result.kontakt);
            console.log('result:',result);
        };
        getKniznica();

    }, [ec_kniznica, router]);
    const patchKniznica = (event) => {
        event.preventDefault();
        console.log('patchKniha');
        const data =
        {
            "nazov": `${nazov}`,
            "ulica": `${ulica}`,
            "mesto": `${mesto}`,
            "email": `${email}`,
            "kontakt": `${kontakt}`,
        };
        axios.patch(`http://localhost:3000/kniznica/${ec_kniznica}`, data).then(alert('Kniznica bola uspesne zmenena.'));
        router.push("/kniznica");
    };
    const zrusitKniznica = (e) => {
        router.push("/kniznica");
    }

    return (
        <div className={styles.div}>
            <form className={styles.form}>
                <h2 className={styles.h2}>ZMENA ÚDAJOV  O KNIŽNICI:</h2>
                <labe className={styles.labe} >Názov</labe>
                <p><input className={styles.input} type="text" name="nazov" placeholder="Názov" value={nazov} onChange={e => setNazov(e.target.value)}></input></p>
                <labe className={styles.labe} >Ulica</labe>
                <p><input className={styles.input} type="text" name="ulica" placeholder="Ulica" value={ulica} onChange={e => setUlica(e.target.value)}></input></p>
                <labe className={styles.labe} >Mesto</labe>
                <p><input className={styles.input} type="text" name="mesto" placeholder="Mesto" value={mesto} onChange={e => setMesto(e.target.value)}></input></p>
                <labe className={styles.labe} >E-mail</labe>
                <p><input className={styles.input} type="text" name="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}></input></p>
                <labe className={styles.labe} >Kontakt</labe>
                <p><input className={styles.input} type="text" name="kontakt" placeholder="Kontakt" value={kontakt} onChange={e => setKontakt(e.target.value)}></input></p>                
                <button className={styles.button1} onClick={patchKniznica} >Potvrdiť</button>
                <button className={styles.button} onClick = {zrusitKniznica} >Zrušiť</button>
            </form>

        </div>
    );
}

export default KniznicaDetail;