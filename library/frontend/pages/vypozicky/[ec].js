import styles from '../../styles/Edit_vypozicky.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import axios from "axios";

const VypozickyDetail = () => {
    const router = useRouter()
    const ec_vypozicky = router.query.ec;
    const [datum_vypozicane, setDatumVypozicane] = useState('');
    const [datum_predpokladane, setDatumPredpokladane] = useState('');
    const [datum_skutocne, setDatumSkutocne] = useState('');
  
    const apiEndPoint = `http://localhost:3000/vypozicky/${ec_vypozicky}`;

    useEffect(() => {
        const getVypozicka = async () => {
            const response = await fetch(apiEndPoint);
            const result = await response.json();
            console.log('RES:',result);
            setDatumVypozicane(result.datum_vypozicane);
            setDatumPredpokladane(result.datum_predpokladane);
            setDatumSkutocne(result.datum_skutocne);
            console.log('result:',result);
        };
        getVypozicka();

    }, [ec_vypozicky, router]);
    const patchVypozicka = (event) => {
        event.preventDefault();
        console.log('patchKniha');
        const data =
        {
            "datum_vypozicane": `${datum_vypozicane}`,
            "datum_predpokladane": `${datum_predpokladane}`,
            "datum_skutocne": `${datum_skutocne}`,
            
        };
        axios.patch(`http://localhost:3000/vypozicky/${ec_vypozicky}`, data).then(alert('Vypozicka bola uspesne zmenena.'));
        router.push("/vypozicky");
    };
    const zrusitVypozicka = (e) => {
        router.push("/vypozicky");
    }

    return (
        <div className={styles.div}>
            <form className={styles.form}>
                <h2 className={styles.h2}>Vratenie knihy:</h2>
                <labe className={styles.labe} >Datum vypozicania knihy</labe>
                <p><input className={styles.input} type="text" name="datum_vypozicane" placeholder="datum_vypozicane" value={datum_vypozicane} onChange={e => setDatumVypozicane(e.target.value)}></input></p>
                <labe className={styles.labe} >Dátum Predpokladane</labe>
                <p><input className={styles.input} type="text" name="datum_predpokladane" placeholder="datum_predpokladane" value={datum_predpokladane} onChange={e => setDatumPredpokladane(e.target.value)}></input></p>
                <labe className={styles.labe} >Dátum skutocne</labe>
                <p><input className={styles.input} type="text" name="v" placeholder="datum_skutocne" value={datum_skutocne} onChange={e => setDatumSkutocne(e.target.value)}></input></p>
                <button className={styles.button} onClick = {zrusitVypozicka} >Zrušiť</button>
                <button className={styles.button1} onClick={patchVypozicka} >Potvrdiť</button>
            </form>

        </div>
    );
}

export default VypozickyDetail;