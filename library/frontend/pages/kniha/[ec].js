import { useRouter } from "next/router";
import styles from '../../styles/Edit_Kniha.module.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";



const KnihaDetail = () => {
    const router = useRouter()
    const ec_kniha = router.query.ec;
    const [nazov, setNazov] = useState('');
    const [autor, setAutor] = useState('');
    const [zaner, setZaner] = useState('');
    const [popis, setPopis] = useState('');
    const apiEndPoint = `http://localhost:3000/kniha/${ec_kniha}`;
    
    useEffect(() => {
        const getKniha = async () => {
            const response = await fetch(apiEndPoint);
            const result = await response.json();                      
            setNazov(result.nazov);            
            setAutor(result.autor);
            setZaner(result.zaner);
            setPopis(result.popis);
        };
        getKniha();

    }, [ec_kniha, router]);
    const patchKniha = (event) => {
        event.preventDefault();
        
        const data =
        {
            "nazov": `${nazov}`,
            "autor": `${autor}`,
            "zaner": `${zaner}`,
            "popis": `${popis}`,
        };                
        axios.patch(`http://localhost:3000/kniha/${ec_kniha}`, data).then(res => console.log('OK:',res)).catch(res => console.log('ERR:',res));
        router.push("/kniha"); 
      };

const zrusitKniha = (e) => {
    router.push("/kniha/");
}
    return (
        <div className={styles.div}>
            <form className={styles.form}>
                <h2 className={styles.h2}>VYPLŇTE ÚDAJE O KNIHE:</h2>
                <labe>Názov:</labe>
                <p><input className={styles.input} type="text" name="nazov" placeholder="Názov" value = {nazov} onChange={e => setNazov(e.target.value)}></input></p>
                <labe className={styles.labe}>Autor:</labe>
                <p><input className={styles.input} type="text" name="autor" placeholder="Autor" value = {autor} onChange={e => setAutor(e.target.value)}></input></p>
                <labe className={styles.labe}>Žaner:</labe>
                <p><input className={styles.input} type="text" name="zaner" placeholder="Žaner" value = {zaner} onChange={e => setZaner(e.target.value)}></input></p>
                <labe className={styles.labe}>Popis:</labe>
                <p><input className={styles.input} type="text" name="Popis" placeholder="Popis" value = {popis} onChange={e => setPopis(e.target.value)}></input></p>
                <button className={styles.button} onClick = {zrusitKniha}>Zrušiť</button>
                <button className={styles.button1} onClick = {patchKniha}>Potvrdiť</button>
            </form>
        </div>

    )
}

export default KnihaDetail;