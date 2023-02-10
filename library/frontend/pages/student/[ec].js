import styles from '../../styles/Edit_Student.module.css';
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import axios from "axios";

const StudentDetail = () => {
    const router = useRouter()
    const ec_student = router.query.ec;
    const [meno, setMeno] = useState('');
    const [priezvisko, setPriezvisko] = useState('');
    const [ulica, setUlica] = useState('');
    const [mesto, setMesto] = useState('');
    const [email, setEmail] = useState('');
    const [kontakt, setKontakt] = useState('');
    const apiEndPoint = `http://localhost:3000/student/${ec_student}`;

    useEffect(() => {
        const getStudent = async () => {
            const response = await fetch(apiEndPoint);
            const result = await response.json();
            setMeno(result.meno);
            setPriezvisko(result.priezvisko);
            setUlica(result.ulica);
            setMesto(result.mesto);
            setEmail(result.email);
            setKontakt(result.kontakt);
            console.log('result:',meno);
        };
        getStudent();

    }, [ec_student, router]);
    const patchUsers = (event) => {
        event.preventDefault();
        console.log('patchStudent');
        const data =
        {
            "meno": `${meno}`,
            "priezvisko":`${priezvisko}`,
            "ulica": `${ulica}`,
            "mesto": `${mesto}`,
            "email": `${email}`,
            "kontakt": `${kontakt}`,
        };
        axios.patch(`http://localhost:3000/student/${ec_student}`, data).then(alert('Student bol uspesne zmeneny')).catch(res => console.log(res));
        router.push("/student");
    };

    const zrusitStudent = (e) => {
        router.push("/student");
    }
    return (
        <div className={styles.div}>
            <form className={styles.form}>
                <h2 className={styles.h2}>VYPLŇTE ÚDAJE ŠTUDENTA:</h2>
                <labe className={styles.labe}>Meno</labe>
                <p><input className={styles.input} type="text" name="meno" placeholder="Meno" value = {meno} onChange={e => setMeno(e.target.value)}></input></p>
                <labe className={styles.labe}>Priezvisko</labe>
                <p><input className={styles.input} type="text" name="priezvisko" placeholder="Priezvisko"  value = {priezvisko} onChange={e => setPriezvisko(e.target.value)}></input></p>
                <labe className={styles.labe}>Ulica</labe>
                <p><input className={styles.input} type="text" name="ulica" placeholder="Ulica" value = {ulica} onChange={e => setUlica(e.target.value)}></input></p>
                <labe className={styles.labe}>Mesto</labe>
                <p><input className={styles.input} type="text" name="mesto" placeholder="Mesto" value = {mesto} onChange={e => setMeno(e.target.value)}></input></p>
                <labe className={styles.labe}>E-mail</labe>
                <p><input className={styles.input} type="text" name="email" placeholder="E-mail" value = {email}  onChange={e => setEmail(e.target.value)}></input></p>
                <labe className={styles.labe}>Kontakt</labe>
                <p><input className={styles.input} type="text" name="kontakt" placeholder="Kontakt"  value = {kontakt} onChange={e => setKontakt(e.target.value)}></input></p>
                <button className={styles.button} onClick = {zrusitStudent} >Zrušiť</button>
                <button className={styles.button1} onClick={patchUsers}>Potvrdiť</button>
            </form>
        </div>
    );
}

export default StudentDetail;